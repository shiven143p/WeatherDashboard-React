import React from "react";

const Home = () => {
  return (
    <>
      <div className="heading">Welcome to Weather Dashboard Project</div>
      <div className="content">
        <div className="column-1">
          <p>
            A small demo project to display current weather record for selected
            city.
          </p>
          <p>
            The selected city get passed to an API to retrive the location
            details like latitude, logitude coordinates and display name.
          </p>
          <p>
            The location latitude, logitude coordinates further passed to an API
            to retrive the weather details for current, hourly or daily basis.
          </p>
        </div>
      </div>
    </>
  );
};

export default Home;
