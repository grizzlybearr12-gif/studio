'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { Caterer } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import StarRating from './StarRating';
import { MapPin, IndianRupee } from 'lucide-react';

interface CatererCardProps {
  caterer: Caterer;
}

export default function CatererCard({ caterer }: CatererCardProps) {
  return (
    <Link href={`/caterer/${caterer.id}`} className="block group">
      <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-primary/20 hover:shadow-lg hover:-translate-y-1">
        <div className="relative h-48 w-full">
          <Image
            src={caterer.imageUrl}
            alt={`Photo of ${caterer.name}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            data-ai-hint={caterer.imageHint}
          />
        </div>
        <CardHeader>
          <CardTitle className="font-headline text-2xl truncate">{caterer.name}</CardTitle>
          <CardDescription className="flex items-center gap-2 pt-1">
            <MapPin className="w-4 h-4" />
            {caterer.city}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex flex-wrap gap-2">
            {caterer.specialty.slice(0, 2).map((spec) => (
              <Badge key={spec} variant="secondary">{spec}</Badge>
            ))}
          </div>
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center gap-1 font-bold text-primary">
              <IndianRupee className="w-4 h-4" />
              <span>{caterer.pricePerPlate} / plate</span>
            </div>
            <div className="flex items-center gap-2">
              <StarRating rating={caterer.rating} />
              <span className="text-xs text-muted-foreground">({caterer.reviews.length})</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
