import React from 'react';
import { ImageCard, ImageElement } from '../components/ImageCard';
import { AppFrame } from '../components/AppFrame';
import { useQuery, gql } from '@apollo/client';
import { FlickrPhotoSize } from '../types/FilckrPhotoSize';
import { useKeycloak } from '@react-keycloak/web';

const GET_ME = gql`
query GetMe ($sub: String!) {
  user (filters: { keycloakSub: { eq: $sub } }) {
    nodes {
      id,
      keycloakSub
    }
  }
}
`;

const GET_PHOTOS = gql`
query GetFlickrPhotoSizes ($userId: Int) {
  flickrPhotoSize (filters: { suffix: { eq: "o" } }) {
    nodes {
      flickrPhotoId,
      serverId,
      secret,
      suffix,
      width,
      height,
      flickrPhoto {
        photoId,
        photo {
          photoReaction (filters: { userId: { eq: $userId } }) {
            nodes {
              isRecommended,
              comment
            }
          }
        }
      }
    }
  }
}
`;

const Gallery: React.FC = () => {
  const { keycloak } = useKeycloak();
  const { data: me, loading: meLoading, error: meError } = useQuery(GET_ME, {
    variables: { sub: keycloak.subject },
    skip: !keycloak.authenticated,
  });
  const { data, loading, error } = useQuery(GET_PHOTOS, {
    variables: { userId: me?.user?.nodes[0]?.id },
    skip: !me,
  });

  if (loading || meLoading) return <p>Loading...</p>;
  if (error || meError) return <p>Error: {[error?.message, meError?.message].join('.')}</p>;

  console.log(data);

  const arr: ImageElement[] = data.flickrPhotoSize.nodes.map((item: FlickrPhotoSize) => ({
    id: item.flickrPhoto.photoId,
    src: `https://live.staticflickr.com/${item.serverId}/${item.flickrPhotoId}_${item.secret}_${item.suffix}.jpg`,
    fileName: `${item.flickrPhotoId}_${item.secret}_${item.suffix}.jpg`,
    categories: ['Nature', 'Animals'],
  }));

  return (
    <AppFrame>
      <div className='flex flex-row flex-wrap justify-center'>
        {arr.map((_, index) => (
          <ImageCard
            userId={me.user.nodes[0].id}
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
