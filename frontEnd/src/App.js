import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Web3ReactProvider } from "@web3-react/core";
import ConnectMetamask from "./ConnectMetamask";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Web3 from "web3";
import Profile from "./components/profile";
import Jackpot from "./components/jackpot";
import AdminJackpot from "./components/adminJackpot";
import AdminReward from "./components/adminReward";
import UserLookup from "./components/userlookup";

function getLibrary(provider) {
  return new Web3(provider);
}

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <ConnectMetamask />,
//   },
//   {
//     path: "/profile",
//     element: <Profile />,
//   },
//   {
//     path: "/jackpot",
//     element: <Jackpot />,
//   },
// ]);
function App() {
  const CustomRouter = () =>  {return (
   <BrowserRouter>
      <Routes>
      <Route path="/" element={<ConnectMetamask />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/jackpot" element={<Jackpot />} />
      <Route path="/admin/*" element={<AdminRoutes />} />
      </Routes>
   </BrowserRouter>
  )}

  const AdminRoutes = () =>  {return (<>
       <Routes>
       <Route path="/" element={<AdminReward />} />
       <Route path="jackpot" element={<AdminJackpot />} />
       <Route path="userlookup" element={<UserLookup />} />
       </Routes>
  </>
   )}


  return (
    <Web3ReactProvider getLibrary={getLibrary}>
        <CustomRouter />
    </Web3ReactProvider>
  );
}

export default App;
