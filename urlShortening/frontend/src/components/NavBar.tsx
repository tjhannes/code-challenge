import React from "react";

function NavBar({ activeSegment, handleMenuButton }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
      }}
    >
      <div
        className={
          activeSegment === "encode" ? "activeButton" : "inactiveButton"
        }
        onClick={() => handleMenuButton("encode")}
      >
        Shorten
      </div>
      <div
        className={
          activeSegment === "decode" ? "activeButton" : "inactiveButton"
        }
        onClick={() => handleMenuButton("decode")}
      >
        Look up
      </div>
      <div
        className={activeSegment === "list" ? "activeButton" : "inactiveButton"}
        onClick={() => handleMenuButton("list")}
      >
        List all
      </div>
    </div>
  );
}

export default NavBar;
