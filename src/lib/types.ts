export interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Caterer {
  id: string;
  name: string;
  city: string;
  specialty: string[];
  pricePerPlate: number;
  rating: number;
  reviews: Review[];
  imageUrl: string;
  imageHint: string;
  contact: {
    phone: string;
    email: string;
  };
  description: string;
}

export const CITIES_IN_INDIA = [
  'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Ahmedabad', 'Chennai', 'Kolkata', 'Surat', 'Pune', 'Jaipur'
];

export const SPECIALTIES = [
  'North Indian', 'South Indian', 'Chinese', 'Italian', 'Continental', 'Wedding', 'Corporate', 'Desserts'
];
