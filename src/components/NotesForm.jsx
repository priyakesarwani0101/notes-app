import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

const NotesForm = () => {
  const navigate = useNavigate();
  const [note, setNote] = useState({
    id: "",
    title: "",
    description: "",
    createdTime: "",
    updatedTime: "",
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    setNote({
      ...note,
      [e?.target?.name]: e?.target?.value,
      createdTime: new Date().toLocaleString(),
      updatedTime: new Date().toLocaleString(),
      id: uuidv4(),
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(note, "notess");
    const notesData = JSON.parse(localStorage.getItem("notes")) || [];
    notesData.push(note);
    localStorage.setItem("notes", JSON.stringify(notesData));
    setNote({
      id: "",
      title: "",
      description: "",
      createdTime: "",
      UpdatedTime: "",
    });
    navigate("/");
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-8 border-2 border-red-400 rounded-md">
      <h3>Add New Notes</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            id="title"
            name="title"
            value={note.title}
            onChange={handleInputChange}
            className="mt-1 p-2 border border-orange-400 rounded-md w-full"
            placeholder="Note Title"
          />
        </div>
        <div>
          <textarea
            id="description"
            name="description"
            value={note.description}
            onChange={handleInputChange}
            className="mt-1 p-5 border border-orange-400 rounded-md w-full"
            required
            placeholder="Notes Description here.."
          ></textarea>
        </div>
        <div>
          <button
            type="submit"
            className="bg-orange-700 text-white px-4 py-2 rounded-md"
          >
            Add Note
          </button>
        </div>
      </form>
    </div>
  );
};

export default NotesForm;
