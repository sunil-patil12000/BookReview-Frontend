"use client"

import { useBooks } from "@/contexts/BookContext"
import { BookCard } from "@/components/BookCard"
import { Skeleton } from "@/components/ui/skeleton"
import { Sparkles, TrendingUp } from "lucide-react"

export function FeaturedBooks() {
  const { featuredBooks, loading } = useBooks()

  if (loading) {
    return (
      <section className="py-24 bg-gradient-to-br from-white via-teal-50/30 to-emerald-50/30 relative overflow-hidden">
        {/* Background Decorations */}
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="aspect-[4/5] w-full rounded-3xl" />
                <Skeleton className="h-6 w-3/4 rounded-xl" />
                <Skeleton className="h-4 w-1/2 rounded-lg" />
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

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
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Handpicked masterpieces from our community of passionate readers, curated just for you
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {featuredBooks.map((book, index) => (
            <BookCard key={book.id} book={book} index={index} />
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center px-8 py-4 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50">
            <span className="text-gray-600 mr-4">Want to see more amazing books?</span>
            <a
              href="/books"
              className="text-teal-600 hover:text-teal-700 font-semibold transition-colors duration-300 flex items-center"
            >
              Browse All Books
              <TrendingUp className="h-4 w-4 ml-2" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
