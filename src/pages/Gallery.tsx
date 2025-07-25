import React, { useMemo, useState } from 'react';
import { ImageCard, ImageElement } from '../components/ImageCard';
import { AppFrame } from '../components/AppFrame';
import { useQuery, gql } from '@apollo/client';
import { FlickrPhotoSize } from '../types/FilckrPhotoSize';
import { useKeycloak } from '@react-keycloak/web';
import { Tag } from '../types/Tag';
import { ConnectOprtator, FilterItem, FilterKey, FilterOperator } from '../types/FilterItem';
import { FilterContext } from '../components/FilterContext';
import filter from '../utils/filter';

const GET_SCHEMA = gql`
query GetSchema {
  __schema {
    types {
      name
      kind
      description
    }
  }
}`;

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
query GetFlickrPhotoSizes ($reactionFilter: PhotoReactionFilterInput) {
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
          photoReaction (filters: $reactionFilter) {
            nodes {
              isRecommended,
              comment
            }
          },
          tag {
            nodes {
              id,
              name,
              description,
              note,
              tagType
            }
          }
        }
      }
    }
  }
}
`;

const Gallery: React.FC = () => {
  const [filters, setFilters] = useState<FilterItem[]>([{
    id: 0,
    parentId: null,
    label: FilterKey.GROUP,
    operator: FilterOperator.IN,
    connect: ConnectOprtator.AND,
    values: []
  }]);
  const { keycloak } = useKeycloak();
  const { data: schemaData, loading: schemaLoading, error: schemaError } = useQuery(GET_SCHEMA);
  const { data: me, loading: meLoading, error: meError } = useQuery(GET_ME, {
    variables: { sub: keycloak.subject },
    skip: !keycloak.authenticated,
  });
  const reactionFilter = useMemo(() => {
    return { userId: { eq: me?.user?.nodes[0]?.id } };
  }, [me]);
  const { data, loading, error } = useQuery(GET_PHOTOS, {
    variables: { reactionFilter },
    skip: !me,
  });

  if (loading || meLoading || schemaLoading) return <p>Loading...</p>;
  if (error || meError || schemaError) return <p>Error: {[error?.message, meError?.message, schemaError?.message].join('.')}</p>;

  console.log(schemaData);
  console.log(data);

  const arr: ImageElement[] = data.flickrPhotoSize.nodes
    .map((item: FlickrPhotoSize) => ({
      id: item.flickrPhoto.photoId,
      src: `https://live.staticflickr.com/${item.serverId}/${item.flickrPhotoId}_${item.secret}_${item.suffix}.jpg`,
      fileName: `${item.flickrPhotoId}_${item.secret}_${item.suffix}.jpg`,
      author: item.flickrPhoto.photo.tag.nodes.find((tag: Tag) => tag.tagType === 'photographer')?.name ?? 'Nobody',
      categories: item.flickrPhoto.photo.tag.nodes.filter((item: Tag) => item.tagType === 'category').map((item: Tag) => item.name) ?? [],
      reaction: item.flickrPhoto.photo.photoReaction.nodes[0]
    }));

  const newArr = filter(arr, filters, 0);

  return (
    <FilterContext.Provider value={{ payloads: filters, setPayloads: setFilters }}>
      <AppFrame>
        <div className='flex flex-row flex-wrap justify-center'>
          {newArr.map((_, index) => (
            <ImageCard
              userId={me.user.nodes[0].id}
              images={newArr}
              index={index}
              key={index}
            />
          ))}
        </div>
      </AppFrame>
    </FilterContext.Provider>
  );
}

export default Gallery;
