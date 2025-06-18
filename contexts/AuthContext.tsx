"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

const API_URL = "http://localhost:5000/api";

interface User {
  id: string
  name: string
  email: string
  avatar?: string
  bio?: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
  isAuthenticated: boolean
  loading: boolean
  updateProfile: (data: {name?: string, bio?: string}) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for token in localStorage
    const token = localStorage.getItem("token")
    
    if (token) {
      // Fetch user profile using the token
      fetchUserProfile(token);
    } else {
      setLoading(false)
    }
  }, [])

  const fetchUserProfile = async (token: string) => {
    try {
      const response = await fetch(`${API_URL}/users/profile`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const userData = await response.json();
        const user = {
          id: userData._id || userData.id,
          name: userData.name,
          email: userData.email,
          avatar: userData.avatar,
          bio: userData.bio
        };
        setUser(user);
      } else {
        localStorage.removeItem("token");
      }
    } catch (error) {
      localStorage.removeItem("token");
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }
      
      const data = await response.json();
      
      const user = {
        id: data.user._id || data.user.id,
        name: data.user.name,
        email: data.user.email,
        avatar: data.user.avatar,
        bio: data.user.bio
      };
      
      localStorage.setItem("token", data.token);
      setUser(user);
      
      return data;
    } catch (error) {
      throw error;
    }
  }

  const register = async (name: string, email: string, password: string) => {
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Registration failed');
      }
      
      const data = await response.json();
      
      const user = {
        id: data.user._id || data.user.id,
        name: data.user.name,
        email: data.user.email,
        avatar: data.user.avatar,
        bio: data.user.bio
      };
      
      localStorage.setItem("token", data.token);
      setUser(user);
      
      return data;
    } catch (error) {
      throw error;
    }
  }

  const updateProfile = async (data: {name?: string, bio?: string}) => {
    const token = localStorage.getItem("token");
    
    if (!token) {
      throw new Error("Not authenticated");
    }
    
    try {
      const response = await fetch(`${API_URL}/users/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Profile update failed');
      }
      
      const updatedUser = await response.json();
      setUser({
        ...updatedUser,
        id: updatedUser._id || updatedUser.id
      });
      
      return updatedUser;
    } catch (error) {
      throw error;
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("token")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        isAuthenticated: !!user,
        loading,
        updateProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
