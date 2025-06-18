"use client"

import { useAuth } from "@/contexts/AuthContext"
import { useBooks } from "@/contexts/BookContext"
import { Navbar } from "@/components/Navbar"
import { StarRating } from "@/components/StarRating"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { BookOpen, Star, MessageSquare } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function ProfilePage() {
  const { user, isAuthenticated, loading } = useAuth()
  const { books } = useBooks()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">Loading...</div>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  // Get user's reviews from all books
  const userReviews = books.flatMap((book) =>
    book.reviews
      .filter((review) => review.userId === user.id)
      .map((review) => ({
        ...review,
        bookTitle: book.title,
        bookId: book.id,
        bookCover: book.coverImage,
      })),
  )

  const totalReviews = userReviews.length
  const averageRating =
    totalReviews > 0 ? userReviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews : 0

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Info */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6 text-center">
                <Avatar className="h-24 w-24 mx-auto mb-4">
                  <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                  <AvatarFallback className="text-2xl">{user.name.charAt(0)}</AvatarFallback>
                </Avatar>

                <h1 className="text-2xl font-bold text-gray-900 mb-2">{user.name}</h1>
                <p className="text-gray-600 mb-4">{user.email}</p>

                {user.bio && <p className="text-gray-700 mb-6">{user.bio}</p>}

                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="flex items-center justify-center mb-2">
                      <MessageSquare className="h-5 w-5 text-primary" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900">{totalReviews}</div>
                    <div className="text-sm text-gray-600">Reviews</div>
                  </div>
                  <div>
                    <div className="flex items-center justify-center mb-2">
                      <Star className="h-5 w-5 text-primary" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900">{averageRating.toFixed(1)}</div>
                    <div className="text-sm text-gray-600">Avg Rating</div>
                  </div>
                  <div>
                    <div className="flex items-center justify-center mb-2">
                      <BookOpen className="h-5 w-5 text-primary" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900">{totalReviews}</div>
                    <div className="text-sm text-gray-600">Books Read</div>
                  </div>
                </div>

                <Button className="w-full mt-6" variant="outline">
                  Edit Profile
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* User Reviews */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>My Reviews ({totalReviews})</CardTitle>
              </CardHeader>
              <CardContent>
                {userReviews.length > 0 ? (
                  <div className="space-y-6">
                    {userReviews.map((review, index) => (
                      <div key={review.id}>
                        <div className="flex items-start space-x-4">
                          <Link href={`/books/${review.bookId}`}>
                            <img
                              src={review.bookCover || "/placeholder.svg"}
                              alt={review.bookTitle}
                              className="w-16 h-20 object-cover rounded"
                            />
                          </Link>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <Link
                                href={`/books/${review.bookId}`}
                                className="font-semibold text-primary hover:underline"
                              >
                                {review.bookTitle}
                              </Link>
                              <Badge variant="outline">{review.date}</Badge>
                            </div>
                            <div className="flex items-center space-x-2 mb-2">
                              <StarRating rating={review.rating} size="sm" />
                              <span className="text-sm text-gray-600">{review.rating}/5 stars</span>
                            </div>
                            <p className="text-gray-700">{review.comment}</p>
                          </div>
                        </div>
                        {index < userReviews.length - 1 && <Separator className="mt-6" />}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500 mb-4">You haven't written any reviews yet.</p>
                    <Button asChild>
                      <Link href="/books">Browse Books to Review</Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
