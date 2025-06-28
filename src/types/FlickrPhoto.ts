import { PhotoReaction } from "./PhotoReaction";

export interface FlickrPhoto {
  photo: {
    photoReaction: {
      nodes: PhotoReaction[];
    };
  };
  photoId: number;
}