"use client"

import type React from "react"
import { useState } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { useBooks } from "@/contexts/BookContext"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { StarRating } from "@/components/StarRating"
import { useToast } from "@/hooks/use-toast"
import { Sparkles } from "lucide-react"

interface ReviewModalProps {
  bookId: string
  bookTitle: string
  isOpen: boolean
  onClose: () => void
}

export function ReviewModal({ bookId, bookTitle, isOpen, onClose }: ReviewModalProps) {
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { user } = useAuth()
  const { addReview } = useBooks()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to submit a review.",
        variant: "destructive",
      })
      return
    }

    if (rating === 0) {
      toast({
        title: "Rating required",
        description: "Please select a rating before submitting.",
        variant: "destructive",
      })
      return
    }

    if (!comment.trim()) {
      toast({
        title: "Comment required",
        description: "Please write a comment before submitting.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      await addReview(bookId, {
        userId: user.id,
        userName: user.name,
        userAvatar: user.avatar,
        rating,
        comment: comment.trim(),
      })

      toast({
        title: "Review submitted! ✨",
        description: "Thank you for sharing your thoughts with the community.",
      })

      // Reset form
      setRating(0)
      setComment("")
      onClose()
    } catch (error) {
      console.error("Review submission error:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to submit review. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] glass border-0 shadow-2xl">
        <DialogHeader className="text-center">
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent flex items-center justify-center">
            <Sparkles className="h-5 w-5 mr-2 text-teal-600" />
            Write a Review
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            Share your thoughts about "{bookTitle}" with fellow readers
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="text-center">
            <label className="text-sm font-semibold mb-4 block text-gray-700">How would you rate this book?</label>
            <div className="flex justify-center">
              <StarRating rating={rating} interactive onRatingChange={setRating} size="lg" />
            </div>
            {rating > 0 && (
              <p className="text-sm text-gray-500 mt-2">
                {rating === 1 && "Poor"}
                {rating === 2 && "Fair"}
                {rating === 3 && "Good"}
                {rating === 4 && "Very Good"}
                {rating === 5 && "Excellent"}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="comment" className="text-sm font-semibold mb-3 block text-gray-700">
              Your Review
            </label>
            <Textarea
              id="comment"
              placeholder="What did you think about this book? Share your insights, favorite moments, or recommendations..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={5}
              className="resize-none border-0 bg-white/50 backdrop-blur-sm focus:bg-white/80 transition-all rounded-xl"
            />
          </div>
          <DialogFooter className="flex gap-3">
            <Button type="button" variant="outline" onClick={onClose} className="rounded-full">
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 rounded-full px-8"
            >
              {isSubmitting ? (
                <>
                  <div className="spinner mr-2" style={{ width: "16px", height: "16px", borderWidth: "2px" }} />
                  Submitting...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4 mr-2" />
                  Submit Review
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
