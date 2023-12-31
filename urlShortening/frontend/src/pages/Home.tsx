import React, { useState } from "react";
import Modal from "../components/Modal.tsx";
import NavBar from "../components/NavBar.tsx";

interface Response {
  shortUrl: string;
  url: string;
}

function Home() {
  const [activeSegment, setActiveSegment] = useState("encode");
  const [listOfUrls, setListOfUrls] = useState([]);
  const [response, setResponse] = useState<Response>();
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [messageType, setMessageType] = useState<string>("");

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

  const handleShorten = (e: any) => {
    e.preventDefault();
    const url = e?.target?.url?.value;
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
        setMessageType("success");
        setShowMessageModal(true);
        setTimeout(() => {
          setShowMessageModal(false);
        }, 2000);
      });
  };

  const handleLookup = (e: any) => {
    e.preventDefault();
    const shorturl = e?.target?.shorturl?.value;
    fetch("http://127.0.0.1:8000/decode/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ shorturl: shorturl }),
    })
      .then((response) => response.json())
      .then((data) => {
        setResponse(data);
        if (!data) {
          setMessageType("notFound");
          setShowMessageModal(true);
          setTimeout(() => {
            setShowMessageModal(false);
          }, 2000);
        }
      });
  };

  return (
    <div className="App">
      <h2>URL Shortening Service</h2>

      <NavBar
        activeSegment={activeSegment}
        handleMenuButton={handleMenuButton}
      />

      {activeSegment === "encode" && (
        <div>
          <h3>Shorten a URL</h3>
          <form onSubmit={(e) => handleShorten(e)}>
            <input
              type="text"
              placeholder="Enter a URL to shorten"
              name="url"
              data-testid="input1"
            />
            <button type="submit" data-testid="button1">
              Shorten
            </button>
          </form>
          {response && (
            <div style={{ marginTop: "10px" }} data-testid="resultDiv">
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

      {showMessageModal && <Modal messageType={messageType} />}
    </div>
  );
}

export default Home;
