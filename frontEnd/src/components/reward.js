import React, { useState, useEffect } from "react";
import background from "../images/rewardBg.png";
import btn from "../images/button.png";
import { injected } from "../wallet/connectors";
import { useWeb3React } from "@web3-react/core";
import Web3 from "web3";
import { Form, Button, Row, Col, Container, Table, Modal } from "react-bootstrap";
import plclogo from '../images/newPLCLogo.png'
import diamondChest from '../images/diamondChest.png'
import goldChest from '../images/goldChest.png'
import silverChest from '../images/silverChest.png'
import bronzeChest from '../images/bronzeChest.png'
import popupBg from '../images/popupBg.png'
import steakToken from '../images/steakToken.png'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from '@fortawesome/free-solid-svg-icons'





function Reward({setShowReward}) {
  const { active, account, library, connector, activate, deactivate } =
    useWeb3React();

  const [showPop, setShowPop] = useState(false)

  let web3 = new Web3(window?.web3?.currentProvider);
  if (window.ethereum) {
    web3 = new Web3(window.ethereum);
  } else {
    web3 = new Web3(
      new Web3.providers.HttpProvider(process.env.REACT_APP_PROVIDER_URL)
    );
  }



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

  const chestDetails = [
    {
      name: "Diamond",
      count: "5",
      imageName: diamondChest
    },
    {
      name: "Gold",
      count: "5",
      imageName: goldChest
    },
    {
      name: "Silver",
      count: "5",
      imageName: silverChest
    },
    {
      name: "Bronze",
      count: "5",
      imageName: bronzeChest
    },
  ]

  const rewardsWon = [
    {
      name: "Dummy Prize",
      imageName: steakToken
    },
    {
      name: "Dummy Prize",
      imageName: steakToken
    },
    {
      name: "Dummy Prize",
      imageName: steakToken
    },
    {
      name: "Dummy Prize",
      imageName: steakToken
    },
    {
      name: "Dummy Prize",
      imageName: steakToken
    },
  ]

  const usersFeed = [
    {
      name: "Roman",
      prize: "2 ETH",
      time: "a moment ago"
    },
    {
      name: "Demon",
      prize: "Bored Apes NFT",
      time: "10 minutes ago"
    },
    {
      name: "James",
      prize: "2 tickets",
      time: "an hour ago"

    },
    {
      name: "James",
      prize: "2 tickets",
      time: "an hour ago"

    },
    {
      name: "James",
      prize: "2 tickets",
      time: "an hour ago"

    },
    {
      name: "James",
      prize: "2 tickets",
      time: "an hour ago"

    },
    {
      name: "James",
      prize: "2 tickets",
      time: "an hour ago"

    },
    {
      name: "James",
      prize: "2 tickets",
      time: "an hour ago"

    },
    {
      name: "James",
      prize: "2 tickets",
      time: "an hour ago"

    },
    {
      name: "James",
      prize: "2 tickets",
      time: "an hour ago"

    },
    {
      name: "Ash",
      prize: "Playstation ",
      time: "5 hours ago"

    }
  ]

  const fetchPrizeDetails = () => {
    setShowPop(true);
  }

  return (
    <div style={{
      backgroundImage: `url(${background})`,
      backgroundPosition: "center",
      minHeight: "100vh",
      width: "100vw",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundColor: "rgb(33, 11, 3)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "50px 0 0 0"
    }}>
      <div style={{ position: "absolute", left: "1%", top: 50 }}>
        <img src={plclogo} width="100%" />
      </div>
      <Button onClick={fetchPrizeDetails} style={{ position: "absolute", right: "2%", top: 140 }} variant="warning">
        Unclaimed rewards
      </Button>
      <Button style={{ position: "absolute", right: "2%", top: 200 }} variant="warning">
        Monthly Jungle Jackpot
      </Button>
      <Button onClick={() => setShowReward(false)} style={{ position: "absolute", left: "2%", top: 140 }} variant="danger">
        Back
      </Button>
      <Container style={{ marginTop: 200 }}>
        <Row>
          {chestDetails.map((i, key) => (
            <Col sm={12} md={3} key={key}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                  alignItems: "center"
                }}
              >
                <img src={i.imageName} width="100%" />
                <Button style={{ width: "75%" }} variant="danger">
                  {i.name} Chest : {i.count}
                </Button>
                <Button onClick={fetchPrizeDetails} style={{ textAlign: "center", margin: "10px 0" }} variant="success">
                  Open all
                </Button>
              </div>
            </Col>))}
        </Row>
        <div
          style={{
            height: 250,
            overflowY: "scroll",
            overflowX: "hidden",
            scrollbarWidth: "none"
          }}
          className="example"
        >
          <Table striped
            style={{
              margin: "20px 0",
              background: "#529ce7",
              borderRadius: 20,
              borderBottom: "black solid 0px",
              textAlign: "center"
            }}
          >

            <tbody>
              {usersFeed.map((i, key) => (
                <tr key={key}>
                  <td>{i.name} has just claimed {i.prize}, {i.time}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Container>
      <Modal
        size="lg"
        show={showPop}
        onHide={() => setShowPop(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >



        <Modal.Body
          style={{
            backgroundImage: `url(${popupBg})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            color: "white",
            display: "flex",
            justifyContent: "evenly",
            alignItems: "center",
            flexDirection: "column"
          }}
        >
          <Modal.Title
            style={{ padding: "0 10px", borderRadius: 20, background: "#529ce7", textAlign: "center" }} id="example-modal-sizes-title-lg">
            Rewards Won
          </Modal.Title>
          <div
            style={{
              height: 400,
              overflowY: "scroll",
              overflowX: "hidden",
              scrollbarWidth: "none",
              margin: 30
            }}
            className="example"
          >
            <Row>
              {rewardsWon.map((i, key) => (
                <Col sm={12} md={3} key={key}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      flexDirection: "column",
                      alignItems: "center"
                    }}
                  >
                    <img src={i.imageName} width="100%" />
                    <Button style={{ width: "75%" }} variant="danger">
                      {i.name}
                    </Button>
                  </div>
                </Col>))}
            </Row>
          </div>
          <Button style={{ width: "75%" }} variant="success">
            Claim All
          </Button>
          <Modal.Title
            style={{ padding: "0 10px", textShadow: "0 0 10px black", textAlign: "center" }} id="example-modal-sizes-title-lg">
            * Save gas by calming in one transaction.
          </Modal.Title>

        </Modal.Body>
      </Modal>
    </div>
  )
}
export default Reward;
