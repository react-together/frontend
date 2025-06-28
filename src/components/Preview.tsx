import { SelectButton } from 'primereact/selectbutton';
import { Button } from 'primereact/button';
import { AutoComplete } from 'primereact/autocomplete';
import React, { useState } from 'react';
import { TransformWrapper, TransformComponent, MiniMap } from "react-zoom-pan-pinch";
import { ImageElement } from './ImageCard';
import { DomHandler } from 'primereact/utils';
import { gql, useMutation } from '@apollo/client';

const CREATE_COMMENT = gql`
mutation CreateOneComment($data: PhotoReactionInsertInput!) {
  photoReactionCreateOne(data: $data) {
    comment,
    isRecommended
  }
}
`;

const UPDATE_COMMENT = gql`
mutation UpdateOneComment($data: PhotoReactionUpdateInput!, $filter: PhotoReactionFilterInput!) {
  photoReactionUpdate(data: $data, filter: $filter) {
    comment,
    isRecommended
  }
}
`;

interface PreviewProps {
  userId: number;
  images: ImageElement[];
  index: number;
  onClose: () => void;
}

export const Preview: React.FC<PreviewProps> = (props) => {
  const { height } = DomHandler.getViewport();
  const [index, setIndex] = useState<number>(props.index);
  const image = props.images[index];
  const [isRecommended, setIsRecommended] = useState<string | null>(
    image.reaction ? (image.reaction.isRecommended ? '正向' : '負向') : null
  );
  const [value, setValue] = useState<string>(image.reaction?.comment ?? '');
  const [searchItems, setSearchItems] = useState<string[]>([]);
  const [createComment] = useMutation(CREATE_COMMENT);
  const [updateComment] = useMutation(UPDATE_COMMENT);
  const handleCreateComment = async (comment: string, isRecommended: number) => {
    if (image.reaction) {
      await updateComment({ 
        variables: {
          data: {
            comment,
            isRecommended
          },
          filter: {
            userId: { eq: props.userId },
            photoId: { eq: image.id }
          }
        }
      });
    } else {
      await createComment({ 
        variables: {
          data: {
            userId: props.userId,
            photoId: image.id,
            comment,
            isRecommended
          }
        }
      });
    }
    setValue('');
  };
  const suggestions = [
    '構圖不錯',
    '攝影技巧不錯',
    '主題選擇不錯',
    '內容充實',
    '構圖不好',
    '過曝',
    '失焦',
    '光線不足',
  ];
  return (
    <>
      <div className='absolute top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 opacity-50 z-1000'>
      </div>
      <div className='absolute top-0 left-0 w-full h-screen flex flex-col items-center z-1001'>
        <div
          className='w-full overflow-x-auto min-h-[66px] bg-gray-600'
        >
          <div className='flex h-full ml-2 min-w-[700px]'>
            <div className='flex h-full items-center gap-2'>
              <AutoComplete
                suggestions={searchItems}
                value={value}
                onChange={(e) => setValue(e.value)}
                completeMethod={(e) => {
                  setSearchItems(suggestions.filter(item => item.includes(e.query)));
                }}
                dropdown
                placeholder='建議'
                className='z-1002'
              />
              <span className='!text-white'>以</span>
              <SelectButton
                value={isRecommended}
                onChange={(e) => {
                  setIsRecommended(e.value);
                  handleCreateComment(value, e.value === '正向' ? 1 : 0);
                }}
                options={['正向', '負向']}
              />
              <span className='!text-white'>的評價送出</span>
            </div>
            <div className='flex flex-grow'></div>
            <Button
              text
              className='!text-white'
              onClick={props.onClose}
            >
              關閉
            </Button>
          </div>
        </div>
        <TransformWrapper>
          {({ zoomIn, zoomOut, resetTransform }) => (
            <>
              <div className='fixed z-1002 top-20 right-3'>
                <div className='flex gap-2 mb-2'>
                  <Button
                    icon="pi pi-search-plus"
                    onClick={() => zoomIn()}
                    size='small'
                  />
                  <Button
                    icon="pi pi-search-minus"
                    onClick={() => zoomOut()}
                    size='small'
                  />
                  <Button
                    icon="pi pi-refresh"
                    onClick={() => resetTransform()}
                    size='small'
                  />
                </div>
                <MiniMap width={100}>
                  <img src={image.src} style={{ height: `${height - 66}px` }} />
                </MiniMap>
                <div className='flex gap-2 mt-2'>
                  <Button
                    icon="pi pi-chevron-left"
                    onClick={() => setIndex((prev) => (prev > 0 ? prev - 1 : props.images.length - 1))}
                    size='small'
                  />
                  <Button
                    icon="pi pi-chevron-right"
                    onClick={() => setIndex((prev) => (prev < props.images.length - 1 ? prev + 1 : 0))}
                    size='small'
                  />
                </div>
              </div>
              <TransformComponent
                wrapperStyle={{ height: `${height - 66}px`, width: '100%' }}
              >
                <img src={image.src} style={{ height: `${height - 66}px` }} />
              </TransformComponent>
            </>
          )}
        </TransformWrapper>
      </div>
    </>
  );
}