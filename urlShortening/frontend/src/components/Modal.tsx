import React from "react";

function Modal({ messageType }: { messageType: string }) {
  const color = messageType === "notFound" ? "#ef6c6d" : "#5fba7d";

  return (
    <div
      style={{
        backgroundColor: color,
        position: "absolute",
        bottom: "100px",
        left: "40%",
        right: "40%",
        zIndex: 10,
        padding: "10px",
        borderRadius: "5px",
      }}
    >
      <p>
        {messageType === "notFound"
          ? "URL was not found in database"
          : "URL copied to clipboard!"}
      </p>
    </div>
  );
}

export default Modal;
