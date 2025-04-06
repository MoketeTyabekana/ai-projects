import { useState, useEffect } from "react";
import Header from "./components/Header";
import Note from "./components/Note";
import NoteForm from "./components/NoteForm";
import Footer from "./components/Footer";

function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const savedNotes = localStorage.getItem("notes");
    if (savedNotes) setNotes(JSON.parse(savedNotes));
  }, []);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !content) return;

    const newNote = {
      id: Date.now(),
      title,
      content,
      date: new Date().toLocaleString(),
    };

    setNotes(prev => editId
      ? prev.map(note => note.id === editId ? { ...note, title, content } : note)
      : [newNote, ...prev]
    );
    setEditId(null);
    setTitle("");
    setContent("");
  };

  const deleteNote = (id) => setNotes(prev => prev.filter(note => note.id !== id));
  
  const editNote = (note) => {
    setTitle(note.title);
    setContent(note.content);
    setEditId(note.id);
  };

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main>
      <section className="bg-body-bg min-h-screen">
        <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        
        <div className="flex flex-col md:p-10 p-2 md:gap-10 gap-4">
          <NoteForm
            handleSubmit={handleSubmit}
            title={title}
            setTitle={setTitle}
            content={content}
            setContent={setContent}
            editId={editId}
          />
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            {filteredNotes.length === 0 ? (
              <p className="text-center text-gray-500">
                No notes found. Start creating some!
              </p>
            ) : (
              <div className="grid gap-4 flex-2 min-h-screen">
                {filteredNotes.map(note => (
                  <Note
                    key={note.id}
                    note={note}
                    editNote={editNote}
                    deleteNote={deleteNote}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}

export default App;