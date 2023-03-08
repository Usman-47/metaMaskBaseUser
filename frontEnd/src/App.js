import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Web3ReactProvider } from "@web3-react/core";
import ConnectMetamask from "./ConnectMetamask";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Web3 from "web3";
import Profile from "./components/profile";

function getLibrary(provider) {
  return new Web3(provider);
}

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <ConnectMetamask />,
    },
    {
      path: "/profile",
      element: <Profile />,
    },
  ]);


  return (
    <Web3ReactProvider getLibrary={getLibrary}>
       <RouterProvider router={router} />
    </Web3ReactProvider>
  );
}

export default App;
