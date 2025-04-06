const NoteForm = ({ handleSubmit, title, setTitle, content, setContent, editId }) => (
    <form
      onSubmit={handleSubmit}
      className="bg-white md:p-6 p-2 rounded-lg shadow-md"
    >
      <input
        type="text"
        placeholder="Note Title"
        className="w-full p-2 mb-4 border rounded-sm outline-none border-primary bg-white "
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Note Content"
        className="w-full p-2 mb-4 border border-primary bg-white rounded-sm min-h-20 outline-none"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button
        type="submit"
        className="bg-primary hover:bg-secondary text-white px-6 py-2 rounded-sm md:w-1/5 w-full"
      >
        {editId ? "Update Note" : "Add Note"}
      </button>
    </form>
  );
  
  export default NoteForm;