
import React from "react";
import { Routes, Route } from "react-router-dom";


import HeaderNav from "./components/HeaderNav";
import Home from "./components/Home";
import AddTestType from "./components/AddTestType";
import AllTest from "./components/AllTest";
import AddTester from "./components/AddTester";

import "./styles/header.css"
import "./styles/Allscenarios.css"
import "./styles/AddTestTypes.css"
import "./styles/App.css";
import "./styles/Home.css";
import "./styles/AddTester.css";



function App() {
   return (
      <div className="app">
         <HeaderNav  />

         <div>
            <Routes>
               <Route path='/' element={<Home />} />
               <Route path='/AddTestType' element={<AddTestType />} />
               <Route path='/AllTest' element={<AllTest />} />
               <Route path='/AddTester' element={<AddTester />} />
            </Routes>
         </div>
      </div>
   );
}

export default App;
