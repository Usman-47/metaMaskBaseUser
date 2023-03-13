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
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";






function UserLookup({setShowReward}) {
  const { active, account, library, connector, activate, deactivate } =
    useWeb3React();
    const navigate = useNavigate();
  const [showPop, setShowPop] = useState(false)
  const [selectedBox, setSelectedBox] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const [selectedTab, setSelectedTab] = useState("web");

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
    // if(!account) {
    //   console.log(account)
    //   navigate("/profile")
    // }else {
    //   checkAdmin()
    // }
  }, [])

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

  const checkAdmin = () => {
    
   if(account !== "0xF1d3217f5D8368248E9AfBAd25e5396b5a93599b")
    navigate("/profile")
  }

  const handleImageSelect = () => {
    const uploader = document.getElementById("uploader")
    const imgSrc = URL.createObjectURL(uploader.files[0])
    setPreviewUrl(imgSrc)
  }

  const tabs = [
    'web',
    'irl',
    'eth'
  ]

  return (
    <Container fluid style={{
      backgroundImage: `url(${background})`,
      backgroundPosition: "center",
      minHeight: "100vh",
      // width: "100vw",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundColor: "rgb(33, 11, 3)",
      display: "flex",
      justifyContent: "center",
      textAlign: "center",
      flexDirection: "column",
      alignItems: "center",
      textShadow: "0 0 10px black",
      color: "white",
    }}>
      <div style={{ position: "absolute", left: "1%", top: 50 }}>
        <img src={plclogo} width="100%" />
      </div>
      <Button onClick={() => navigate("userlookup")} style={{ position: "absolute", right: "2%", top: 140 }} variant="warning">
        Admin Rewards
      </Button>
      
      <Container style={{ backdropFilter: "blur(10px)",  padding: 20, marginTop: 200 }}>
        <h2 style={{ width: "auto" }}>
        User Lookup Admin Panel


                </h2>
        <Row>
          <Col sm={0} md={2} />
        <Col sm={12} md={4}>
          <Form>
        <Form.Group style={{
            textAlign: "center",
          
           textShadow: "0 0 20px black"}} className="m-3" controlId="formBasicEmail">
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center"
              }}
            >
              <Form.Group className="mb-3">
            <Form.Label>user wallet lookup</Form.Label>
            <Form.Control type="text" style={{width: "auto"}} />
          
          </Form.Group>
            <Button variant="warning">
       Search
      </Button>
            </div>
          </Form.Group>

        
          
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Discord</Form.Label>
            <Form.Control type="text" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Address</Form.Label>
            <Form.Control type="text" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Steak balance in game</Form.Label>
            <Form.Control type="text"/>
          </Form.Group>
          <Form.Group className="mb-3">
          </Form.Group>
         
        </Form>
            </Col>
            <Col sm={12} md={4}>
          <Form>
        <Form.Group style={{
            textAlign: "center",
          
           textShadow: "0 0 20px black"}} className="m-3" controlId="formBasicEmail">
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center"
              }}
            >
              <Form.Group className="mb-3">
            <Form.Label>manual add tokens</Form.Label>
            <Form.Control type="text" style={{width: "auto"}} />
          
          </Form.Group>
            <Button variant="warning">
       update
      </Button>
            </div>
          </Form.Group>

        </Form>
            </Col>
            <Col sm={0} md={2} />
        
        </Row>
      
        <Row style={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "row",
                  alignItems: "center",
                }}>

          {chestDetails.map((i, key) => (
              <Col
                style={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                  alignItems: "center",
                  cursor: "pointer"
                }}
                sm={12} md={3}
              >
                <img src={i.imageName} width="100%" />
                <p style={{ width: "auto" }}>
                 {i.count}
                </p>
              </Col>
            ))}
            </Row>
            <Button onClick={fetchPrizeDetails}  variant="success">
        open rewards
      </Button>
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
    </Container>
  )
}
export default UserLookup;
