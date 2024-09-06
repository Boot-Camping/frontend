import React from "react";
import "../main-page/MainCategory.css";
import { Link } from "react-router-dom";

const MainCategory = () => {
  return (
    <>
      <ul className="catgory underline">
        <li>
          <Link to="/categorypage/전체">
            <img
              className="catgory-img"
              src="https://cdn-icons-png.flaticon.com/512/5110/5110754.png"
              alt=""
            />
          </Link>
          <div className="catgory-title">전체</div>
        </li>
        <li>
          <Link to="/categorypage/숲속">
            <img
              className="catgory-img"
              src="https://kkoma.net/web/product/big/201703/2948_shop1_323478.jpg"
              alt=""
            />
          </Link>
          <div className="catgory-title">숲속</div>
        </li>
        <li>
          <Link to="/categorypage/바다">
            <img
              className="catgory-img"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS95s2wPiZnhvu_E5-n9F-XNGK-9_lUE3Yyqg&s"
              alt=""
            />
          </Link>
          <div className="catgory-title">바다</div>
        </li>
        <li>
          <Link to="/categorypage/계곡">
            <img
              className="catgory-img"
              src="https://png.pngtree.com/png-clipart/20190705/original/pngtree-the-valley-png-image_4199188.jpg"
              alt=""
            />
          </Link>
          <div className="catgory-title">계곡</div>
        </li>
        <li>
          <Link to="/categorypage/반려견">
            <img
              className="catgory-img"
              src="https://campingagains3.s3.ap-northeast-2.amazonaws.com/thumbnail__633c2f9041.png"
              alt=""
            />
          </Link>
          <div className="catgory-title">반려견</div>
        </li>
        <li>
          <Link to="/categorypage/키즈">
            <img
              className="catgory-img"
              src="https://campingagains3.s3.ap-northeast-2.amazonaws.com/thumbnail__e908f60264.png"
              alt=""
            />
          </Link>
          <div className="catgory-title">키즈</div>
        </li>
      </ul>
    </>
  );
};

export default MainCategory;
