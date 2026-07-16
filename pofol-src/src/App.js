import "./App.css";
import LeftMenu from "./layout/LeftMenu";
import MainComp from "./layout/MainComp";
import { BrowserRouter } from "react-router-dom";

const App = () => {
  window.addEventListener("scroll", cursor);
  window.addEventListener("mousemove", cursor);
  window.addEventListener("contextmenu", function (e) {
    e.preventDefault();
    return false;
  });
  window.addEventListener("keydown", function (e) {
    if (
      // CMD + Alt + I (Chrome, Firefox, Safari)
      (e.metaKey === true && e.altKey === true && e.keyCode === 73) ||
      // CMD + Alt + J (Chrome)
      (e.metaKey === true && e.altKey === true && e.keyCode === 74) ||
      // CMD + Alt + C (Chrome)
      (e.metaKey === true && e.altKey === true && e.keyCode === 67) ||
      // CMD + Shift + C (Chrome)
      (e.metaKey === true && e.shiftKey === true && e.keyCode === 67) ||
      // Ctrl + Shift + I (Chrome, Firefox, Safari, Edge)
      (e.ctrlKey === true && e.shiftKey === true && e.keyCode === 73) ||
      // Ctrl + Shift + J (Chrome, Edge)
      (e.ctrlKey === true && e.shiftKey === true && e.keyCode === 74) ||
      // Ctrl + Shift + C (Chrome, Edge)
      (e.ctrlKey === true && e.shiftKey === true && e.keyCode === 67) ||
      // F12 (Chome, Firefox, Edge)
      e.keyCode === 123 ||
      // CMD + Alt + U, Ctrl + U (View source: Chrome, Firefox, Safari, Edge)
      (e.metaKey === true && e.altKey === true && e.keyCode === 85) ||
      (e.ctrlKey === true && e.keyCode === 85)
    ) {
      e.preventDefault();
      return false;
    }
  });
  function cursor(e) {
    if (document.querySelector(".cursor").style.left === "0px") {
      document.querySelector(".cursor").style.opacity = 0;
    } else if (document.querySelector(".cursor").style.top === "0px") {
      document.querySelector(".cursor").style.opacity = 0;
    } else {
      document.querySelector(".cursor").style.opacity = 0.7;
    }
    document.querySelector(".cursor").style.left = e.pageX + "px";
    document.querySelector(".cursor").style.top =
      e.pageY - window.scrollY + "px";
  }
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <div className="mainBackground">
        {/* <div className="widthView">
          <div className="widthView-sub">모바일 가로모드는 지원하지 않습니다.</div>
        </div> */}
        <div className="mainBackgroundBlur container">
          <div className="cursor"></div>
          <LeftMenu />
          <MainComp />
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
