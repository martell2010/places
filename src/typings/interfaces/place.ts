import { GeoPoint, FieldValue } from '@firebase/firestore-types';
interface Place {
  url: string;
  description: string;
  image: File | string | null;
  name: string;
  rating: number;
  createdAt?: FieldValue;
  location?: GeoPoint | object;
}

export { Place };
