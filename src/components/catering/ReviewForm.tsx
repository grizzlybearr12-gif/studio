"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import StarRating from './StarRating';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from "@/hooks/use-toast"

export default function ReviewForm() {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Please select a star rating before submitting.",
      })
      return;
    }
    // In a real app, you would submit this data to your backend
    console.log({ rating, comment });
    toast({
        title: "Review Submitted!",
        description: "Thank you for your feedback.",
    });
    setRating(0);
    setComment('');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Leave a Review</CardTitle>
        <CardDescription>Share your experience with this caterer.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label>Your Rating</Label>
            <StarRating rating={rating} onRatingChange={setRating} isEditable={true} size={24} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="comment">Your Review</Label>
            <Textarea
              id="comment"
              placeholder="Tell us about the food, service, and overall experience..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
            />
          </div>
          <Button type="submit">Submit Review</Button>
        </form>
      </CardContent>
    </Card>
  );
}
