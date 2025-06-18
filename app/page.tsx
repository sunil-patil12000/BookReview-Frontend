"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/Navbar"
import { FeaturedBooks } from "@/components/FeaturedBooks"
import { BookOpen, Star, Users, Sparkles, TrendingUp, Heart } from "lucide-react"

export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-emerald-50 to-cyan-100">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Floating background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-teal-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" />
          <div
            className="absolute -bottom-40 -left-40 w-80 h-80 bg-emerald-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float"
            style={{ animationDelay: "2s" }}
          />
          <div
            className="absolute top-40 left-1/2 w-80 h-80 bg-cyan-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float"
            style={{ animationDelay: "4s" }}
          />
        </div>

        <div className="container mx-auto text-center relative z-10">
          <div
            className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full border border-white/30 mb-8">
              <Sparkles className="h-4 w-4 text-teal-600 mr-2" />
              <span className="text-sm font-medium text-gray-700">Discover your next favorite book</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-black text-gray-900 mb-6 leading-tight">
              Your Literary
              <span className="block bg-gradient-to-r from-teal-600 via-emerald-600 to-cyan-600 bg-clip-text text-transparent animate-pulse-glow">
                Adventure
              </span>
              <span className="block">Awaits</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Join a community of passionate readers, discover hidden gems, and share your thoughts on the books that
              move you.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button
                size="lg"
                asChild
                className="bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <Link href="/books">
                  <BookOpen className="mr-2 h-5 w-5" />
                  Explore Books
                </Link>
              </Button>
             
            </div>
          </div>
        </div>

      

      {/* Stats Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: BookOpen, number: "50,000+", label: "Books in collection", color: "teal" },
              { icon: Star, number: "2M+", label: "Reviews written", color: "emerald" },
              { icon: Users, number: "100K+", label: "Active readers", color: "cyan" },
            ].map((stat, index) => (
              <div
                key={index}
                className={`text-center group stagger-item glass rounded-2xl p-8 hover:shadow-2xl transition-all duration-500 hover:scale-105`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div
                  className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-${stat.color}-500 to-${stat.color}-600 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <stat.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-4xl font-bold text-gray-900 mb-2 group-hover:text-teal-600 transition-colors">
                  {stat.number}
                </h3>
                <p className="text-gray-600 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Books */}
      <FeaturedBooks />

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-r from-teal-600 to-emerald-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Why Choose BookVerse?</h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Experience reading like never before with our innovative features
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: TrendingUp,
                title: "Smart Recommendations",
                description: "AI-powered suggestions based on your reading history and preferences",
              },
              {
                icon: Users,
                title: "Community Reviews",
                description: "Connect with fellow readers and discover books through trusted reviews",
              },
              {
                icon: Star,
                title: "Rating System",
                description: "Comprehensive rating system to help you find your next great read",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className={`text-center stagger-item glass-dark rounded-2xl p-8 hover:bg-white/10 transition-all duration-300`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <feature.icon className="h-12 w-12 mx-auto mb-6 text-white" />
                <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                <p className="opacity-90">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-teal-900 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-teal-600/20 to-emerald-600/20" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Start Your
            <span className="block gradient-text">Reading Journey?</span>
          </h2>
          <p className="text-xl mb-12 opacity-90 max-w-2xl mx-auto">
            Join thousands of book lovers and discover your next favorite story today
          </p>
          <Button
            size="lg"
            asChild
            className="bg-white text-teal-600 hover:bg-gray-100 px-12 py-4 text-lg font-bold rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105"
          >
            <Link href="/signup">
              <Sparkles className="mr-2 h-5 w-5" />
              Get Started Free
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
