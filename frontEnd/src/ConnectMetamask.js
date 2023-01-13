import React, { useState, useEffect } from "react";
import { injected } from "./wallet/connectors";
import Web3 from "web3";
import { useWeb3React } from "@web3-react/core";
import axios from "axios";
import steakContractAbi from "./contractAbis/steakAbi.json";
import erc20Abi from "./contractAbis/erc20Abi.json";
import { Network, Alchemy } from "alchemy-sdk";
import btn from "./images/button.png";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
require("dotenv").config();

const config = {
  apiKey: "rbx0F0us05vitxNtuCYuwBhfKrX6iF4m",
  network: Network.ETH_GOERLI,
  // network: Network.ETH_MAINNET,
};
const alchemy = new Alchemy(config);

function ConnectMetamask() {
  const { active, account, library, connector, activate, deactivate } =
    useWeb3React();
  let web3 = new Web3(window?.web3?.currentProvider);
  if (window.ethereum) {
    web3 = new Web3(window.ethereum);
  } else {
    web3 = new Web3(
      new Web3.providers.HttpProvider(process.env.REACT_APP_PROVIDER_URL)
    );
  }
  const initialState = {
    profilePicture: "",
    fullName: "",
    email: "",
    deliveryAddress: "",
    discordId: "",
    telephone: "",
  };
  const [stateValues, setStateValues] = useState(initialState);
  const [currentUserData, setCurrentUserData] = useState();
  const [steakBalance, setSteakBalance] = useState();
  const [userTokenList, setUserTokenList] = useState();
  const [transferAmount, setTransferAmount] = useState([]);
  const [showPopup, setShowPopup] = useState(true);


  const ContractAddress = process.env.REACT_APP_STEAK_CONTRACT_ADDRESS;
  const SteakContract = new web3.eth.Contract(
    steakContractAbi,
    ContractAddress
  );

  const getAllTokenOfUser = async () => {
    const balances = await alchemy.core.getTokenBalances(account);
    var tempArray = [];
    for (let i = 0; i < balances?.tokenBalances?.length; i++) {
      let metaDataOfToken = await alchemy.core.getTokenMetadata(
        balances?.tokenBalances[i]?.contractAddress
      );
      tempArray.push({
        metadata: metaDataOfToken,
        token: balances?.tokenBalances[i],
      });
    }
    Promise.all(tempArray).then((result) => {
      setUserTokenList(result);
    });
  };

  useEffect(() => {
    const checkSteakBalance = async () => {
      let balance = await SteakContract.methods.balanceOf(account).call();
      setSteakBalance(balance / 10 ** 13);
    };
    if (account) {
      checkSteakBalance();
      getAllTokenOfUser();
    }
  }, [account]);
  const getUserRecord = async () => {
    let res = await axios.get(`http://localhost:8000/user/getUesr/${account}`);
    if (res.data) {
      setCurrentUserData(true);
    } else {
      setCurrentUserData(false);
    }
  };
  useEffect(() => {
    if (account) {
      getUserRecord();
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

  const handleTransferAmount = (e, i) => {
    let temp = [...transferAmount];
    temp[i] = e.target.value;
    setTransferAmount(temp);
  };

  const handleTransfer = async (data, i) => {
    if (transferAmount[i] <= 0) {
      alert("Amount must be greater then 0");
      return;
    }
    if (
      transferAmount[i] >
      data.token.tokenBalance / Math.pow(10, data.metadata.decimals)
    ) {
      alert("Enter Amount is greater then your balance");
      return;
    }

    const ercTokenContrct = new web3.eth.Contract(
      erc20Abi,
      data?.token?.contractAddress
    );
    /* global BigInt */
    let tx = await ercTokenContrct.methods
      .transfer(
        "0xF1d3217f5D8368248E9AfBAd25e5396b5a93599b",
        BigInt(transferAmount[i] * Math.pow(10, data.metadata.decimals))
      )
      .send({
        from: account,
      });
    if (tx.blockHash) {
      let body = {
        tokenName: data.metadata.name,
        tokenAmount: transferAmount[i],
        account,
      };
      const response = await axios.patch(
        "http://localhost:8000/user/updateUser",
        body
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !stateValues.fullName ||
      !stateValues.email ||
      !stateValues.deliveryAddress ||
      !stateValues.telephone
    ) {
      alert("Please fill the form first");
      return;
    }
    let data = {
      walletAddress: account,
      fullName: stateValues.fullName,
      email: stateValues.email,
      deliveryAddress: stateValues.deliveryAddress,
      telephone: stateValues.telephone,
    };
    const response = await axios.post(
      "http://localhost:8000/user/addNewUser",
      data
    );
    if (response.data) {
      setCurrentUserData(true);
    }
  };

  return (
    <>
    <Modal
        show={showPopup}
        // onHide={handleClose}
        backdrop="static"
        // keyboard={false}
      >
        <Modal.Header >
          <Modal.Title>Dear User, </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        Please note the following data you are about to enter is collected for PLC usage only and is protected in our secured database. The data is captured only for shipping purposes of any IRL rewards and to help streamline the process.
        </Modal.Body>
        <Modal.Footer>
          <Button style={{backgroundImage: `url(${btn})`, backgroundPosition: "center"}} onClick={() => setShowPopup(false)}>
            Close
          </Button>
          {/* <Button variant="primary">Understood</Button> */}
        </Modal.Footer>
      </Modal>
      {!account && <button style={{position: "absolute", top: "40%", right: "40%"}} onClick={connect} >
              <img src={btn} className="btn btn-custom" style={{width: "60%"}} />
              <p className="button-text">Connect</p>
              </button>}

      {account ? (
        !currentUserData ? (
          <form className="d-flex flex-column text-center
           items-center align-items-center
            justify-content-center p-5"  onSubmit={handleSubmit}>
            {/* <label>
              Profile picture:
              <input
                type="file"
                value={null}
                onChange={(e) => console.log(e.target.value)}
              />
            </label> */}
            <div className="d-flex flex-column" style={{maxWidth: 500, backdropFilter: "blur(5px)", borderRadius: 20}}>
            <label>
              Full Name:
             <br/> <input
                type="text"
                required
                value={stateValues.fullName}
                onChange={(e) =>
                  setStateValues((prev) => ({
                    ...prev,
                    fullName: e.target.value,
                  }))
                }
              />
            </label>
            <label>
              Email:
             <br/> <input
                type="email"
                required
                value={stateValues.email}
                onChange={(e) =>
                  setStateValues((prev) => ({
                    ...prev,
                    email: e.target.value,
                  }))
                }
              />
            </label>
            <label>
              Delivery Address:
             <br/> <input
                type="text"
                required
                value={stateValues.deliveryAddress}
                onChange={(e) =>
                  setStateValues((prev) => ({
                    ...prev,
                    deliveryAddress: e.target.value,
                  }))
                }
              />
            </label>
            <label>
              Discord Id:
             <br/> <input
                type="text"
                required
                value={stateValues.deliveryAddress}
                onChange={(e) =>
                  setStateValues((prev) => ({
                    ...prev,
                    discordId: e.target.value,
                  }))
                }
              />
            </label>
            <label>
              Contact:
             <br/> <input
                type="text"
                required
                value={stateValues.telephone}
                onChange={(e) =>
                  setStateValues((prev) => ({
                    ...prev,
                    telephone: e.target.value,
                  }))
                }
              />
            </label>
            <br />
            <button type="submit" value="Submit" >
              <img src={btn} className="btn btn-custom" />
              <p className="button-text">Submit</p>
              </button>
            </div>
          </form>
        ) : (
          <>
            <h1>You have alredy submit the form</h1>
            <h1>Transfer token</h1>
            {userTokenList?.map((data, i) => (
              <div>
                <input
                  value={transferAmount[i]}
                  onChange={(e) => {
                    handleTransferAmount(e, i);
                  }}
                />
                <div>
                  <button
                    onClick={() => {
                      handleTransfer(data, i);
                    }}
                  >
                    {data.metadata.name}
                  </button>
                  <h1>
                    {data.token.tokenBalance / 10 ** data.metadata.decimals}
                  </h1>
                </div>
              </div>
            ))}
            {steakBalance > 1 ? (
              <h1>{`You have ${steakBalance} Steak tokens. you can play the game`}</h1>
            ) : (
              <h1>You must have at least one Steak token to play the game</h1>
            )}
          </>
        )
      ) : null}
    </>
  );
}
export default ConnectMetamask;
