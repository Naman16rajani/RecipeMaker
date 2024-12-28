// WelcomeDashboard.js
import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import ImageGenerator from "./ImageGenerator";
import ChatComponent from "./ChatComponent";
import RecipeGenerator from "./RecipeGenerator"; // Import useHistory hook

function WelcomeDashboard({username}) {
    const history = useNavigate();

    const handleLogout = () => {
        // Perform logout actions here (e.g., clear session, remove authentication token)
        // After logout, redirect to the login page
        history('/');
    };
    const [activeTab, setActiveTab] = useState('image-generator');

    const handleTabChange = (tab) => {
        //alert(tab)
        setActiveTab(tab);
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="border rounded-lg p-4" style={{width: '500px', height: '400px'}}>
                <h2 className="mb-4 text-center">Welcome to Dashboard</h2>
                <p className="mb-4 text-center">Hello, {username}!</p>
                <p className="text-center">You are logged in successfully.</p>
                <div className="App">
                    <button className={activeTab === 'recipe-generator-image' ? 'active' : ''}
                            onClick={() => handleTabChange('recipe-generator-image')}>
                        Image Generator
                    </button>
                    <button className={activeTab === 'chat' ? 'active' : ''}
                            onClick={() => handleTabChange('chat')}>
                        Ask AI
                    </button>
                    <button className={activeTab === 'recipe-generator' ? 'active' : ''}
                            onClick={() => handleTabChange('recipe-generator')}>
                        Recipe Generator
                    </button>
                    <button type="button" className="btn btn-primary mt-3" onClick={handleLogout}>Logout</button>

                    <div>
                        {activeTab === 'recipe-generator-image' && <ImageGenerator/>}
                        {activeTab === 'chat' && <ChatComponent/>}
                        {activeTab === 'recipe-generator' && <RecipeGenerator/>}
                    </div>
                </div>
            </div>

        </div>
    );
}

export default WelcomeDashboard;