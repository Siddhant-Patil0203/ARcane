import React from "react";
import { Link, useLocation } from "react-router-dom";

const DashboardUpdate = () => {
  const location = useLocation();
  const propData = location.state;

  console.log(location);

  return (
    <>
      <div>Update</div>
      <div>{propData?.item.title}</div>
    </>
  );
};

export default DashboardUpdate;
