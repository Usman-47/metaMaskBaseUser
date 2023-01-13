import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
import { Web3ReactProvider } from "@web3-react/core";
import ConnectMetamask from "./ConnectMetamask";
import Web3 from "web3";

function getLibrary(provider) {
  return new Web3(provider);
}

function App() {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <ConnectMetamask />
    </Web3ReactProvider>
  );
}

export default App;
