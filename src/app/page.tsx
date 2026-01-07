"use client";

import Image from 'next/image';
import { useState, useMemo } from 'react';
import { caterers as allCaterers, CITIES_IN_INDIA, SPECIALTIES } from '@/lib/data';
import type { Caterer } from '@/lib/types';
import CatererCard from '@/components/catering/CatererCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

const heroImage = PlaceHolderImages.find(p => p.id === 'hero-background');

export default function Home() {
  const [caterers, setCaterers] = useState<Caterer[]>(allCaterers.slice(0, 6));
  const [searchCity, setSearchCity] = useState('');
  const [filterSpecialty, setFilterSpecialty] = useState('');
  const [priceRange, setPriceRange] = useState([500]);
  
  const handleSearch = () => {
    const filtered = allCaterers.filter(caterer => {
      const cityMatch = searchCity ? caterer.city.toLowerCase().includes(searchCity.toLowerCase()) : true;
      const specialtyMatch = filterSpecialty && filterSpecialty !== 'all' ? caterer.specialty.includes(filterSpecialty) : true;
      const priceMatch = caterer.pricePerPlate <= priceRange[0];
      return cityMatch && specialtyMatch && priceMatch;
    });
    setCaterers(filtered);
  };
  
  return (
    <div className="flex flex-col">
      <section className="relative w-full h-[60vh] text-white">
        {heroImage && (
            <Image
              src={heroImage.imageUrl}
              alt={heroImage.description}
              fill
              className="object-cover"
              data-ai-hint={heroImage.imageHint}
              priority
            />
        )}
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          <h1 className="text-5xl md:text-7xl font-headline font-bold text-primary animate-fade-in-down">CaterEase</h1>
          <p className="mt-4 text-lg md:text-xl max-w-2xl text-gray-200 animate-fade-in-up">Discover exceptional catering for any event, anywhere in India.</p>
        </div>
      </section>

      <section id="search" className=" -mt-24 md:-mt-16 z-20 px-4 w-full">
        <Card className="max-w-4xl mx-auto shadow-2xl">
          <CardContent className="p-4 md:p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 items-end">
              <div className="lg:col-span-1">
                <Label htmlFor="city-search" className="mb-2 block font-semibold">City</Label>
                <Input
                  id="city-search"
                  type="text"
                  placeholder="e.g., Mumbai, Delhi"
                  value={searchCity}
                  onChange={(e) => setSearchCity(e.target.value)}
                  className="h-12"
                />
              </div>
              <div className="md:col-span-1">
                 <Label htmlFor="specialty-filter" className="mb-2 block font-semibold">Specialty</Label>
                <Select value={filterSpecialty} onValueChange={setFilterSpecialty}>
                  <SelectTrigger className="h-12" id="specialty-filter">
                    <SelectValue placeholder="Any Specialty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Any Specialty</SelectItem>
                    {SPECIALTIES.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="md:col-span-1">
                <Label htmlFor="price-range" className="mb-2 block font-semibold">Max Price/Plate (₹{priceRange[0]})</Label>
                <Slider
                  id="price-range"
                  max={5000}
                  step={100}
                  value={priceRange}
                  onValueChange={setPriceRange}
                />
              </div>
              <div className="md:col-span-3 lg:col-span-1">
                <Button onClick={handleSearch} className="w-full h-12 text-lg" variant="destructive">Search</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="py-12 md:py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-headline text-center mb-10">Featured Caterers</h2>
          {caterers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {caterers.map((caterer) => (
                <CatererCard key={caterer.id} caterer={caterer} />
              ))}
            </div>
          ) : (
             <div className="text-center text-muted-foreground py-16">
              <p className="text-xl">No caterers found matching your criteria.</p>
              <p className="mt-2">Try adjusting your search filters.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
