import Navbar from "./Navbar";

export const Layout = ({ children }) => (
  <>
    <Navbar />
    {children}
  </>
);
