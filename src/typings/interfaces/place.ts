import { GeoPoint, FieldValue } from '@firebase/firestore-types';
interface Place {
  url: string;
  description: string;
  image: File | string;
  name: string;
  rating: number;
  createdAt?: FieldValue;
  location?: GeoPoint;
}

export { Place };
