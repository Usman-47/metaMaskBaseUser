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
import { useNavigate } from "react-router-dom";





function AdminJackpot({ setShowReward }) {
  const { active, account, library, connector, activate, deactivate } =
    useWeb3React();
  
    const navigate = useNavigate();

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

  useEffect(() => {
    if(!account) {
      console.log(account)
      navigate("/profile")
    }
  }, [])


  return (<>
    {account ? 
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
              <div
                 style={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                  alignItems: "center",
                  color: "white",
                  textAlign: "center",
                  height: '100%'
                }}
              >
              <Button style={{ width: "auto", margin: 10 }} variant="primary">
                Draw / Re-Draw
              </Button>
              <Button style={{ width: "auto", margin: 10 }} variant="primary">
               Upload
              </Button>
              <Button style={{ width: "auto", margin: 10 }} variant="primary">
                <input type="date" />
                <br/> 
                set Date
              </Button>
              </div>
             
              <img src={jackpotPrize} width="50%" />
             
            </div>
          </Col>
          <Col sm={12} md={6}>
                <div
                   style={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
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
                src={winnerPlaceholder} width="100%" />
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
            <Button style={{ width: "auto" }} variant="success">
                Confirm Winner
              </Button>
              </div>
          </Col>
        </Row>
      
      </Container>
    </div> 
    :
      null        }
    </>
  )
}
export default AdminJackpot;
