import { useState } from "react";
import { MessageSquare } from "lucide-react";
import { ImageUpload } from "../../components/ImageUpload";
import { postRequest } from "../../utils/api";
import Markdown from "react-markdown";

interface Message {
  role: "user" | "assistant";
  content: string;
  image?: string; // Add an optional image property
}

export const AiChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState<string | undefined>();
  const [loading, setLoading] = useState(false); // Add a loading state

  const handleImageUpload = (base64: string) => {
    setImage(base64);
    const userImageMessage: Message = {
      role: "user",
      content: "Uploaded an image:",
      image: base64,
    };
    setMessages((prev) => [...prev, userImageMessage]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() && !image) return; // Allow submission only if prompt or image exists

    const userMessage: Message = { role: "user", content: prompt };
    if (prompt.trim()) {
      setMessages((prev) => [...prev, userMessage]);
    }
    setPrompt("");

    setLoading(true); // Set loading to true

    try {
      const response = await postRequest<{ message: string }>("/api/ask-ai", {
        prompt,
        image,
      });

      const assistantMessage: Message = {
        role: "assistant",
        content: response, // Adjust response property based on API response structure
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setImage(undefined);
    } catch (error) {
      console.error("Failed to get AI response:", error);
    } finally {
      setLoading(false); // Set loading to false
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <MessageSquare className="mx-auto h-12 w-12 text-blue-600" />
        <h1 className="mt-4 text-3xl font-bold text-gray-900">AI Chat</h1>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <div className="space-y-4 mb-6 max-h-[60vh] overflow-y-auto">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.role === "user"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-900"
                }`}
              >
                <Markdown>{message.content}</Markdown>
                {message.image && (
                  <img
                    src={`data:image/*;base64,${message.image}`}
                    alt="Uploaded"
                    className="mt-2 rounded-lg max-w-full"
                  />
                )}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-center">
              <div className="text-blue-600 font-medium">Loading...</div>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <ImageUpload onImageUpload={handleImageUpload} />

          <div className="flex gap-2">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              disabled={loading} // Disable input while loading
            />
            <button
              type="submit"
              className={`px-4 py-2 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500"
              }`}
              disabled={loading} // Disable button while loading
            >
              {loading ? "Sending..." : "Send"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
