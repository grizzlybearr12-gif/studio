import Image from 'next/image';
import { caterers } from '@/lib/data';
import { notFound } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import StarRating from '@/components/catering/StarRating';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Phone, Mail, IndianRupee, MapPin } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import ReviewForm from '@/components/catering/ReviewForm';
import GenerateMenu from '@/components/catering/GenerateMenu';

export function generateStaticParams() {
  return caterers.map((caterer) => ({
    id: caterer.id,
  }));
}

const galleryImages = PlaceHolderImages.filter(p => p.id.startsWith('gallery-'));


export default function CatererDetailPage({ params }: { params: { id: string } }) {
  const caterer = caterers.find((c) => c.id === params.id);

  if (!caterer) {
    notFound();
  }

  const allImages = [
    { id: caterer.id, imageUrl: caterer.imageUrl, description: caterer.name, imageHint: caterer.imageHint },
    ...galleryImages
  ]

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
        <div className="lg:col-span-2">
          <Carousel className="w-full shadow-lg rounded-lg overflow-hidden">
            <CarouselContent>
              {allImages.map((img, index) => (
                <CarouselItem key={index}>
                  <div className="relative aspect-video">
                    <Image
                      src={img.imageUrl}
                      alt={img.description}
                      fill
                      className="object-cover"
                      data-ai-hint={img.imageHint}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="ml-16" />
            <CarouselNext className="mr-16" />
          </Carousel>

          <div className="mt-8">
            <h1 className="font-headline text-4xl md:text-5xl font-bold">{caterer.name}</h1>
            <div className="flex items-center gap-2 text-muted-foreground mt-2">
              <MapPin className="w-5 h-5" />
              <span>{caterer.city}</span>
            </div>
            
            <div className="flex flex-wrap gap-2 mt-4">
              {caterer.specialty.map(spec => <Badge key={spec}>{spec}</Badge>)}
            </div>

            <p className="mt-6 text-lg text-foreground/80 leading-relaxed">{caterer.description}</p>
          </div>
        </div>

        <div className="lg:col-span-1 space-y-6">
          <Card className="bg-card">
            <CardHeader>
              <CardTitle className="font-headline">At a Glance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Rating</span>
                <div className="flex items-center gap-2">
                  <StarRating rating={caterer.rating} />
                  <span className="font-bold">{caterer.rating.toFixed(1)}</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Price starts at</span>
                <div className="flex items-center font-bold">
                  <IndianRupee className="w-4 h-4 mr-1" />
                  {caterer.pricePerPlate} / plate
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card">
            <CardHeader>
              <CardTitle className="font-headline">Contact Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary" />
                <a href={`tel:${caterer.contact.phone}`} className="hover:underline">{caterer.contact.phone}</a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary" />
                <a href={`mailto:${caterer.contact.email}`} className="hover:underline">{caterer.contact.email}</a>
              </div>
            </CardContent>
          </Card>
          
          <GenerateMenu specialties={caterer.specialty} />

        </div>
      </div>
      
      <div className="mt-12">
        <h2 className="font-headline text-3xl font-bold mb-6">Reviews</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {caterer.reviews.map(review => (
            <Card key={review.id} className="bg-card">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{review.author}</CardTitle>
                    <CardDescription className="text-xs">{new Date(review.date).toLocaleDateString()}</CardDescription>
                  </div>
                  <StarRating rating={review.rating} size={14} />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/80">{review.comment}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="mt-12">
        <ReviewForm />
      </div>
    </div>
  );
}
