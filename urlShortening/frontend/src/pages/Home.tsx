import React, { useState } from "react";

interface Response {
  shortUrl: string;
  url: string;
}

function Home() {
  const [activeSegment, setActiveSegment] = useState("encode");
  const [listOfUrls, setListOfUrls] = useState([]);
  const [response, setResponse] = useState<Response>();
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleMenuButton = (type: string) => {
    setResponse(undefined);
    if (type === "list") {
      // fetch all urls
      fetch("http://127.0.0.1:8000/list")
        .then((response) => response.json())
        .then((data) => {
          setListOfUrls(data);
        });
    }

    setActiveSegment(type);
  };

  const handleShorten = (e) => {
    e.preventDefault();
    const url = e.target.url.value;
    fetch("http://127.0.0.1:8000/encode/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url: url }),
    })
      .then((response) => response.json())
      .then((data) => {
        navigator.clipboard.writeText(data.shortUrl);
        setResponse(data);
        setShowSuccessModal(true);
        setTimeout(() => {
          setShowSuccessModal(false);
        }, 2000);
      });
  };

  const handleLookup = (e) => {
    e.preventDefault();
    const shorturl = e.target.shorturl.value;
    fetch("http://127.0.0.1:8000/decode/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ shorturl: shorturl }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setResponse(data);
      });
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
          <form onSubmit={(e) => handleShorten(e)}>
            <input
              type="text"
              placeholder="Enter a URL to shorten"
              name="url"
            />
            <button type="submit">Shorten</button>
          </form>
          {response && (
            <div style={{ marginTop: "10px" }}>
              Shortened URL: {response.shortUrl}
            </div>
          )}
        </div>
      )}

      {activeSegment === "decode" && (
        <div>
          <h3>Look up a URL</h3>
          <form onSubmit={(e) => handleLookup(e)}>
            <input
              type="text"
              placeholder="Enter a shortened URL"
              name="shorturl"
            />
            <button type="submit">Look up</button>
          </form>
          {response && (
            <div style={{ marginTop: "10px" }}>
              Original URL: {response.url}
            </div>
          )}
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
              <div style={{ width: "30%", overflowWrap: "break-word" }}>
                <a href={url.url}>{url.url}</a>
              </div>
              <div
                style={{
                  width: "30%",
                  marginRight: "10px",
                  overflowWrap: "break-word",
                }}
              >
                <a href={url.shortUrl}>{url.shortUrl}</a>
              </div>
            </div>
          ))}
        </div>
      )}

      {showSuccessModal && (
        <div
          style={{
            backgroundColor: "#5fba7d",
            position: "absolute",
            bottom: "100px",
            left: "40%",
            right: "40%",
            zIndex: 10,
            padding: "10px",
            borderRadius: "5px",
          }}
        >
          <p>URL copied to clipboard!</p>
        </div>
      )}
    </div>
  );
}

export default Home;
