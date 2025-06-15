import React from 'react';
import { ImageCard, ImageElement } from '../components/ImageCard';
import { AppFrame } from '../components/AppFrame';
import { useQuery, gql } from '@apollo/client';
import { FlickrPhotoSize } from '../types/FilckrPhotoSize';

const GET_PHOTOS = gql`
query GetFlickrPhotoSizes {
  flickrPhotoSize (filters: { suffix: { eq: "o" } }) {
    nodes {
      flickrPhotoId,
      serverId,
      secret,
      suffix,
      width,
      height
    }
  }
}
`;

const Gallery: React.FC = () => {
  const { data, loading, error } = useQuery(GET_PHOTOS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const arr: ImageElement[] = data.flickrPhotoSize.nodes.map((item: FlickrPhotoSize) => ({
    src: `https://live.staticflickr.com/${item.serverId}/${item.flickrPhotoId}_${item.secret}_${item.suffix}.jpg`,
    fileName: `${item.flickrPhotoId}_${item.secret}_${item.suffix}.jpg`,
    info: '1/400 ƒ/6.3 ISO 640',
    categories: ['Nature', 'Animals'],
  }));

  return (
    <AppFrame>
      <div className='flex flex-row flex-wrap justify-center'>
        {arr.map((_, index) => (
          <ImageCard
            images={arr}
            index={index}
            key={index}
          />
        ))}
      </div>
    </AppFrame>
  );
}

export default Gallery;
