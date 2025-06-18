"use client"

import { useState, useMemo, useEffect } from "react"
import { useBooks } from "@/contexts/BookContext"
import { Navbar } from "@/components/Navbar"
import { BookCard } from "@/components/BookCard"
import { FeaturedBooksCarousel } from "@/components/FeaturedBooksCarousel"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import { Search, Filter, BookOpen, Sparkles } from "lucide-react"

export default function BooksPage() {
  const { books, loading } = useBooks()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedGenre, setSelectedGenre] = useState("")
  const [minRating, setMinRating] = useState(0)
  const [sortBy, setSortBy] = useState("title")
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const genres = useMemo(() => {
    const uniqueGenres = Array.from(new Set(books.map((book) => book.genre)))
    return uniqueGenres.sort()
  }, [books])

  const filteredAndSortedBooks = useMemo(() => {
    let filtered = books

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (book) =>
          book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          book.author.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Genre filter
    if (selectedGenre && selectedGenre !== "all") {
      filtered = filtered.filter((book) => book.genre === selectedGenre)
    }

    // Rating filter
    if (minRating > 0) {
      filtered = filtered.filter((book) => book.averageRating >= minRating)
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "title":
          return a.title.localeCompare(b.title)
        case "author":
          return a.author.localeCompare(b.author)
        case "rating":
          return b.averageRating - a.averageRating
        case "reviews":
          return b.totalReviews - a.totalReviews
        case "year":
          return (b.publishYear || 0) - (a.publishYear || 0)
        default:
          return 0
      }
    })

    return filtered
  }, [books, searchQuery, selectedGenre, minRating, sortBy])

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedGenre("")
    setMinRating(0)
    setSortBy("title")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-emerald-50 to-cyan-100">
      <Navbar />


      <div className="pt-12 pb-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div
            className={`text-center mb-12 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full border border-white/30 mb-6">
              <BookOpen className="h-4 w-4 text-teal-600 mr-2" />
              <span className="text-sm font-medium text-gray-700">Discover Amazing Books</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Browse Our
              <span className="block bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent">
                Collection
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore thousands of books across all genres and find your next great read
            </p>
          </div>

          {/* Search and Filters */}
          <div className="glass rounded-3xl p-8 mb-12 shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              {/* Search */}
              <div className="lg:col-span-2 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  placeholder="Search books or authors..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-12 rounded-xl border-0 bg-white/50 backdrop-blur-sm focus:bg-white/80 transition-all"
                />
              </div>

              {/* Genre Filter */}
              <Select value={selectedGenre} onValueChange={setSelectedGenre}>
                <SelectTrigger className="h-12 rounded-xl border-0 bg-white/50 backdrop-blur-sm">
                  <SelectValue placeholder="All Genres" />
                </SelectTrigger>
                <SelectContent className="glass">
                  <SelectItem value="all">All Genres</SelectItem>
                  {genres.map((genre) => (
                    <SelectItem key={genre} value={genre}>
                      {genre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Rating Filter */}
              <Select value={minRating.toString()} onValueChange={(value) => setMinRating(Number(value))}>
                <SelectTrigger className="h-12 rounded-xl border-0 bg-white/50 backdrop-blur-sm">
                  <SelectValue placeholder="Min Rating" />
                </SelectTrigger>
                <SelectContent className="glass">
                  <SelectItem value="0">Any Rating</SelectItem>
                  <SelectItem value="3">3+ Stars</SelectItem>
                  <SelectItem value="4">4+ Stars</SelectItem>
                  <SelectItem value="4.5">4.5+ Stars</SelectItem>
                </SelectContent>
              </Select>

              {/* Sort */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="h-12 rounded-xl border-0 bg-white/50 backdrop-blur-sm">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent className="glass">
                  <SelectItem value="title">Title A-Z</SelectItem>
                  <SelectItem value="author">Author A-Z</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="reviews">Most Reviewed</SelectItem>
                  <SelectItem value="year">Newest First</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Clear Filters */}
            {(searchQuery || selectedGenre || minRating > 0 || sortBy !== "title") && (
              <div className="mt-6 flex justify-center">
                <Button
                  variant="outline"
                  onClick={clearFilters}
                  className="rounded-full bg-white/50 backdrop-blur-sm border-teal-200 hover:bg-white/80"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Clear Filters
                </Button>
              </div>
            )}
          </div>

          {/* Results Count */}
          <div className="mb-8 text-center">
            <p className="text-gray-600 text-lg">
              {loading ? (
                <span className="inline-flex items-center">
                  <div className="spinner mr-2" />
                  Loading amazing books...
                </span>
              ) : (
                <>
                  <Sparkles className="inline h-5 w-5 text-teal-500 mr-2" />
                  {filteredAndSortedBooks.length} books found
                </>
              )}
            </p>
          </div>

          {/* Books Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="aspect-[3/4] w-full rounded-2xl" />
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))}
            </div>
          ) : filteredAndSortedBooks.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredAndSortedBooks.map((book, index) => (
                <BookCard key={book.id} book={book} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-gradient-to-br from-teal-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <BookOpen className="h-12 w-12 text-teal-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">No books found</h3>
              <p className="text-gray-500 text-lg mb-8">Try adjusting your search criteria</p>
              <Button
                onClick={clearFilters}
                className="bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 rounded-full px-8"
              >
                Clear Filters
              </Button>
            </div>
          )}

       
        
        </div>
      </div>
    </div>
  )
}
