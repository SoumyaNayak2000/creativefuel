import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddTester = () => {
  const [formError, setFormError] = useState({});
  const [testName, setTestName] = useState("");
  const [email, setEmail] = useState("");
  const [mobNo, setMobNo] = useState("");
  const [alternativeNo, setAlternativeNo] = useState("");
  const [testTypeId, setTestTypeId] = useState(-"");
  const [data, setData] = useState([]);

  const url = "https://creativefuel.onrender.com/test_type";
  useEffect(() => {
    getTestDetails();
  }, []);
  function getTestDetails() {
    fetch(url).then((result) => {
      result.json().then((response) => {
        console.log("Result", response);
        setData(response);
        console.log(response);
      });
    });
  }

  const validationFn = () => {
    // e.preventDefault();
    let tempErrorObj = {};
 

    if (testName === "") {
      tempErrorObj.testName = "Test Name Is Required";
    }
    if (email === "") {
      tempErrorObj.email = "Email Is Required";
    }

    //format of mobile number is correct - hw
    let regexmobile = new RegExp(
      "^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$"
    );

    if (mobNo === "") {
      tempErrorObj.mobNo = "Mobile No Is Required";
    } else if (!regexmobile.test(mobNo)) {
      tempErrorObj.mobNo = "Mobile No Is Invalid";
    }

    if (alternativeNo === mobNo) {
      tempErrorObj.alternativeNo =
        "Alternative Number Should be different from Mobile Number";
    } else if (!regexmobile.test(alternativeNo)) {
      tempErrorObj.alternativeNo = "Alternative No Is Invalid";
    }

    setFormError(tempErrorObj);

    let error = Object.keys(tempErrorObj).length;
    // console.log(error)
    if (error === 0) {
      return true;
    } else {
      return false;
    }
  }

  const handleSubmit = (e) => {

    e.preventDefault();
    let errorStatus = validationFn();
    if (errorStatus) {
      const formData = new FormData();
      formData.set("testname", testName);
      formData.set("email", email);

      formData.set("mobno", mobNo);

      formData.set("alternativeno", alternativeNo);

      formData.set("testtypeid", testTypeId);

      const url = "https://creativefuel.onrender.com/test_mast";
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          id: "",
          testtypeid: testTypeId,
          testname: testName,
          email: email,
          mobno: mobNo,
          alternativeno: alternativeNo,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          toast.success(
            `Tester Details has been added Successfully as id : ${data.id}`
          );
        })
        .catch((error) => console.error(error));
      
      handleReset()
    }
  };

  const handleReset = () => {
    setTestName("");
    setEmail("");
    setMobNo("");
    setAlternativeNo("");
  };

  return (
    <>
      <div className="addTesterMain">
        <ToastContainer />
        <h2>Add Tester</h2>
        <form method="post" id="form" onSubmit={handleSubmit}>
          <div className="inputGroups">
            <div>
              <label htmlFor="test-type">Test Type : </label>
              <select
                name="testTypes"
                id="test-type"
                required
                onChange={(e) => {
                  setTestTypeId(e.target.value);
                }}
              >
                <option value=""> Select Test </option>
                {data.map((obj) => {
                  return (
                    <option key={obj.id} value={obj.id}>
                      {obj.id} : {obj.name.toUpperCase()}
                    </option>
                  );
                })}
              </select>
            </div>

            <div>
              <label htmlFor="TestName">Tester Name : </label>
              <input
                required
                placeholder="John Smith"
                type="text"
                id="TestName"
                onChange={(e) => setTestName(e.target.value)}
                value={testName}
              />
              <span className="errorMsg">{formError.testName}</span>
            </div>
            <div>
              <label htmlFor="email">Email : </label>
              <input
                required
                placeholder="2"
                type="email"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              <span className="errorMsg">{formError.email}</span>
            </div>
            <div>
              <label htmlFor="mobno">Mobile No : </label>
              <input
                required
                placeholder="20"
                type="tel"
                id="mobno"
                onChange={(e) => setMobNo(e.target.value)}
                value={mobNo}
              />
              <span className="errorMsg">{formError.mobNo}</span>
            </div>
            <div>
              <label htmlFor="alternativeno">Alternate No : </label>
              <input
                required
                placeholder="20"
                type="tel"
                id="alternativeno"
                onChange={(e) => setAlternativeNo(e.target.value)}
                value={alternativeNo}
              />
              <span className="errorMsg">{formError.alternativeNo}</span>
            </div>
          </div>

          <div className="buttonContainer1">
            <button type="submit" id="addTester">
              Add
            </button>
            <button type="reset" id="resetTester" onClick={handleReset}>
              Reset
            </button>
            <button id="go-back">Go Back</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddTester;
