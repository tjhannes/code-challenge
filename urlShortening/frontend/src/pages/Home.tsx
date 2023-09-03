import React, { useState } from "react";

function Home() {
  const [activeSegment, setActiveSegment] = useState("encode");
  const [listOfUrls, setListOfUrls] = useState([]);

  const handleMenuButton = (type) => {
    if (type === "list") {
      // fetch all urls
      fetch("http://127.0.0.1:8000/list")
        .then((response) => response.json())
        .then((data) => {
          console.log(data);

          setListOfUrls(data);
        });
    }

    setActiveSegment(type);
  };

  return (
    <div className="App">
      <h2>URL Shortening Service</h2>
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
          className={
            activeSegment === "list" ? "activeButton" : "inactiveButton"
          }
          onClick={() => handleMenuButton("list")}
        >
          List all
        </div>
      </div>

      {activeSegment === "encode" && (
        <div>
          <h3>Shorten a URL</h3>
          <form>
            <input type="text" placeholder="Enter a URL to shorten" />
            <button type="submit">Shorten</button>
          </form>
        </div>
      )}

      {activeSegment === "decode" && (
        <div>
          <h3>Look up a URL</h3>
          <form>
            <input type="text" placeholder="Enter a shortened URL" />
            <button type="submit">Look up</button>
          </form>
        </div>
      )}

      {activeSegment === "list" && (
        <div>
          <h3>List all URLs</h3>
          {listOfUrls.map((url: any, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                textAlign: "left",
              }}
            >
              <div style={{ width: "5%", marginRight: "10px" }}>
                {index + 1}
              </div>
              <div style={{ width: "30%" }}>
                <a href={url.url}>{url.url}</a>
              </div>
              <div style={{ width: "30%", marginRight: "10px" }}>
                <a href={url.shortUrl}>{url.shortUrl}</a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
