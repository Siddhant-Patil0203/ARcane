import Footer from "./Footer";
import NavBar from "./Navbar";
import { Toaster } from "react-hot-toast";

export const Layout = ({ children }) => (
  <>
    <NavBar />
    <div className=""> {children}</div>
    <div>
      <Toaster />
    </div>

    <div className="block bottom-0">
      <Footer />
    </div>
  </>
);
