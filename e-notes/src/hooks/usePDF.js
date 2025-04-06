import { jsPDF } from "jspdf";

const usePDF = () => {
  const shareAsText = (note) => {
    const text = `${note.title}\n\n${note.content}\n\nCreated: ${note.date}`;
    if (navigator.share) {
      navigator.share({
        title: note.title,
        text: text,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(text);
      alert("Note copied to clipboard!");
    }
  };

  const exportAsPDF = (note) => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text(note.title, 10, 10);
    doc.setFontSize(12);
    doc.text(`Created: ${note.date}`, 10, 20);
    doc.text(note.content, 10, 30, { maxWidth: 180 });
    doc.save(`note-${note.id}.pdf`);
  };

  return { shareAsText, exportAsPDF };
};

export { usePDF };