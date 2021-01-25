import React from "react";

export default function NoBoughts({ noBoughts }) {
  return (
    <div
      style={{
        display: "block",
        fontSize: "1.2rem",
        fontFamily: "Fredoka One",
        color: "#4C5D73",
        margin: "0 auto",
        paddingTop: "0.5rem",
        marginBottom: "0.5rem",
      }}
    >
      {noBoughts}
    </div>
  );
}
