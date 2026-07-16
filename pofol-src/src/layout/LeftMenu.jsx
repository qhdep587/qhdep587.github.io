import React from "react";
import { useNavigate } from "react-router-dom";

const LeftMenu = () => {
  const navigate = useNavigate();
  const linkFn = (target, num) => {
    if (num > 0) {
      for (let i = 1; i < 5; i++) {
        document.getElementById("menu" + i).className =
          "left-menu-item-content";
      }
      document.getElementById("menu" + num).className += " active";
      navRouter(num);
    }
  };

  const navRouter = (goto) => {
    if (goto === "home") {
      for (let i = 1; i < 5; i++) {
        document.getElementById("menu" + i).className =
          "left-menu-item-content";
      }
    }

    switch (goto) {
      case 1:
        navigate("/intro");
        break;
      case 2:
        navigate("/edu");
        break;
      case 3:
        navigate("/work");
        break;
      case 4:
        navigate("/project");
        break;
      default:
        navigate("/");
        break;
    }
  };

  return (
    <div className="left-menu">
      <div
        className="left-menu-item-content-box left-menu-item"
        onClick={() => navRouter("home")}
      >
        port
        <span className="left-menu-item-ivory left-menu-item-deco">folio</span>
      </div>
      <div className="left-menu-item-content-box">
        <div
          id="menu1"
          className="left-menu-item-content"
          onClick={(e) => linkFn(e.target, 1)}
        >
          intro
        </div>
        <div
          id="menu4"
          className="left-menu-item-content"
          onClick={(e) => linkFn(e.target, 4)}
        >
          project
        </div>
        <div
          id="menu3"
          className="left-menu-item-content"
          onClick={(e) => linkFn(e.target, 3)}
        >
          work
        </div>
        <div
          id="menu2"
          className="left-menu-item-content"
          onClick={(e) => linkFn(e.target, 2)}
        >
          edu
        </div>
      </div>
    </div>
  );
};

export default LeftMenu;
