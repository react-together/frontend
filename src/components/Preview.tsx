import { Button } from 'primereact/button';
import { Image } from 'primereact/image';
import { DomHandler } from 'primereact/utils';
import React from 'react';

interface PreviewProps {
  src: string;
  onClose: () => void;
}

export const Preview: React.FC<PreviewProps> = (props) => {
  const { width } = DomHandler.getViewport();
  return (
    <>
      <div className='absolute top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 opacity-50 z-1000'>
      </div>
      <div className='absolute top-0 left-0 w-full h-full flex items-center justify-center z-1001'>
        <Image
          src={props.src}
          width={`${width * 0.9}px`}
        />
        <Button icon="pi pi-times" onClick={props.onClose} rounded text raised severity="danger" aria-label="Cancel">關閉</Button>
      </div>
    </>
  );
}