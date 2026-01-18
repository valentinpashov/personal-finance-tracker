import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer"; 

const Layout = ({ setAuth }) => {
  return (
    <div className="page-wrapper" style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      
      
      <Navbar setAuth={setAuth} />

      <div style={{ flex: 1, width: "100%" }}>
        <Outlet />
      </div>

      <Footer />
      
    </div>
  );
};

export default Layout;