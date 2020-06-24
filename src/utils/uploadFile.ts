import { storage } from '@/db';
const uploadFile = async (File: File | null | string, catalog: string = 'places'): Promise<string> => {
  if (File === null || typeof File === 'string') return File || '';
  const storageRef = storage.ref();
  const childRef = storageRef.child(catalog + '/' + File.name);
  let url: string = '';
  try {
    const snapshot = await childRef.put(File);
    url = await snapshot.ref.getDownloadURL();
  } catch (error) {
    console.log('error', { error });
  }
  return url;
};

export { uploadFile };
