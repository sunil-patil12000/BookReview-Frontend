"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { API_URL, getApiUrl } from "@/lib/env";

export interface Review {
  id: string
  userId: string
  userName: string
  userAvatar?: string
  rating: number
  comment: string
  date: string
}

export interface Book {
  id: string
  title: string
  author: string
  genre: string
  description: string
  coverImage: string
  averageRating: number
  totalReviews: number
  reviews: Review[]
  featured?: boolean
  publishYear?: number
  pages?: number
}

interface BookContextType {
  books: Book[]
  featuredBooks: Book[]
  loading: boolean
  searchBooks: (query: string) => Book[]
  filterBooks: (genre: string, rating: number) => Book[]
  getBookById: (id: string) => Book | undefined
  addReview: (bookId: string, review: Omit<Review, "id" | "date">) => Promise<void>
  fetchBooks: (params?: { genre?: string, minRating?: number, featured?: boolean, search?: string }) => Promise<void>
  fetchBookById: (id: string) => Promise<Book | null>
}

const BookContext = createContext<BookContextType | undefined>(undefined)

export function BookProvider({ children }: { children: React.ReactNode }) {
  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Initial fetch of all books when component mounts
    fetchBooks();
  }, [])

  const fetchBooks = async (params?: { genre?: string, minRating?: number, featured?: boolean, search?: string }) => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams();
      if (params?.genre) queryParams.append('genre', params.genre);
      if (params?.minRating) queryParams.append('minRating', params.minRating.toString());
      if (params?.featured) queryParams.append('featured', 'true');
      if (params?.search) queryParams.append('search', params.search);
      
      const queryString = queryParams.toString();
      const url = `${API_URL}/books${queryString ? `?${queryString}` : ''}`;
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error('Failed to fetch books');
      }
      
      const data = await response.json();
      
      const formattedBooks = data.map((book: any) => ({
        ...book,
        id: book._id || book.id,
        reviews: Array.isArray(book.reviews) ? book.reviews.map((review: any) => ({
          ...review,
          id: review._id || review.id
        })) : []
      }));
      
      setBooks(formattedBooks);
      
    } catch (error) {
      console.error("Error fetching books:", error);
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchBookById = async (id: string) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/books/${id}`);
      
      if (!response.ok) {
        throw new Error(`Book not found`);
      }
      
      const bookData = await response.json();
      
      const book = {
        ...bookData,
        id: bookData._id || bookData.id,
        reviews: bookData.reviews.map((review: any) => ({
          ...review,
          id: review._id || review.id
        }))
      };
      
      setBooks(prevBooks => {
        const bookIndex = prevBooks.findIndex(b => b.id === id);
        if (bookIndex >= 0) {
          const updatedBooks = [...prevBooks];
          updatedBooks[bookIndex] = book;
          return updatedBooks;
        } else {
          return [...prevBooks, book];
        }
      });
      
      setLoading(false);
      return book;
    } catch (error) {
      console.error(`Error fetching book:`, error);
      setLoading(false);
      return null;
    }
  };

  const featuredBooks = books.filter(book => book.featured)

  const searchBooks = (query: string) => {
    if (!query) return books
    const searchLower = query.toLowerCase()
    return books.filter(book =>
      book.title.toLowerCase().includes(searchLower) ||
      book.author.toLowerCase().includes(searchLower)
    )
  }

  const filterBooks = (genre: string, rating: number) => {
    return books.filter(book => {
      const genreMatch = !genre || book.genre === genre
      const ratingMatch = rating === 0 || book.averageRating >= rating
      return genreMatch && ratingMatch
    })
  }

  const getBookById = (id: string) => {
    return books.find(book => book.id === id)
  }

  const addReview = async (bookId: string, review: Omit<Review, "id" | "date">) => {
    const token = localStorage.getItem("token");
    
    if (!token) {
      throw new Error("You must be logged in to add a review");
    }
    
    try {
      const response = await fetch(`${API_URL}/books/${bookId}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          rating: review.rating,
          comment: review.comment
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to add review');
      }
      
      const updatedBook = await response.json();
      
      setBooks(prevBooks => 
        prevBooks.map(book => 
          book.id === bookId ? {
            ...updatedBook,
            id: updatedBook._id || updatedBook.id,
            reviews: updatedBook.reviews.map((review: any) => ({
              ...review,
              id: review._id || review.id
            }))
          } : book
        )
      );
      
    } catch (error) {
      throw error;
    }
  }

  return (
    <BookContext.Provider
      value={{
        books,
        featuredBooks,
        loading,
        searchBooks,
        filterBooks,
        getBookById,
        addReview,
        fetchBooks,
        fetchBookById
      }}
    >
      {children}
    </BookContext.Provider>
  )
}

export function useBooks() {
  const context = useContext(BookContext)
  if (context === undefined) {
    throw new Error("useBooks must be used within a BookProvider")
  }
  return context
}
