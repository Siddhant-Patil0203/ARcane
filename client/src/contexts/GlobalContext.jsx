import { createContext, useContext, useState } from "react";

const GlobalContext = createContext({});

export const GlobalProvider = (props) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [propertyList, setPropertyList] = useState();

  return (
    <GlobalContext.Provider
      value={{
        user,
        setUser,
        propertyList,
        setPropertyList,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
