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
    
    <div className="bg-gray-50 md:p-4 p-2 md:rounded-lg rounded-sm md:shadow-md shadow-sm flex flex-col items-center ">
      <div className="flex items-center justify-between w-full md:mb-4 mb-2 md:gap-4 gap-2">
        <PiNotepadFill className="text-button-bg rounded text-primary md:w-10 w-8 h-auto" />
        <div className="flex-1">
          <h3 className="md:text-lg text-md font-semibold mb-2 text-primary">{note.title}</h3>
          <p className="md:text-sm text-xs text-gray-400 mb-2">{note.date}</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => editNote(note)}
            className="p-2 bg-primary text-white rounded md:hover:bg-secondary md:w-10 w-8 h-auto"
          >
            <FaEdit/>
          </button>
          <button
            onClick={() => exportAsPDF(note)}
            className="p-2 bg-green-500 text-white rounded md:hover:bg-green-600 md:w-10 w-8 h-auto"
          >
            <FaFilePdf />
          </button>
          <button
            onClick={() => shareAsText(note)}
            className="p-2 bg-blue-500 text-white rounded md:hover:bg-blue-600 md:w-10 w-8 h-auto"
          >
            <MdShare />
          </button>
          <button
            onClick={() => deleteNote(note.id)}
            className="p-2 bg-red-500 text-white rounded md:hover:bg-red-600 md:w-10 w-8 h-auto"
          >
            <MdDeleteForever  />
          </button>
        </div>
      </div>
      
      <div className="w-full">
      <hr className="bg-primary  my-2" />
        <p className="text-gray-600 mb-4 text-left text-sm md:text-md text-wrap">
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