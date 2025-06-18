"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import { useBooks } from "@/contexts/BookContext"
import { useAuth } from "@/contexts/AuthContext"
import { Navbar } from "@/components/Navbar"
import { StarRating } from "@/components/StarRating"
import { ReviewModal } from "@/components/ReviewModal"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Edit, Calendar, BookOpen, Users, Heart } from "lucide-react"
import Link from "next/link"

export default function BookDetailsPage() {
  const params = useParams()
  const bookId = params.id as string
  const { getBookById, fetchBookById, loading } = useBooks()
  const { isAuthenticated } = useAuth()
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [book, setBook] = useState(getBookById(bookId))
  const [localLoading, setLocalLoading] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    
    // If book is not in state, try to fetch it from the API
    if (!book) {
      const fetchBook = async () => {
        setLocalLoading(true);
        try {
          const fetchedBook = await fetchBookById(bookId);
          if (fetchedBook) {
            setBook(fetchedBook);
          } else {
            setError(true);
          }
        } catch (err) {
          console.error('Error fetching book:', err);
          setError(true);
        } finally {
          setLocalLoading(false);
        }
      };
      
      fetchBook();
    }
  }, [bookId, book, fetchBookById]);

  if (loading || localLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-emerald-50 to-cyan-100">
        <Navbar />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-teal-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
              <BookOpen className="h-12 w-12 text-teal-400" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Loading Book...</h1>
            <p className="text-gray-600 mb-8">Please wait while we fetch the book details.</p>
          </div>
        </div>
      </div>
    )
  }

  if (!book || error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-emerald-50 to-cyan-100">
        <Navbar />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-teal-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <BookOpen className="h-12 w-12 text-teal-400" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Book Not Found</h1>
            <p className="text-gray-600 mb-8">The book you're looking for doesn't exist.</p>
            <Button
              asChild
              className="bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 rounded-full"
            >
              <Link href="/books">Browse Books</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-emerald-50 to-cyan-100">
      <Navbar />

      <div className="pt-24 pb-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <Button variant="ghost" asChild className="mb-8 hover:bg-white/50 rounded-full">
            <Link href="/books">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Books
            </Link>
          </Button>

          <div
            className={`grid grid-cols-1 lg:grid-cols-3 gap-12 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            {/* Book Cover and Info */}
            <div className="lg:col-span-1">
              <Card className="glass border-0 shadow-2xl overflow-hidden">
                <CardContent className="p-8">
                  <div className="aspect-[3/4] relative mb-8 rounded-2xl overflow-hidden">
                    <div
                      className={`absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10 transition-opacity duration-300 ${imageLoaded ? "opacity-100" : "opacity-0"}`}
                    />
                    <Image
                      src={book.coverImage || "/placeholder.svg"}
                      alt={book.title}
                      fill
                      className={`object-cover transition-all duration-700 ${imageLoaded ? "opacity-100 scale-100" : "opacity-0 scale-110"}`}
                      onLoad={() => setImageLoaded(true)}
                    />
                    {!imageLoaded && (
                      <div className="absolute inset-0 bg-gradient-to-br from-teal-100 to-emerald-100 animate-pulse" />
                    )}
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h1 className="text-3xl font-bold text-gray-900 mb-3 leading-tight">{book.title}</h1>
                      <p className="text-xl text-gray-600 mb-4">by {book.author}</p>
                      <Badge className="bg-gradient-to-r from-teal-500 to-emerald-500 text-white">{book.genre}</Badge>
                    </div>

                    {/* Book Stats */}
                    <div className="grid grid-cols-2 gap-4">
                      {book.publishYear && (
                        <div className="flex items-center space-x-2 text-gray-600">
                          <Calendar className="h-4 w-4" />
                          <span className="text-sm">{book.publishYear}</span>
                        </div>
                      )}
                      {book.pages && (
                        <div className="flex items-center space-x-2 text-gray-600">
                          <BookOpen className="h-4 w-4" />
                          <span className="text-sm">{book.pages} pages</span>
                        </div>
                      )}
                    </div>

                    {/* Rating */}
                    <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl">
                      <StarRating rating={book.averageRating} size="lg" />
                      <div>
                        <div className="text-2xl font-bold text-gray-900">{book.averageRating}</div>
                        <div className="text-sm text-gray-500 flex items-center">
                          <Users className="h-3 w-3 mr-1" />
                          {book.totalReviews.toLocaleString()} reviews
                        </div>
                      </div>
                    </div>

                    {/* Action Button */}
                    {isAuthenticated ? (
                      <Button
                        onClick={() => setIsReviewModalOpen(true)}
                        className="w-full bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 rounded-xl h-12"
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Write a Review
                      </Button>
                    ) : (
                      <Button
                        asChild
                        className="w-full bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 rounded-xl h-12"
                      >
                        <Link href="/login">
                          <Heart className="h-4 w-4 mr-2" />
                          Login to Review
                        </Link>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Book Details and Reviews */}
            <div className="lg:col-span-2 space-y-8">
              {/* Description */}
              <Card className="glass border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-gray-900 flex items-center">
                    <BookOpen className="h-6 w-6 mr-2 text-teal-600" />
                    About This Book
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed text-lg">{book.description}</p>
                </CardContent>
              </Card>

              {/* Reviews */}
              <Card className="glass border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-gray-900 flex items-center justify-between">
                    <div className="flex items-center">
                      <Users className="h-6 w-6 mr-2 text-teal-600" />
                      Reviews ({book.totalReviews})
                    </div>
                    {isAuthenticated && (
                      <Button
                        onClick={() => setIsReviewModalOpen(true)}
                        size="sm"
                        className="bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 rounded-full"
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        Add Review
                      </Button>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {book.reviews.length > 0 ? (
                    <div className="space-y-8">
                      {book.reviews.map((review, index) => (
                        <div key={review.id} className={`stagger-item`} style={{ animationDelay: `${index * 0.1}s` }}>
                          <div className="flex items-start space-x-4 p-6 bg-gradient-to-br from-white/50 to-gray-50/50 rounded-2xl backdrop-blur-sm">
                            <Avatar className="ring-2 ring-teal-200">
                              <AvatarImage
                                src={
                                  review.userAvatar ||
                                  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" ||
                                  "/placeholder.svg"
                                }
                                alt={review.userName}
                              />
                              <AvatarFallback className="bg-gradient-to-br from-teal-500 to-emerald-500 text-white">
                                {review.userName.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center space-x-3 mb-3">
                                <h4 className="font-bold text-gray-900">{review.userName}</h4>
                                <StarRating rating={review.rating} size="sm" />
                                <Badge variant="outline" className="text-xs">
                                  {review.date}
                                </Badge>
                              </div>
                              <p className="text-gray-700 leading-relaxed">{review.comment}</p>
                            </div>
                          </div>
                          {index < book.reviews.length - 1 && <Separator className="mt-8 opacity-30" />}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-16">
                      <div className="w-20 h-20 bg-gradient-to-br from-teal-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Edit className="h-10 w-10 text-teal-400" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">No reviews yet</h3>
                      <p className="text-gray-500 mb-8">Be the first to share your thoughts about this book!</p>
                      {isAuthenticated ? (
                        <Button
                          onClick={() => setIsReviewModalOpen(true)}
                          className="bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 rounded-full px-8"
                        >
                          Write the First Review
                        </Button>
                      ) : (
                        <Button
                          asChild
                          className="bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 rounded-full px-8"
                        >
                          <Link href="/login">Login to Review</Link>
                        </Button>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Review Modal */}
      <ReviewModal
        bookId={book.id}
        bookTitle={book.title}
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
      />
    </div>
  )
}
