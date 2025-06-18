"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { StarRating } from "@/components/StarRating"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Book } from "@/contexts/BookContext"
import { Calendar, BookOpen, Users, Heart, Eye } from "lucide-react"

interface BookCardProps {
  book: Book
  index?: number
}

export function BookCard({ book, index = 0 }: BookCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Card
      className={`group relative overflow-hidden bg-white border-0 shadow-md hover:shadow-2xl transition-all duration-700 rounded-3xl stagger-item transform hover:-translate-y-2`}
      style={{ animationDelay: `${index * 0.1}s` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Main Content Container */}
      <div className="relative">
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
                imageLoaded ? "opacity-100 scale-100" : "opacity-0 scale-110"
              } ${isHovered ? "scale-105" : "scale-100"}`}
              onLoad={() => setImageLoaded(true)}
            />
            {!imageLoaded && (
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
          <div
            className={`absolute inset-0 bg-black/20 backdrop-blur-[1px] transition-all duration-500 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className={`transform transition-all duration-500 ${
                  isHovered ? "scale-100 opacity-100" : "scale-75 opacity-0"
                }`}
              >
                <Button
                  asChild
                  size="sm"
                  className="bg-white/95 text-gray-900 hover:bg-white rounded-full shadow-xl border-0 backdrop-blur-sm"
                >
                  <Link href={`/books/${book.id}`}>
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <CardContent className="p-6 space-y-4">
          {/* Title and Author */}
          <div className="space-y-2">
            <Link href={`/books/${book.id}`}>
              <h3 className="font-bold text-lg leading-tight text-gray-900 hover:text-teal-600 transition-colors duration-300 line-clamp-2 group-hover:text-teal-600">
                {book.title}
              </h3>
            </Link>
            <p className="text-gray-600 font-medium text-sm">by {book.author}</p>
          </div>

          {/* Book Stats */}
          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center space-x-3">
              {book.publishYear && (
                <div className="flex items-center space-x-1">
                  <Calendar className="h-3 w-3" />
                  <span>{book.publishYear}</span>
                </div>
              )}
              {book.pages && (
                <div className="flex items-center space-x-1">
                  <BookOpen className="h-3 w-3" />
                  <span>{book.pages}p</span>
                </div>
              )}
            </div>
          </div>

          {/* Rating and Reviews */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <StarRating rating={book.averageRating} size="sm" />
              <span className="text-sm font-medium text-gray-700">{book.averageRating}</span>
            </div>
            <div className="flex items-center space-x-1 text-gray-500">
              <Users className="h-3 w-3" />
              <span className="text-xs font-medium">{book.totalReviews.toLocaleString()}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2 pt-2">
            <Button
              asChild
              className="flex-1 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white rounded-xl h-9 text-sm font-medium shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Link href={`/books/${book.id}`}>
                <BookOpen className="h-4 w-4 mr-2" />
                Read More
              </Link>
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="rounded-xl border-gray-200 hover:border-teal-300 hover:bg-teal-50 transition-all duration-300 h-9 w-9 p-0"
            >
              <Heart className="h-4 w-4 text-gray-600 hover:text-teal-600 transition-colors" />
            </Button>
          </div>
        </CardContent>

        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-500 via-emerald-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Bottom Accent Line */}
        <div className="absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
      </div>
    </Card>
  )
}
