import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import NotesForm from "../components/NotesForm";
import EditNoteForm from "../components/EditNoteForm";

const AllRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />}></Route>
        <Route path="/create-notes" element={<NotesForm />} />
        <Route path="/edit-note/:id" element={<EditNoteForm />} />
      </Routes>
    </>
  );
};

export default AllRoutes;
