import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";

const Header = () => {
  const [temp, setTemp] = useState("");
  const [city, setCity] = useState("");
  const [icon, setIcon] = useState("");
  const [tf, setTf] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (tf) {
      document.getElementById("chatIcon").className += " active";
    } else {
      document.getElementById("chatIcon").className = "header-item-left";
    }
  }, [tf]);

  const fetchData = async () => {
    try {
      // const resCity = await axios.get('http://ip-api.com/json') https할려면 돈내래^^
      // const cityName = resCity.data.regionName
      const res = await axios.get(
        "https://api.openweathermap.org/data/2.5/weather?q=Seoul&units=metric&appid=" +
          process.env.REACT_APP_MY_KEY
      );
      setTemp(res.data.main.temp.toFixed(0));
      setCity("seoul");
      setIcon(res.data.weather[0].main.replaceAll(" ", ""));
    } catch (error) {
      console.error(error);
    }
  };

  const clickQR = () => {
    window.open("https://open.kakao.com/o/sSG6dTlf");
  };

  return (
    <div className="MainCompItem header">
      <div className="header-item-left" id="chatIcon">
        <img
          className="header-item-left-icon"
          src={require("../common/image/chat.png")}
          alt="href='https://www.flaticon.com/kr/free-icons/' title='아스트랄 아이콘'>
          아스트랄 아이콘 제작자: Metami septiana - Flaticon"
          onClick={() => setTf(!tf)}
        />
        <div
          className="header-item-left-icon-modal"
          style={tf ? { display: "flex" } : { display: "none" }}
          onClick={() => clickQR()}
        >
          <span style={{ fontSize: "10px" }}>
            <span style={{ color: "rgb(255, 230, 0)" }}>kakao</span>
            <span style={{ color: "rgb(64, 138, 118)" }}> {">"}</span>{" "}
            scan&nbsp;
            <span style={{ color: "rgb(64, 138, 118)" }}>or</span> click
          </span>
          <img
            className="header-item-left-icon-modal-item"
            src={require("../common/image/chatQR.jpg")}
            alt="오픈채팅 QR코드"
          />
        </div>
      </div>
      <div className="header-item">
        <div className="header-item1">
          <span
            style={{ fontSize: "9px", paddingTop: "6px", paddingLeft: "2px" }}
          >
            {city}
          </span>
          &nbsp;
          {temp}
          {icon ? "°c" : ""}
        </div>
        <span className="header-item2">{icon ? "|" : ""}</span>
        <img
          className="header-item3"
          style={icon ? { display: "flex" } : { display: "none" }}
          src={icon ? require("../common/image/" + icon + ".png") : ""}
          alt="href='https://www.flaticon.com/kr/free-icons/' title='아스트랄 아이콘'>
          아스트랄 아이콘 제작자: Metami septiana - Flaticon"
        />
      </div>
    </div>
  );
};

export default Header;
