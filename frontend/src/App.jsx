import React from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import Header from "./component/header";
import StudentRegistration from "./component/StudentRegistration";
import StudentList from "./component/StudentList";
import StudentDetails from "./component/StudentDetails";
import SearchStudent from "./component/SearchStudent";

const App = () => {
  return (
    <>
      <ToastContainer position="top-center" autoClose={1000} />
      <Header />

      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<StudentRegistration />} />
          <Route path="/student" element={<StudentList />} />
          <Route path="/student/:id" element={<StudentDetails />} />
          <Route path="/search" element={<SearchStudent />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
