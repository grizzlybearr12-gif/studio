"use client";

import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface StarRatingProps {
  rating: number;
  size?: number;
  className?: string;
  onRatingChange?: (rating: number) => void;
  isEditable?: boolean;
}

export default function StarRating({
  rating,
  size = 16,
  className,
  onRatingChange,
  isEditable = false,
}: StarRatingProps) {
  const [hoverRating, setHoverRating] = useState(0);

  const handleMouseOver = (index: number) => {
    if (isEditable) {
      setHoverRating(index);
    }
  };

  const handleMouseLeave = () => {
    if (isEditable) {
      setHoverRating(0);
    }
  };

  const handleClick = (index: number) => {
    if (isEditable && onRatingChange) {
      onRatingChange(index);
    }
  };

  const fullStars = Math.floor(hoverRating > 0 ? hoverRating : rating);
  const halfStar = !isEditable && (hoverRating > 0 ? hoverRating : rating) % 1 !== 0;

  return (
    <div className={cn("flex items-center gap-1", className)}>
      {[...Array(5)].map((_, i) => {
        const starValue = i + 1;
        const displayRating = hoverRating || rating;

        if (isEditable) {
          return (
            <button
              key={i}
              type="button"
              onMouseOver={() => handleMouseOver(starValue)}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleClick(starValue)}
              className="p-0 bg-transparent border-none cursor-pointer"
              aria-label={`Rate ${starValue} star${starValue > 1 ? 's' : ''}`}
            >
              <Star
                style={{ width: size, height: size }}
                className={cn(
                  'transition-colors',
                  starValue <= displayRating ? 'text-primary fill-primary' : 'text-muted-foreground/50'
                )}
              />
            </button>
          );
        }

        // Display only logic
        return (
          <div key={i} className="relative">
            <Star
              style={{ width: size, height: size }}
              className={cn('text-muted-foreground/30 fill-muted-foreground/30')}
            />
            <div
              className="absolute top-0 left-0 h-full overflow-hidden"
              style={{
                width: `${starValue <= rating ? 100 : starValue === Math.ceil(rating) && rating % 1 !== 0 ? (rating % 1) * 100 : 0}%`,
              }}
            >
              <Star
                style={{ width: size, height: size }}
                className={cn('text-primary fill-primary absolute top-0 left-0')}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
