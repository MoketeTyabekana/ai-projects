import { useState } from "react";
import { FiType, FiFileText, FiMic } from "react-icons/fi";

const NoteForm = ({
  handleSubmit,
  title,
  setTitle,
  content,
  setContent,
  editId,
}) => {
  const [activeTab, setActiveTab] = useState("write");
  const [isRecording, setIsRecording] = useState(false);
  const [audioRecorder, setAudioRecorder] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // File upload handler
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsLoading(true);
    
    try {
      // Read file content
      const text = await file.text();
      // Set filename as title (without extension)
      const fileName = file.name.replace(/\.[^/.]+$/, "");
      setTitle(fileName);
      setContent(text);
      setActiveTab("write");
    } catch (error) {
      console.error("Error reading file:", error);
      alert("Error reading file. Please use text files.");
    } finally {
      setIsLoading(false);
    }
  };

  // Audio recording handlers
  const startAudioRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      const chunks = [];

      recorder.ondataavailable = (e) => chunks.push(e.data);
      
      recorder.onstop = async () => {
        const audioBlob = new Blob(chunks, { type: "audio/wav" });
        await convertAudioToText(audioBlob);
      };

      recorder.start();
      setAudioRecorder(recorder);
      setIsRecording(true);
    } catch (err) {
      console.error("Error accessing microphone:", err);
      alert("Microphone access denied. Please enable microphone permissions.");
    }
  };

  const stopAudioRecording = () => {
    if (audioRecorder) {
      audioRecorder.stop();
      setIsRecording(false);
    }
  };

  const convertAudioToText = async (audioBlob) => {
    setIsLoading(true);
    try {
      const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
      recognition.lang = "en-US";

      // Create a temporary audio URL for playback
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setContent(prev => prev + " " + transcript);
      };

      recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        alert("Error converting speech to text. Please try again.");
      };

      audio.play();
      recognition.start();
    } catch (error) {
      console.error("Speech recognition failed:", error);
      alert("Speech recognition not supported in this browser.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white md:p-6 p-2 rounded-lg md:shadow-md shadow-sm relative"
    >
      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
        </div>
      )}

      {/* Tab Navigation */}
      <div className="flex mb-4 border-b border-gray-200">
        {["write", "import", "audio"].map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`flex items-center px-4 py-2 text-sm font-medium ${
              activeTab === tab
                ? "border-b-2 border-primary text-primary"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab === "write" && <FiType className="mr-2" />}
            {tab === "import" && <FiFileText className="mr-2" />}
            {tab === "audio" && <FiMic className="mr-2" />}
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Write Tab Content */}
      {activeTab === "write" && (
        <>
          <input
            type="text"
            placeholder="Note Title"
            className="w-full p-2 mb-4 border rounded-sm outline-none"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Note Content"
            className="w-full p-2 mb-4 border rounded-sm min-h-20"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </>
      )}

      {/* Import Tab Content */}
      {activeTab === "import" && (
        <div className="mb-4">
          <label className="flex flex-col items-center justify-center h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-primary">
            <input
              type="file"
              className="hidden"
              accept=".txt,.md"
              onChange={handleFileUpload}
            />
            <FiFileText className="text-3xl text-gray-400 mb-2" />
            <p className="text-gray-500 text-center">
              Click to upload text file (.txt, .md)<br />
              File name will be used as title
            </p>
          </label>
        </div>
      )}

      {/* Audio Tab Content */}
      {activeTab === "audio" && (
        <div className="mb-4">
          <div className="flex flex-col items-center justify-center h-48 border-2 border-dashed border-gray-300 rounded-lg">
            {isRecording ? (
              <>
                <div className="animate-pulse text-red-500 flex items-center">
                  <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                  Recording...
                </div>
                <button
                  type="button"
                  onClick={stopAudioRecording}
                  className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Stop Recording
                </button>
              </>
            ) : (
              <>
                <FiMic className="text-3xl text-gray-400 mb-2" />
                <button
                  type="button"
                  onClick={startAudioRecording}
                  className="px-4 py-2 bg-primary text-white rounded hover:bg-secondary"
                >
                  Start Recording
                </button>
                <p className="mt-2 text-gray-500 text-sm">
                  Click to start voice recording
                </p>
              </>
            )}
          </div>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        className="bg-primary hover:bg-secondary text-white px-6 py-2 rounded-sm md:w-1/5 w-full"
      >
        {editId ? "Update Note" : "Add Note"}
      </button>
    </form>
  );
};

export default NoteForm;