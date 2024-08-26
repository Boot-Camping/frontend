import React from "react";
import { Link, useNavigate } from "react-router-dom";

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
