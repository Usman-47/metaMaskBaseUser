import React, { useState, useEffect } from "react";
import background from "../images/profileBg.png";
import btn from "../images/button.png";
import { injected } from "../wallet/connectors";
import { useWeb3React } from "@web3-react/core";
import Web3 from "web3";
import { Form, Button } from "react-bootstrap";
import plclogo from '../images/newPLCLogo.png'
import placeholder from '../images/placeholder.png'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import Reward from "./reward";
import axios from "axios";
import { Alchemy, Network } from "alchemy-sdk";


const config = {
  apiKey: "xmSw0S8htTdeV2SyHCNZHCgfvh1h9b5h",
  network: Network.ETH_GOERLI,
};

const alchemy = new Alchemy(config);

function Profile() {
  const { active, account, library, connector, activate, deactivate } =
    useWeb3React();

  const [showReward, setShowReward] = useState(false)
  const [currentUserData, setCurrentUserData] = useState();
  const [userData, setUserData] = useState();
  const [userNftImages, setUserNftImages] = useState();


  let web3 = new Web3(window?.web3?.currentProvider);
  if (window.ethereum) {
    web3 = new Web3(window.ethereum);
  } else {
    web3 = new Web3(
      new Web3.providers.HttpProvider(process.env.REACT_APP_PROVIDER_URL)
    );
  }

  const getUserNft = async () => {
    const nfts = await alchemy.nft.getNftsForOwner(account);
    const numNfts = nfts["totalCount"];
    const nftList = nfts["ownedNfts"];

    console.log(`Total NFTs owned by ${account}: ${numNfts} \n`);

    let i = 1;
    let tempArray = []
    for (let nft of nftList) {
      let res = await axios.get(nft?.tokenUri?.gateway);
      tempArray.push(res?.data?.image)
    };
    Promise.all(tempArray).then((values) => {
      setUserNftImages(values)
    });
  }
  useEffect(() => {
    if (account) {
      getUserNft()
    }
  }, [account]);

  const getUserRecord = async () => {
    let res = await axios.get(`http://localhost:8000/v1/user/get-specific-uesr`,
      {
        params: { walletAddress: account }
      });
    if (res.data) {
      setUserData(res.data)
      setCurrentUserData(true);
    } else {
      setCurrentUserData(false);
    }
  };

  useEffect(() => {
    if (account) {
      getUserRecord()
    }
  }, [account]);



  async function connect() {
    try {
      if (!window?.web3?.currentProvider) {
        alert(`Metamask is not installed.
          Try Different browser or Install Metamask.`);
        return;
      }

      await activate(injected);

      let id = await web3.eth.net.getId();

      return "success";
    } catch (err) {
      alert(JSON.stringify(err.message));
      return "failed";
    }
  }
  return (<>
    {!showReward ?
      <div style={{
        backgroundImage: `url(${background})`,
        backgroundPosition: "center",
        height: "100vh",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundColor: "rgb(33, 11, 3)",
        display: "flex",
        justifyContent: "center"
      }}>
        <div style={{ position: "absolute", left: "1%", top: 50 }}>
          <img src={plclogo} width="100%" />
        </div>


        {!account ?
          <div style={{ position: "absolute", top: "45%", right: "50%", translate: "50%", textAlign: "center" }}>
            <button
              // style={{ position: "absolute", top: "40%", right: "40%" }}
              onClick={connect}
            >
              <img src={btn} className="btn btn-custom" style={{ width: "60%" }} />
              <p className="button-text">Login</p>
            </button>
          </div>
          :
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Form onSubmit={(e) => { e.preventDefault(); alert("call update api here") }}>
              <div style={{
                width: 250,
                height: 250,
                margin: "0 auto",
                borderRadius: "50%",
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
                overflow: "hidden"
              }}
                className="avatar"
              >
                <img src={placeholder} width="100%" />
                <div className="overlay">

                  <FontAwesomeIcon className="editIcon" icon={faEdit} />

                </div>
              </div>

              <Form.Group style={{
                textAlign: "center",
                color: "white",
                textShadow: "0 0 20px black"
              }} className="m-3" controlId="formBasicEmail">
                <h2>Full Name</h2>
                {/* <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text> */}
              </Form.Group>


              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control type="text" value={userData?.email} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Delivery Address</Form.Label>
                <Form.Control type="text" value={userData?.deliveryAddress} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Discord Id</Form.Label>
                <Form.Control type="text" value={userData?.discordId} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Phone #</Form.Label>
                <Form.Control type="text" value={userData?.phone} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Button style={{ width: "100%" }} variant="danger" onClick={() => setShowReward(true)}>
                  Chest Collected : 5
                </Button>
              </Form.Group>
              <Form.Group className="mb-3">
                <Button style={{ width: "100%" }} variant="success" type="submit">
                  Update profile
                </Button>
              </Form.Group>
            </Form>
          </div>}
      </div> :
      <Reward setShowReward={setShowReward} />}
  </>
  )
}
export default Profile;
