import React, { useState } from 'react';
import { Image } from 'primereact/image';
import { Fieldset } from 'primereact/fieldset';
import { Tag } from 'primereact/tag';
import { createPortal } from 'react-dom';
import { Preview } from './Preview';

export interface ImageCardProps {
  src: string;
  categories?: string[];
  fileName?: string;
  info?: string;
  author?: string;
}

export const ImageCard: React.FC<ImageCardProps> = (props) => {
  const [openPreview, setOpenPreview] = useState<boolean>(false);
  return (
    <div className='p-2'>
      <Fieldset legend={props.author ?? 'Nobody'} className="w-80">
        <div className="flex flex-row justify-between flex-wrap">
          <span>{props.fileName}</span>
          <span>{props.info}</span>
        </div>
        <div
          className='relative cursor-pointer'
          onClick={() => setOpenPreview(true)}
        >
          <Image
            src={props.src}
            width="300"
          />
          <div className='absolute bottom-0 h-[20%] inset-x-0 bg-black opacity-50 text-white text-center text-sm flex items-center justify-center'>
            點我看大圖
          </div>
        </div>
        {openPreview && createPortal(
          <Preview onClose={() => setOpenPreview(false)} />,
          document.body
        )}
        <div className='flex flex-row'>
          {(props.categories ?? []).map((category, index) => (
            <span className='p-1' key={index}>
              <Tag value={category} />
            </span>
          ))}
        </div>
      </Fieldset>
    </div>
  );
}
