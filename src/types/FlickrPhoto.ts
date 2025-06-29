import { PhotoReaction } from "./PhotoReaction";
import { Tag } from "./Tag";

export interface FlickrPhoto {
  photo: {
    photoReaction: {
      nodes: PhotoReaction[];
    };
    tag: {
      nodes: Tag[];
    };
  };
  photoId: number;
}