import Footer from "./Footer";
import NavBar from "./Navbar";

export const Layout = ({ children }) => (
  <>
    <NavBar />
    <div className=""> {children}</div>
    <Footer/>
  </>
);
