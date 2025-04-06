import { useState, useEffect } from "react";
import { PiNotepadFill } from "react-icons/pi";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

const Note = ({ note, editNote, deleteNote }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const truncatedContent =
    note.content.length > 100
      ? note.content.substring(0, 50) + "..."
      : note.content;

  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center h-fit">
      <div className="flex items-center justify-between w-full mb-4">
        <PiNotepadFill
          className="inline-block mr-2 text-button-bg  rounded"
          size={50}
        />
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-2">{note.title}</h3>
          <p className="text-sm text-gray-400 mb-2">{note.date}</p>
        </div>
        <button
          onClick={() => editNote(note)}
          className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
        >
          <FaEdit size={20} />
        </button>
        <button
          onClick={() => deleteNote(note.id)}
          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
        >
         <MdDeleteForever size={20} />
        </button>
      </div>
      <div className="    w-full">
        <p className="text-gray-600 mb-4 text-left">
          {isExpanded ? note.content : truncatedContent}
          {note.content.length > 100 && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-blue-500 hover:text-blue-600  text-md"
            >
              {isExpanded ? "View Less" : "View More"}
            </button>
          )}
        </p>
      </div>
    </div>
  );
};

function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const savedNotes = localStorage.getItem("notes");
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !content) return;

    if (editId) {
      const updatedNotes = notes.map((note) =>
        note.id === editId ? { ...note, title, content } : note
      );
      setNotes(updatedNotes);
      setEditId(null);
    } else {
      const newNote = {
        id: Date.now(),
        title,
        content,
        date: new Date().toLocaleString(),
      };
      setNotes([newNote, ...notes]);
    }

    setTitle("");
    setContent("");
  };

  const deleteNote = (id) => {
    const filteredNotes = notes.filter((note) => note.id !== id);
    setNotes(filteredNotes);
  };

  const editNote = (note) => {
    setTitle(note.title);
    setContent(note.content);
    setEditId(note.id);
  };

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-body-bg min-h-screen">
      <nav className="bg-primary flex justify-between items-center px-10 py-4">
        <h1 className="text-3xl font-bold text-center text-gray-50 flex justify-center items-center text-shadow-lg">
          <PiNotepadFill className="inline-block mr-2" size={50} />
          E-Notes
        </h1>
        <input
          type="text"
          placeholder="Search notes..."
          className="w-1/3 p-3  border rounded-lg outline-none border-none bg-gray-50  shadow-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </nav>

      <div className=" grid grid-cols-2 p-10 gap-10">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-md"
        >
          <input
            type="text"
            placeholder="Note Title"
            className="w-full p-2 mb-4 border rounded-lg outline-none"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Note Content"
            className="w-full p-2 mb-4 border rounded-lg h-32"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <button
            type="submit"
            className="bg-primary hover:bg-secondary text-white px-6 py-2 rounded-lg w-full"
          >
            {editId ? "Update Note" : "Add Note"}
          </button>
        </form>

        <div className="bg-white p-6 rounded-lg shadow-md ">
          {filteredNotes.length === 0 && (
            <p className="text-center text-gray-500 ">
              No notes found. Start creating some!
            </p>
          )}
          <div className="grid  gap-4 flex-2 min-h-screen">
            {filteredNotes.map((note) => (
              <Note
                key={note.id}
                note={note}
                editNote={editNote}
                deleteNote={deleteNote}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
