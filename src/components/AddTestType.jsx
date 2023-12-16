import React, { useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddTestType = () => {
  const[customTestType,setCustomTestType]=useState([])
  const [testType, setTestType] = useState("");
  const [testDate, setTestDate] = useState("");

  const handleReset = () => {
    setTestType("");
    setTestDate("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.set("name", testType);

    formData.set("date", testDate);

    const url = "https://creativefuel.onrender.com/test_type";
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({ id: "", name: testType, date: testDate }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        toast.success(`Test added Successfully as id : ${data.id}`);
      })
      .catch((error) => console.error(error));
  };

  const handleInputChange = (event) => { 
    const target = event.target;
    const value = target.value;

    setCustomTestType([...customTestType, value]);
    setTestType(value);
  }

  return (
    <>
      <ToastContainer />

      <div className="main-addscene">
        <h2>Add Test</h2>

        <form method="post" id="form" onSubmit={handleSubmit}>
          <div className="container2">
            <div style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "0.5rem"
            }}>
              <label htmlFor="testtype">Test Type : </label>
              <select
                required
                name="testtype"
                id="testtype"
                value={testType}
                onChange={(e) => setTestType(e.target.value)}
              >
                <option value=""> Select Test Type </option>
                <option value="php">PHP</option>
                <option value="node js">Node Js</option>
                <option value="react js">React Js</option>
                {
                  customTestType?.map((obj,id) => {
                    return (
                      <option key={id} value={obj}>
                        {obj}
                      </option>
                    );
                  })
                }
              </select>
              <input type="text" placeholder="Enter Custom Test type" onBlur={handleInputChange} />
            </div>

            {/* <div>
              <label htmlFor="testtype">Test Type</label> <br />
              <input
                type="text"
                id="testtype"
                required
                placeholder="Test Type"
                onChange={(e) => setTestType(e.target.value)}
                value={testType}
              />
            </div> */}

            <div>
              <label htmlFor="testdate">Test Date</label> <br />
              <input
                type="date"
                id="testdate"
                required
                placeholder="dd-mm-yyyy"
                onChange={(e) => setTestDate(e.target.value)}
                value={testDate}
              />
            </div>
          </div>
          <div className="buttonContainer">
            <button className="btn " id="add" type="submit">
              Add
            </button>
            <button
              className="btn orangebtn"
              id="reset"
              type="reset"
              onClick={handleReset}
            >
              Reset
            </button>
            <button className="btn" id="go-back">
              Go Back
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddTestType;
