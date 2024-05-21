import React from "react";

const NotFound = () => {
  const warning = {
    color: "red",
  };
  return (
    <>
      <div className="heading">404-Not Found</div>
      <div className="content">
        <div className="column-1">
          <p style={warning}>Invalid Url</p>
        </div>
      </div>
    </>
  );
};

export default NotFound;
