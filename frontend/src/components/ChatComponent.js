import React, {useState} from "react";
import {postRequest} from "../axiosHelper";

function ChatComponent() {
    const [prompt, setPrompt] = useState('');
    const [chatResponse, setChatResponse] = useState('');
    const [imageBytes, setImageBytes] = useState('');

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                const base64String = reader.result.split(",")[1]; // Extract Base64 part
                setImageBytes(base64String);
            };
            reader.readAsDataURL(file); // Read as Data URL (Base64 encoded)
        }
    };


    const askAI = async () => {
        try {
            const payload = {
                prompt,
                image: imageBytes, // Send Base64-encoded image string
            };

            const data = await postRequest("/api/ask-ai", payload);
            console.log(data);
            setChatResponse(data);
        } catch (error) {
            console.error("Error generating response: ", error);
        }
    };

    return (
        <div>
            <h2>Talk to AI</h2>
            <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Enter a prompt for AI"
            />
            <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
            />
            <button onClick={askAI}>Ask AI</button>
            <div className="output">
                <p>{chatResponse}</p>
            </div>
        </div>
    );
}

export default ChatComponent;
