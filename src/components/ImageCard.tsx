import React from 'react';
import { Image } from 'primereact/image';
import { Fieldset } from 'primereact/fieldset';
import { Tag } from 'primereact/tag';

export interface ImageCardProps {
  src: string;
  categories?: string[];
  fileName?: string;
  info?: string;
  author?: string;
}

export const ImageCard: React.FC<ImageCardProps> = (props) => { 
  return (
    <div className='p-2'>
      <Fieldset legend={props.author ?? 'Nobody'} className="w-80">
        <div className="flex flex-row justify-between flex-wrap">
          <span>{props.fileName}</span>
          <span>{props.info}</span>
        </div>
        <Image src={props.src} width="300" preview />
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
