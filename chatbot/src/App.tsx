import { useState, useEffect } from "react";
import axios from "axios";

const API_KEY = ""; //actual API key
const API_URL = "https://api.openai.com/v1/chat/completions";

function App() {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const welcomeMessage = { role: "bot", content: "Hello! How can I assist you today?" };
    setMessages([welcomeMessage]);
  }, []);

  const sendMessage = async () => {
    if (!input.trim()) return;
    
    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);
    
    try {
      const response = await axios.post(
        API_URL,
        {
          model: "gpt-3.5-turbo",
          messages: [...messages, userMessage],
        },
        {
          headers: {
            "Authorization": `Bearer ${API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );
      
      const botMessage = response.data.choices[0].message;
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error fetching response:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      {/* Navbar */}
      <nav className="w-full bg-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-purple-700">VerziBiz</h1>
        <div className="flex space-x-6">
          <div className="relative">
            <button 
              onClick={() => setShowDropdown(!showDropdown)}
              className="text-gray-700 hover:text-purple-700 font-medium"
            >
              Solutions ▾
            </button>
            {showDropdown && (
              <div className="absolute mt-2 bg-white shadow-lg rounded-lg w-64 p-2 border border-gray-200">
                <a href="#qr-code" className="block px-4 py-2 hover:bg-gray-100">QR Code Generator</a>
                <a href="#product-collage" className="block px-4 py-2 hover:bg-gray-100">Product Collage Maker</a>
                <a href="#receipt-maker" className="block px-4 py-2 hover:bg-gray-100">Receipt/Invoice Generator</a>
              </div>
            )}
          </div>
          <a href="#categories" className="text-gray-700 hover:text-purple-700">Categories</a>
          <a href="#success-stories" className="text-gray-700 hover:text-purple-700">Success Stories</a>
          <a href="#pricing" className="text-gray-700 hover:text-purple-700">Pricing</a>
        </div>
        <div className="flex space-x-4">
          <button className="text-gray-700 hover:text-purple-700">Sign In</button>
          <button className="bg-purple-700 text-white px-4 py-2 rounded-lg hover:bg-purple-800">Get Started</button>
        </div>
      </nav>

      {/* Chatbot UI */}
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-2xl p-6 border border-gray-200 mt-8">
        <h1 className="text-2xl font-bold text-center text-purple-700 mb-4">VerziBiz Chatbot</h1>
        <div className="h-80 overflow-y-auto border border-gray-300 p-4 rounded-lg bg-gray-50">
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} my-2`}>
              <div className={`max-w-xs px-4 py-2 rounded-lg ${msg.role === "user" ? "bg-purple-600 text-white" : "bg-gray-300 text-gray-800"}`}>
                {msg.content}
              </div>
            </div>
          ))}
        </div>
        <div className="flex gap-3 mt-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 border p-3 rounded-lg shadow-sm border-gray-300"
          />
          <button
            onClick={sendMessage}
            disabled={loading}
            className="bg-purple-700 text-white px-5 py-3 rounded-lg shadow-md disabled:opacity-50 hover:bg-purple-800"
          >
            {loading ? "..." : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
