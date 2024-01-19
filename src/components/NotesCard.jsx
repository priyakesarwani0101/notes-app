import React from "react";
import { useNavigate } from "react-router-dom";
import { BsPencil, BsTrash } from "react-icons/bs";

const NoteCard = ({ note, onDelete }) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/edit-note/${note.id}`);
  };

  const handleDelete = () => {
    const notes = JSON.parse(localStorage.getItem("notes")) || [];
    const noteIndex = notes.findIndex((n) => n.id === note.id);
    notes.splice(noteIndex, 1);
    localStorage.setItem("notes", JSON.stringify(notes));
    onDelete(note.id);
  };

  return (
    <div className="rounded-md overflow-hidden shadow-lg transition-transform transform hover:scale-105">
      <div className="bg-gradient-to-r from-red-300 via-orange-200 to-white p-6">
        <h2 className="text-lg font-semibold text-blue mb-2">
          {note?.title || ""}
        </h2>
        <p className="text-sm font-normal text-blue mb-4">
          {note?.description || ""}
        </p>
      </div>
      <div className="bg-white p-4">
        <div className="flex justify-between items-center text-xs">
          <div>
            <span className="font-bold">Created At:</span>{" "}
            {note?.createdTime || ""}
          </div>
          <div>
            <span className="font-bold">Updated At:</span>{" "}
            {note?.updatedTime || note?.UpdatedTime || ""}
          </div>
        </div>
        <div className="flex justify-between items-center mt-4">
          <button onClick={handleEdit} className="text-indigo-800">
            <BsPencil />
          </button>
          <button onClick={handleDelete} className="text-red-700">
            <BsTrash />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
