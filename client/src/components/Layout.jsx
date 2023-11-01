import Footer from "./Footer";
import NavBar from "./Navbar";

export const Layout = ({ children }) => (
  <>
    <NavBar />
    <div className=""> {children}</div>
    <div className="block bottom-0"><Footer/></div>
  </>
);
