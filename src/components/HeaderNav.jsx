import React from "react";
import { Link } from "react-router-dom";

const HeaderNav = () => {
  return (
    <>
      <div className="sidebar">
        <h2>
          <Link to="/">Creative Fuel</Link>
        </h2>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/AddTestType">Add Test-Types </Link>
          </li>
          <li>
            <Link to="/AllTest"> All Tests</Link>
          </li>
          <li>
            <Link to="/AddTester">Add Tester</Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default HeaderNav;
