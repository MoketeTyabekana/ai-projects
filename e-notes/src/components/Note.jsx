import { useState } from "react";
import { PiNotepadFill } from "react-icons/pi";
import { MdDeleteForever, MdShare } from "react-icons/md";
import { FaEdit, FaFilePdf } from "react-icons/fa";
import { usePDF } from "../hooks/usePDF";

const Note = ({ note, editNote, deleteNote }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { shareAsText, exportAsPDF } = usePDF();
  const truncatedContent =
    note.content.length > 100
      ? note.content.substring(0, 50) + "..."
      : note.content;

  return (
    <div className="bg-gray-50 p-4 rounded-lg shadow-md flex flex-col items-center h-fit">
      <div className="flex items-center justify-between w-full mb-4 gap-4">
        <PiNotepadFill className="text-button-bg rounded text-primary" size={50} />
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-2 text-primary">{note.title}</h3>
          <p className="text-sm text-gray-400 mb-2">{note.date}</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => editNote(note)}
            className="p-2 bg-primary text-white rounded hover:bg-secondary"
          >
            <FaEdit size={20} />
          </button>
          <button
            onClick={() => exportAsPDF(note)}
            className="p-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            <FaFilePdf size={20} />
          </button>
          <button
            onClick={() => shareAsText(note)}
            className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            <MdShare size={20} />
          </button>
          <button
            onClick={() => deleteNote(note.id)}
            className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            <MdDeleteForever size={20} />
          </button>
        </div>
      </div>
      
      <div className="w-full">
      <hr className="bg-primary  my-2" />
        <p className="text-gray-600 mb-4 text-left">
          {isExpanded ? note.content : truncatedContent}
          {note.content.length > 100 && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-blue-500 hover:text-blue-600 text-md ml-2"
            >
              {isExpanded ? "View Less" : "View More"}
            </button>
          )}
        </p>
      </div>
    </div>
  );
};

export default Note;