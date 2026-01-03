import { Star, StarHalf } from 'lucide-react';

interface RatingStarsProps {
  rating: number;
  showValue?: boolean;
}

export function RatingStars({ rating, showValue = true }: RatingStarsProps) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center">
        {Array.from({ length: 5 }).map((_, i) => {
          if (i < fullStars) {
            return <Star key={i} className="h-4 w-4 fill-warning text-warning" />;
          }
          if (i === fullStars && hasHalfStar) {
            return <StarHalf key={i} className="h-4 w-4 fill-warning text-warning" />;
          }
          return <Star key={i} className="h-4 w-4 text-muted" />;
        })}
      </div>
      {showValue && (
        <span className="text-sm text-muted-foreground ml-1">{rating.toFixed(1)}</span>
      )}
    </div>
  );
}
