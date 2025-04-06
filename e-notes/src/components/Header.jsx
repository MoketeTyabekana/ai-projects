import { PiNotepadFill } from "react-icons/pi";

const Header = ({ searchTerm, setSearchTerm }) => (
  <nav className="bg-primary flex flex-col md:flex-row justify-between md:items-center items-start md:px-10 md:py-4 p-2 w-full">
    <h1 className="md:text-3xl text-2xl font-bold text-center text-gray-50 flex items-center text-shadow-lg mb-4 md:mb-0">
      <PiNotepadFill className="md:inline-block mr-2 md:w-10 w-8 h-auto" />
      E-Notes
    </h1>
    <input
      type="text"
      placeholder="Search notes..."
      className="md:w-1/3 w-full p-3 border rounded-sm outline-none border-none bg-gray-50 shadow-sm"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  </nav>
);

export default Header;