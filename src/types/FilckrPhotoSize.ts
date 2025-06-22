import { FlickrPhoto } from "./FlickrPhoto";

export interface FlickrPhotoSize {
  flickrPhotoId: number;
  serverId: number;
  secret: string;
  suffix: string;
  width: number;
  height: number;
  flickrPhoto: FlickrPhoto;
}