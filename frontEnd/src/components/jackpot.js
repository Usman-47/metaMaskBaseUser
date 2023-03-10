import React, { useState, useEffect } from "react";
import background from "../images/rewardBg.png";
import btn from "../images/button.png";
import { injected } from "../wallet/connectors";
import { useWeb3React } from "@web3-react/core";
import Web3 from "web3";
import { Form, Button, Row, Col, Container, Table, Modal } from "react-bootstrap";
import plclogo from '../images/newPLCLogo.png'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import jackpotPrize from '../images/jackpotPrize.png'
import winnerPlaceholder from '../images/winnerPlaceholder.png'
import popupBg from '../images/popupBg.png'
import steakToken from '../images/steakToken.png'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from '@fortawesome/free-solid-svg-icons'





function Jackpot({ setShowReward }) {
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

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 10
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 7
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 5
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 3
    }
  };

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

      <Container style={{ marginTop: 75 }}>
        <div
          style={{
            textAlign: "center",
            color: "white",
            textShadow: "0 0 10px black"
          }}
        >
          <h1>
            Monthly Jungle Jackpot
          </h1>
        </div>
        <Row
          style={{ borderBottom: "1px solid black" }}
        >
          <Col sm={12} md={6}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "row",
                alignItems: "center",
                color: "white",
                textAlign: "center",
                textShadow: "0 0 10px black",
                padding: 30
              }}
            >
              <div>
                <h5>
                  Draw in
                </h5>
                <h2>
                  00 : 00 : 00
                </h2>
              </div>
              <img src={jackpotPrize} width="50%" />
            </div>
          </Col>
          <Col sm={12} md={6}>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
                padding: 30,
                color: "white"
              }}
            >
              <div
                style={{
                  background: "#529ce7",
                  padding: "5px 10px",
                  borderRadius: 10,
                  zIndex: 2
                }}
              >
                <h3>
                  March
                </h3>
              </div>
              <img
                style={{
                  marginTop: -50,
                  zIndex: 1
                }}
                src={winnerPlaceholder} width="50%" />
              <div
                style={{
                  background: "#529ce7",
                  padding: "5px 10px",
                  borderRadius: 10,
                  marginTop: 10
                }}
              >
                <h3>
                  Discord Name
                </h3>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <div style={{
            display: "flex",
            justifyContent: "center"
          }}>
        <p
          style={{ 
          background: "#529ce7",
          maxWidth: 100,
          padding: "0px 10px",
          borderRadius: 10,
          marginTop: 10}}
                >
                  
                   Entries
                </p>
                </div>
          {/* <div
            style={{
              height: "auto",
              margin: "30px 0",
              display: "flex",
              justifyContent: "center",
              flexDirection: "row",
              alignItems: "center"
            }}
          > */}
            <Carousel
            autoPlay={true}
            swipeable={false}
            draggable={false}
            infinite={true}
            removeArrowOnDeviceType={["tablet", "mobile","desktop"]}
            autoPlaySpeed={500}
            transitionDuration={500}
            responsive={responsive}>
  
            {rewardsWon.map((i, key) => (
              // <Col sm={12} md={3} key={key}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                  alignItems: "center"
                }}
              >
                <img src={i.imageName} width="80%" />
                <div
                  style={{
                    background: "#529ce7",
                    padding: "5px 10px",
                    borderRadius: 50,
                    marginTop: 5,
                    color: "white"
                  }}
                  className="text"
                >
                  
                    Tickets: 5
                 
                </div>
              </div>
              // </Col>
            ))}
            </Carousel>
          {/* </div> */}

        </Row>
      </Container>
    </div>
  )
}
export default Jackpot;
