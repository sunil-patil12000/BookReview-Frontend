import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { BookProvider } from "@/contexts/BookContext"
import { AuthProvider } from "@/contexts/AuthContext"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "BookReview - Discover & Review Books",
  description: "A platform to discover, review, and discuss your favorite books",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <BookProvider>
            {children}
            <Toaster />
          </BookProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
