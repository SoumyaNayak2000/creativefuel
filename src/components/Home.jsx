import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { VscTrash } from "react-icons/vsc";
import {  FaEdit } from "react-icons/fa";

const Home = () => {
  // const [toShowDataV, setToShowDataV] = useState([])
  const [data, setData] = useState([]);
  const [datav, setDatav] = useState([]);
  const [id, setId] = useState("");
  const [testTypeId, setTestTypeId] = useState("");
  const [testname, setTestName] = useState("");
  const [email, setEmail] = useState("");
  const [mobno, setMobNo] = useState("");
  const [alternativeno, setAlternativeNo] = useState("");
  const [showTable, setShowTable] = useState(true);
  const [myStyle, setMyStyle] = useState({
    display: "none",
  });

  const url = "https://creativefuel.onrender.com/test_type";
  useEffect(() => {
    getTestTypes();
  }, []);
  function getTestTypes() {
    fetch(url).then((result) => {
      result.json().then((response) => {
        console.log("Result", response);
        setData(response);
        // console.log(response.id);
        console.log(response);
      });
    });
  }
  const url1 = "https://creativefuel.onrender.com/test_mast";
  useEffect(() => {
    getTesters();
  }, []);
  function getTesters() {
    fetch(url1).then((result) => {
      result.json().then((response) => {
        console.log("Result", response);
        setDatav(response);
        // console.log(response.id);
        console.log(response);
      });
    });
  }

  function selectTester(id) {
    const url2 = `https://creativefuel.onrender.com/test_mast?id=${id}`;
    fetch(url2).then((result) => {
      result.json().then((response) => {
        // console.log("Result", response);
        setId(response[0].id);
        setTestTypeId(response[0].testtypeid);
        setTestName(response[0].testname);
        setEmail(response[0].email);
        setMobNo(response[0].mobno);
        setAlternativeNo(response[0].alternativeno);
      });
    });
    if (myStyle.display === "none") {
      setMyStyle({
        display: "flex",
      });
    }
  }

  function getTable() {
    fetch(url1).then((result) => {
      result.json().then((response) => {
        if (response.length > 0) {
          setDatav(response);
          setId(response[0].id);
          setTestTypeId(response[0].testtypeid);
          setTestName(response[0].testname);
          setEmail(response[0].email);
          setMobNo(response[0].mobno);
          setAlternativeNo(response[0].alternativeno);
        } else {
          setShowTable(false);
        }
      });
    });
  }

  function updateTester(id) {
    const item = {
      id,
      testtypeid:testTypeId,
      testname,
      email,
      mobno,
      alternativeno,
    };
    fetch(`https://creativefuel.onrender.com/test_mast/${id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    }).then((result) => {
      result.json().then((response) => {
        getTable();
        toast.success(`Scenario id ${id} is Updated Successfully`);
      });
    });
    if (myStyle.display === "flex") {
      setMyStyle({
        display: "none",
      });
    }
  }

  function deleteTester(id) {
    console.log(id);
    fetch(`https://creativefuel.onrender.com/test_mast/${id}`, {
      method: "DELETE",
    }).then((result) => {
      result.json().then((result) => {
        toast.warn(`Tester id ${id} has been Deleted Successfully`);
        getTable();
      });
    });
  }

  function getTesterByTestTypes(testerid) {
    fetch(`https://creativefuel.onrender.com/test_mast`, {
      method: "GET",
    }).then((result) => {
      result.json().then((result) => {
        const varr = result.filter((tester) => tester.testtypeid === testerid);
        setDatav(varr);
      });
    });
  }



  return (
    <>
      <ToastContainer />
      <div className="main-Home">
        <div className="homeScenario">
          <label htmlFor="homeScenario">Test Names</label>

          <select
            name="scenariosName"
            id="homeScenario"
            onChange={(e) => getTesterByTestTypes(e.target.value)}
          >
            {data.map((obj) => {
              return (
                <option key={obj.name} value={obj.id}>
                  {obj.name}
                </option>
              );
            })}
          </select>
        </div>
        {showTable ? (
          <div className="home-table">
            <table className="tableMain">
              <tr>
                <th className="table-heading">Tester Id</th>
                <th className="table-heading">Tester Name</th>
                <th className="table-heading">Tester Email</th>
                <th className="table-heading">Phone</th>
                <th className="table-heading">Alternate No.</th>
                <th className="table-heading">Edit</th>
                <th className="table-heading">Delete</th>
              </tr>

              {datav.map((obj) => {
                return (
                  <tr className="allScenarios-row" key={obj.id}>
                    <td className="table-data">{obj.id}</td>
                    <td className="table-data">{obj.testname}</td>
                    <td className="table-data">{obj.email}</td>
                    <td className="table-data">{obj.mobno}</td>
                    <td className="table-data">{obj.alternativeno}</td>
                    <td className="table-data">
                      <button
                        type="edit"
                        onClick={() => selectTester(obj.id)}
                        className="addV"
                      >
                        <FaEdit />
                      </button>
                    </td>
                    <td className="table-data">
                      <button
                        type="submit"
                        onClick={() => deleteTester(obj.id)}
                        className="addV"
                      >
                        <VscTrash />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </table>
          </div>
        ) : (
          <div className="elsesent">
            No Vehicle found,&nbsp; <Link to="/AddTestType"> Click here </Link>{" "}
            &nbsp;To add vehicle!.
          </div>
        )}
        <div className="tester-update" style={myStyle}>
          <h2>Update Vehicle</h2>

          <div>
            <label htmlFor="vid">ID: </label>
            <input
              type="text"
              name="iid"
              id="vid"
              value={id}
              disabled
              readOnly
            />
          </div>
          <div>
            <label htmlFor="tid">Test ID: </label>
            <input
              type="text"
              name="tid"
              id="tid"
              value={testTypeId}
              disabled
              readOnly
            />
          </div>
          <div>
            <label htmlFor="vname">Tester Name:</label>
            <input
              type="text"
              name="name"
              id="vname"
              value={testname}
              onChange={(e) => setTestName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="phone">Phone</label>
            <input
              type="tel"
              name="phone"
              id="phone"
              value={mobno}
              onChange={(e) => setMobNo(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="no">Alternate No.</label>
            <input
              type="tel"
              name="altno"
              id="no"
              value={alternativeno}
              onChange={(e) => setAlternativeNo(e.target.value)}
            />
          </div>
          <button onClick={() => updateTester(id)}>Update Tester</button>
        </div>
      </div>
    </>
  );
};

export default Home;
