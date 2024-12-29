import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { ChefHat, Utensils, MessageSquare, LogOut } from 'lucide-react';
import Cookies from 'js-cookie';
import clsx from 'clsx';
import React, { useEffect, useState } from "react";
import {jwtDecode} from 'jwt-decode'; // Import jwt-decode

const navigation = [
  { name: 'Recipe from Image', href: '/dashboard/recipe-from-image', icon: ChefHat },
  { name: 'Recipe Generator', href: '/dashboard/recipe-generator', icon: Utensils },
  { name: 'AI Chat', href: '/dashboard/ai-chat', icon: MessageSquare },
];

interface JwtPayload {
  username: string;
  iat: BigInteger;
  exp: BigInteger;
  authorities: string;
  // Add other fields in your JWT payload as needed
}

export const DashboardLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
    const [username, setUsername] = useState<string >("user");

useEffect(() => {
  const token = Cookies.get("token");
  if (token) {
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      setUsername(decoded.username);
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  }
}, []);

  const handleLogout = () => {
    Cookies.remove('token');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={clsx(
                    "inline-flex items-center px-4 text-sm font-medium border-b-2",
                    location.pathname === item.href
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                  )}
                >
                  <item.icon className="h-5 w-5 mr-2" />
                  {item.name}
                </Link>
              ))}
            </div>
            <div className="flex items-center">
              {username && (
                <span className="text-gray-600 text-sm mr-4">
                  Welcome, <strong>{username}</strong>
                </span>
              )}
              <button
                onClick={handleLogout}
                className="inline-flex items-center px-4 text-sm font-medium text-gray-500 hover:text-gray-700"
              >
                <LogOut className="h-5 w-5 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="py-6">
        <Outlet />
      </main>
    </div>
  );
};