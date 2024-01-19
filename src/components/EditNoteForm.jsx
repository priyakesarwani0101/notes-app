import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditNoteForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [editedNote, setEditedNote] = useState();

  const fetchNote = () => {
    const notes = JSON.parse(localStorage.getItem("notes")) || [];
    const note = notes.find((n) => n.id === id);
    setEditedNote({ ...note });
  };

  useEffect(() => {
    fetchNote();
  }, []);

  const handleInputChange = (e) => {
    setEditedNote({
      ...editedNote,
      [e?.target?.name]: e?.target?.value,
      updatedTime: new Date().toLocaleString(),
    });
  };

  const handleSave = (e) => {
    e.preventDefault();
    const existingNotes = JSON.parse(localStorage.getItem("notes")) || [];
    const noteIndex = existingNotes.findIndex((n) => n.id === id);
    if (noteIndex !== -1) {
      existingNotes[noteIndex] = { ...editedNote, id };
      localStorage.setItem("notes", JSON.stringify(existingNotes));
    }
    navigate("/");
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-8 border-2 border-red-400 rounded-md">
      <h3>Edit Note</h3>
      <form onSubmit={handleSave} className="space-y-4">
        <div>
          <input
            type="text"
            id="title"
            name="title"
            value={editedNote?.title}
            onChange={handleInputChange}
            className="mt-1 p-2 border border-orange-400 rounded-md w-full"
            placeholder="Note Title"
          />
        </div>
        <div>
          <textarea
            id="description"
            name="description"
            value={editedNote?.description}
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
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditNoteForm;
