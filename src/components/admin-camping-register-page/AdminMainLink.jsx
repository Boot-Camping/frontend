import React from "react";
import { Link } from "react-router-dom";
import { ReactSVG } from "react-svg";

const AdminMainLink = () => {
  return (
    <div>
      <Link to={"/admin"}>
        <ReactSVG
          className="admin-home-icon"
          src="../../src/assets/svg/home.svg"
          alt=""
        />
      </Link>
    </div>
  );
};

export default AdminMainLink;
