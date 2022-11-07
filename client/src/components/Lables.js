import React from "react";
import { useSelector } from "react-redux";
const Lables = () => {
  const { colors, lables } = useSelector((state) => state.expenses);
  return (
    <>
      <div>
        {" "}
        <div
          className="col-md-2 "
          style={{ display: "-webkit-inline-flex", alignContent: "baselines" }}
        >
          <div
            className="col-sm-3 mt-2"
            style={{
              width: "10px",
            }}
          >
            {colors.map((e, index) => {
              return (
                <div
                  key={index}
                  style={{
                    backgroundColor: `${e}`,
                    width: "10px",
                    height: "10px",
                    border: ` 0px solid`,
                    marginRight: "1px",

                    marginBottom: "1.3rem",
                  }}
                ></div>
              );
            })}
          </div>
          <div className=" col-9">
            {lables.forEach((elm, index) => {
              return (
                <div
                  key={index}
                  style={{
                    display: "-webkit-inline-flex",
                    alignContent: "baselines",
                  }}
                >
                  <h6 style={{ color: "#008764" }}>{elm}</h6>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Lables;
