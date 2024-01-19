import React, { useEffect, useState } from "react";
import NoteCard from "./NotesCard";
import EmptyData from "./EmptyPage";

const NotesList = () => {
  const [notesData, setNotesData] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [sortCriteria, setSortCriteria] = useState("createdTime");
  const [sortOrder, setSortOrder] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const notesPerPage = 6;

  const fetchNotes = () => {
    const data = JSON.parse(localStorage.getItem("notes")) || [];
    setNotesData(data);
    setFilteredNotes(data);
  };

  const implementSearch = () => {
    const filtered = notesData.filter(
      (note) =>
        note.title.toLowerCase().includes(searchText.toLowerCase()) ||
        note.description.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredNotes(filtered);
  };

  const sortNotes = () => {
    const sortedNotes = [...filteredNotes].sort((a, b) => {
      if (sortOrder === "asc") {
        return a[sortCriteria] > b[sortCriteria] ? 1 : -1;
      } else {
        return a[sortCriteria] < b[sortCriteria] ? 1 : -1;
      }
    });
    setFilteredNotes(sortedNotes);
  };

  const handleDelete = (deletedNoteId) => {
    setNotesData((prevNotes) =>
      prevNotes.filter((note) => note.id !== deletedNoteId)
    );
    setFilteredNotes((prevFilteredNotes) =>
      prevFilteredNotes.filter((note) => note.id !== deletedNoteId)
    );
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  useEffect(() => {
    implementSearch();
  }, [searchText, notesData]);

  useEffect(() => {
    sortNotes();
  }, [sortCriteria, sortOrder]);

  const indexOfLastNote = currentPage * notesPerPage;
  const indexOfFirstNote = indexOfLastNote - notesPerPage;
  const currentNotes = filteredNotes.slice(indexOfFirstNote, indexOfLastNote);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="max-w-full h-screen mx-auto p-4 bg-red-50">
      {notesData && notesData.length > 0 ? (
        <>
          <div className="m-4 p-4 flex justify-between items-center">
            <div>
              <input
                type="text"
                placeholder="Search notes by title or desc....."
                className="p-2 border-2 border-orange-400 rounded-md w-[400px]"
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>
            <div className="flex space-x-3">
              <label className="p-2 bg-orange-200 rounded-md">
                Sort by:
                <select
                  value={sortCriteria}
                  onChange={(e) => setSortCriteria(e.target.value)}
                >
                  <option value="createdTime">Created Time</option>
                  <option value="updatedTime">Updated Time</option>
                </select>
              </label>
              <label className="p-2 bg-orange-200 rounded-md">
                Sort Order:
                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                >
                  <option value="asc">Oldest</option>
                  <option value="desc">Latest</option>
                </select>
              </label>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentNotes.map((note, index) => (
              <NoteCard key={index} note={note} onDelete={handleDelete} />
            ))}
          </div>
          <div className="fixed bottom-20 left-0 right-0 flex justify-center items-center">
            {[
              ...Array(Math.ceil(filteredNotes.length / notesPerPage)).keys(),
            ].map((number) => (
              <button
                key={number + 1}
                onClick={() => paginate(number + 1)}
                className={`mx-1 px-3 py-1 rounded-md focus:outline-none ${
                  currentPage === number + 1
                    ? "bg-red-700 text-white"
                    : "bg-orange-200"
                }`}
              >
                {number + 1}
              </button>
            ))}
          </div>
        </>
      ) : (
        <EmptyData />
      )}
    </div>
  );
};

export default NotesList;
