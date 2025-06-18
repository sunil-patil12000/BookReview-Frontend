"use client"

import { useState } from "react"
import { useBooks } from "@/contexts/BookContext"
import { useAuth } from "@/contexts/AuthContext"
import { ReviewModal } from "@/components/ReviewModal"
import Image from "next/image"
import Link from "next/link"
import { Sparkles, BookOpen, TrendingUp } from "lucide-react"
import { StarRating } from "@/components/StarRating"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export function FeaturedBooksCarousel() {
  const { featuredBooks, loading } = useBooks()
  const { isAuthenticated } = useAuth()
  const [selectedBook, setSelectedBook] = useState<string | null>(null)
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false)
  const [imageLoaded, setImageLoaded] = useState<Record<string, boolean>>({})

  const handleOpenReviewModal = (bookId: string) => {
    setSelectedBook(bookId)
    setIsReviewModalOpen(true)
  }

  const handleCloseReviewModal = () => {
    setIsReviewModalOpen(false)
    setSelectedBook(null)
  }

  const handleImageLoad = (bookId: string) => {
    setImageLoaded(prev => ({
      ...prev,
      [bookId]: true
    }))
  }

  if (loading) {
    return (
      <section className="py-24 bg-gradient-to-br from-white via-teal-50/30 to-emerald-50/30 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-32 h-32 bg-teal-200/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-emerald-200/20 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-teal-100 to-emerald-100 rounded-full mb-8 shadow-sm">
              <div className="w-4 h-4 bg-teal-300 rounded mr-3 animate-pulse" />
              <div className="w-28 h-4 bg-teal-300 rounded animate-pulse" />
            </div>
            <div className="w-80 h-14 bg-gray-200 rounded-2xl mx-auto mb-6 animate-pulse" />
            <div className="w-96 h-6 bg-gray-200 rounded-xl mx-auto animate-pulse" />
          </div>
        </div>
      </section>
    )
  }

  if (!featuredBooks.length) {
    return null
  }

  const selectedBookData = selectedBook ? featuredBooks.find(book => book.id === selectedBook) : null

  return (
    <section className="py-24 bg-gradient-to-br from-white via-teal-50/30 to-emerald-50/30 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-teal-200/20 rounded-full blur-3xl animate-float" />
        <div
          className="absolute bottom-20 right-10 w-40 h-40 bg-emerald-200/20 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-cyan-200/10 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "4s" }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-teal-100 to-emerald-100 rounded-full mb-8 shadow-sm border border-teal-200/50">
            <Sparkles className="h-5 w-5 text-teal-600 mr-3" />
            <span className="text-sm font-semibold text-teal-700 tracking-wide">EDITOR'S CHOICE</span>
            <TrendingUp className="h-4 w-4 text-emerald-600 ml-3" />
          </div>
          <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-6 leading-tight">
            Featured
            <span className="block bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent">
              Collections
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-12">
            Handpicked masterpieces from our community of passionate readers, curated just for you
          </p>
        </div>

        <Carousel className="max-w-5xl mx-auto">
          <CarouselContent className="-ml-2 md:-ml-4">
            {featuredBooks.map((book) => (
              <CarouselItem key={book.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                <div className="group relative overflow-hidden bg-white border-0 shadow-md hover:shadow-2xl transition-all duration-700 rounded-3xl h-full">
                  {/* Book Cover Section */}
                  <div className="relative aspect-[4/5] overflow-hidden rounded-t-3xl">
                    {/* Background Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-teal-50 via-emerald-50 to-cyan-50" />

                    {/* Book Cover Image */}
                    <div className="absolute inset-4 rounded-2xl overflow-hidden shadow-lg">
                      <Image
                        src={book.coverImage || "/placeholder.svg"}
                        alt={book.title}
                        fill
                        className={`object-cover transition-all duration-700 ${
                          imageLoaded[book.id] ? "opacity-100 scale-100" : "opacity-0 scale-110"
                        } group-hover:scale-105`}
                        onLoad={() => handleImageLoad(book.id)}
                      />
                      {!imageLoaded[book.id] && (
                        <div className="absolute inset-0 bg-gradient-to-br from-teal-100 to-emerald-100 animate-pulse" />
                      )}
                    </div>

                    {/* Floating Rating Badge */}
                    <div className="absolute top-6 right-6 z-20">
                      <div className="bg-white/95 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-lg border border-white/20">
                        <div className="flex items-center space-x-1">
                          <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                          <span className="text-sm font-bold text-gray-900">{book.averageRating}</span>
                        </div>
                      </div>
                    </div>

                    {/* Genre Badge */}
                    <div className="absolute top-6 left-6 z-20">
                      <Badge className="bg-gradient-to-r from-teal-500 to-emerald-500 text-white border-0 rounded-full px-3 py-1 text-xs font-medium shadow-lg">
                        {book.genre}
                      </Badge>
                    </div>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px] transition-all duration-500 opacity-0 group-hover:opacity-100">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="transform transition-all duration-500 scale-75 opacity-0 group-hover:scale-100 group-hover:opacity-100">
                          <Button
                            asChild
                            size="sm"
                            className="bg-white/95 text-gray-900 hover:bg-white rounded-full shadow-xl border-0 backdrop-blur-sm"
                          >
                            <Link href={`/books/${book.id}`}>
                              <BookOpen className="h-4 w-4 mr-2" />
                              View Details
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-6 space-y-4">
                    {/* Title and Author */}
                    <div className="space-y-2">
                      <Link href={`/books/${book.id}`}>
                        <h3 className="font-bold text-lg leading-tight text-gray-900 hover:text-teal-600 transition-colors duration-300 line-clamp-2 group-hover:text-teal-600">
                          {book.title}
                        </h3>
                      </Link>
                      <p className="text-gray-600 font-medium text-sm">by {book.author}</p>
                    </div>

                    {/* Rating and Reviews */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <StarRating rating={book.averageRating} size="sm" />
                        <span className="text-sm font-medium text-gray-700">{book.averageRating}</span>
                      </div>
                      <div className="text-xs text-gray-500">
                        {book.totalReviews} {book.totalReviews === 1 ? 'review' : 'reviews'}
                      </div>
                    </div>

                    {/* Review Button */}
                    <Button
                      onClick={() => handleOpenReviewModal(book.id)}
                      className="w-full bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white rounded-xl text-sm font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <Sparkles className="h-4 w-4 mr-2" />
                      {isAuthenticated ? "Write a Review" : "Login to Review"}
                    </Button>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="absolute -left-4 top-1/2 -translate-y-1/2">
            <CarouselPrevious className="h-10 w-10 bg-white/80 backdrop-blur-sm border-0 shadow-lg" />
          </div>
          <div className="absolute -right-4 top-1/2 -translate-y-1/2">
            <CarouselNext className="h-10 w-10 bg-white/80 backdrop-blur-sm border-0 shadow-lg" />
          </div>
        </Carousel>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center px-8 py-4 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50">
            <span className="text-gray-600 mr-4">Want to see more amazing books?</span>
            <Link
              href="/books"
              className="text-teal-600 hover:text-teal-700 font-semibold transition-colors duration-300 flex items-center"
            >
              Browse All Books
              <TrendingUp className="h-4 w-4 ml-2" />
            </Link>
          </div>
        </div>
      </div>

      {/* Review Modal */}
      {selectedBookData && (
        <ReviewModal
          bookId={selectedBookData.id}
          bookTitle={selectedBookData.title}
          isOpen={isReviewModalOpen}
          onClose={handleCloseReviewModal}
        />
      )}
    </section>
  )
}
