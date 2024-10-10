import { useState } from "react";
import data from "./data";
import "./style.css";

export default function Accordian() {
  const [selected, setSelected] = useState(null);
  const [enableMultiSelection, setEnableMultiSelection] = useState(false);
  const [multiple, setMultiple] = useState([]);

  function handleSingleSelection(getCurrentid) {
    console.log(getCurrentid);
    setSelected(getCurrentid === selected ? null : getCurrentid);
  }

  function handlemultipleSelection(getCurrentid) {
    const copyMultiple = [...multiple];
    console.log(copyMultiple);

    const findIndexOfCurrentId = copyMultiple.indexOf(getCurrentid);
    console.log(findIndexOfCurrentId);

    if (findIndexOfCurrentId === -1) copyMultiple.push(getCurrentid);
    else copyMultiple.splice(findIndexOfCurrentId, 1);

    setMultiple(copyMultiple);
  }

  return (
    // *********************Wrapper***********************
    <div className="acc-wrapper">
      {" "}
      <h1>Accordian</h1>

      
      {/* *****************button**************************** */}
      <button onClick={() => setEnableMultiSelection(!enableMultiSelection)}>
        Enable Multi Selection
      </button>


      {/* ********************MultiselectorDisplay******************* */}
      <div className="multiSelectorDisplay">
        <div>
          <h2>
            {" "}
            EnableMultiSelection :{" "}
            {enableMultiSelection ? (
              <h2 style={{ color: "red" }}> ON </h2>
            ) : (
              <h2> Off </h2>
            )}{" "}
          </h2>{" "}
        </div>

        {/* ************************Accordian************************** */}
        <div className="accordian">
          {data && data.length ? (
            data.map((dataitem) => (
              <div
                onClick={
                  enableMultiSelection
                    ? () => handlemultipleSelection(dataitem.id)
                    : () => handleSingleSelection(dataitem.id)
                }
                className="item"
              >
                <div className="title">
                  <h3>{dataitem.question}</h3>
                  <span>+</span>
                </div>
                <div className="answers">
                  {enableMultiSelection
                    ? multiple.indexOf(dataitem.id) !== -1 && (
                        <div className="content"> {dataitem.answer} </div>
                      )
                    : selected === dataitem.id && (
                        <div className="content"> {dataitem.answer} </div>
                      )}{" "}
                </div>

                {selected === dataitem.id ? (
                  <div className="content">{dataitem.answer} </div>
                ) : null}
              </div>
            ))
          ) : (
            <div> No Data </div>
          )}
        </div>
      </div>
    </div>
  );
}
