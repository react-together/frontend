import React, { useState } from 'react';
import { Image } from 'primereact/image';
import { Fieldset } from 'primereact/fieldset';
import { Tag } from 'primereact/tag';
import { createPortal } from 'react-dom';
import { Preview } from './Preview';
import { PhotoReaction } from '../types/PhotoReaction';

export interface ImageElement {
  id: number;
  src: string;
  fileName?: string;
  info?: string;
  categories?: string[];
  author?: string;
  reaction?: PhotoReaction;
}

export interface ImageCardProps {
  userId: number;
  images: ImageElement[];
  index: number;
}

export const ImageCard: React.FC<ImageCardProps> = (props) => {
  const [openPreview, setOpenPreview] = useState<boolean>(false);
  const image = props.images[props.index];
  return (
    <div className='p-2'>
      <Fieldset legend={image.author ?? 'Nobody'} className="w-80">
        <div className="flex flex-row justify-between flex-wrap">
          <span>{image.fileName}</span>
          <span>{image.info}</span>
        </div>
        <div
          className='relative cursor-pointer'
          onClick={() => setOpenPreview(true)}
        >
          <Image
            src={image.src}
            width="300"
          />
          <div className='absolute bottom-0 h-[20%] inset-x-0 bg-black opacity-50 text-white text-center text-sm flex items-center justify-center'>
            點我看大圖
          </div>
        </div>
        {openPreview && createPortal(
          <Preview
                      userId={props.userId}
                      images={props.images}
                      index={props.index}
                      onClose={() => setOpenPreview(false)}
                    />,
          document.body
        )}
        <div className='flex flex-row'>
          {image.reaction?.comment !== undefined && (
            <span className='p-1'>
              {image.reaction.isRecommended ? (
                <Tag className="mr-2" severity='success' icon="pi pi-thumbs-up" value={image.reaction.comment} />
              ) : (
                <Tag className="mr-2" severity='danger' icon="pi pi-thumbs-down" value={image.reaction.comment} />
              )}
            </span>
          )}
          {(image.categories ?? []).map((category, index) => (
            <span className='p-1' key={index}>
              <Tag value={category} />
            </span>
          ))}
        </div>
      </Fieldset>
    </div>
  );
}
