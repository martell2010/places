import { Location } from './location';

interface Place {
  url: string;
  description: string;
  image: File | string;
  name: string;
  rating: number;
  createAt?: {
    nanoseconds: number;
    seconds: number;
  };
  location?: Location
}

export { Place };