import Navbar from "./Navbar.jsx";

export const Layout = ({ children }) => (
  <>
    <Navbar />
    {children}
  </>
);
