"use client"

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Navbar } from "@/components/Navbar";

export default function DebugPage() {
  const [apiStatus, setApiStatus] = useState<string>('Not checked');
  const [booksStatus, setBooksStatus] = useState<string>('Not checked');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [books, setBooks] = useState<any[]>([]);

  const API_URL = "http://localhost:5000/api";

  const checkApiStatus = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/debug`);
      if (response.ok) {
        const data = await response.json();
        setApiStatus(`Connected (Server time: ${data.time})`);
      } else {
        setApiStatus(`Error: ${response.status} ${response.statusText}`);
      }
    } catch (err: any) {
      setApiStatus('Failed to connect');
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const checkBooksEndpoint = async () => {
    setLoading(true);
    setBooksStatus('Checking...');
    setBooks([]);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/books`);
      console.log('Books API Response:', response);
      
      if (response.ok) {
        const data = await response.json();
        console.log('Books data:', data);
        
        if (Array.isArray(data)) {
          setBooksStatus(`Found ${data.length} books`);
          setBooks(data);
        } else {
          setBooksStatus('Error: Response is not an array');
          console.error('Expected array but got:', typeof data);
        }
      } else {
        setBooksStatus(`Error: ${response.status} ${response.statusText}`);
      }
    } catch (err: any) {
      setBooksStatus('Failed to fetch books');
      setError(err.message);
      console.error('Books fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-emerald-50 to-cyan-100">
      <Navbar />

      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-6">API Connection Debug</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>API Status Check</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <strong>Status:</strong> {apiStatus}
                </div>
                <Button 
                  onClick={checkApiStatus} 
                  disabled={loading}
                  className="bg-teal-600 hover:bg-teal-700"
                >
                  {loading ? 'Checking...' : 'Check API Connection'}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Books Endpoint Check</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <strong>Status:</strong> {booksStatus}
                </div>
                <Button 
                  onClick={checkBooksEndpoint} 
                  disabled={loading}
                  className="bg-emerald-600 hover:bg-emerald-700"
                >
                  {loading ? 'Checking...' : 'Check Books Endpoint'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {error && (
          <Card className="mb-8 border-red-300">
            <CardHeader className="bg-red-50">
              <CardTitle className="text-red-600">Error</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-red-600">{error}</div>
            </CardContent>
          </Card>
        )}

        {books.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Books Found ({books.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {books.map((book, index) => (
                  <div key={book._id || index} className="p-4 border rounded-md">
                    <h3 className="font-bold">{book.title}</h3>
                    <p>by {book.author}</p>
                    <p className="text-sm text-gray-600">ID: {book._id}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
