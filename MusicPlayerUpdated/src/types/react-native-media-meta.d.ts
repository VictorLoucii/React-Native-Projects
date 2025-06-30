// src/types/react-native-media-meta.d.ts

declare module 'react-native-media-meta' {
  export interface MediaMeta {
    title?: string;
    artist?: string;
    album?: string;
    duration?: string; // The library returns duration as a string of milliseconds
    thumb?: string; // This is a base64 encoded string of the image
  }

  const MediaMeta: {
    get(path: string): Promise<MediaMeta>;
  };

  export default MediaMeta;
}