import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { DashboardLayout } from './components/DashboardLayout';
import { RecipeFromImage } from './pages/Dashboard/RecipeFromImage';
import { RecipeGenerator } from './pages/Dashboard/RecipeGenerator';
import { AiChat } from './pages/Dashboard/AiChat';
import { AuthRoute } from './components/AuthRoute';
import { ProtectedRoute } from './components/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        
        <Route
          path="/login"
          element={
            <AuthRoute>
              <Login />
            </AuthRoute>
          }
        />
        
        <Route
          path="/signup"
          element={
            <AuthRoute>
              <Signup />
            </AuthRoute>
          }
        />
        
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/dashboard/recipe-from-image" replace />} />
          <Route path="recipe-from-image" element={<RecipeFromImage />} />
          <Route path="recipe-generator" element={<RecipeGenerator />} />
          <Route path="ai-chat" element={<AiChat />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;