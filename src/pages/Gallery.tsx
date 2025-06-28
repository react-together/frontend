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

const GET_SECHEMA = gql`
query GetSchema {
  __schema {
    types {
      name
      kind
      description
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
  const { data: schemaData, loading: schemaLoading, error: schemaError } = useQuery(GET_SECHEMA);

  if (loading || meLoading || schemaLoading) return <p>Loading...</p>;
  if (error || meError || schemaError) return <p>Error: {[error?.message, meError?.message, schemaError?.message].join('.')}</p>;

  console.log(data);
  console.log(schemaData);

  const arr: ImageElement[] = data.flickrPhotoSize.nodes.map((item: FlickrPhotoSize) => ({
    id: item.flickrPhoto.photoId,
    src: `https://live.staticflickr.com/${item.serverId}/${item.flickrPhotoId}_${item.secret}_${item.suffix}.jpg`,
    fileName: `${item.flickrPhotoId}_${item.secret}_${item.suffix}.jpg`,
    categories: ['Nature', 'Animals'],
    reaction: item.flickrPhoto.photo.photoReaction.nodes[0]
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
