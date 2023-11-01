import Navbar from "./Navbar";

export const Layout = ({ children }) => (
  <>
    <Navbar />
    <div className=""> {children}</div>
  </>
);
