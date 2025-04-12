import { Button } from 'primereact/button';
import React from 'react';

interface PreviewProps {
  onClose: () => void;
}

export const Preview: React.FC<PreviewProps> = (props) => {
  return (
    <>
      <div className='absolute top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 opacity-50 z-1000'>
      </div>
      <div className='absolute top-0 left-0 w-full h-full flex items-center justify-center z-1001'>
        <div>I'm a modal dialog</div>
        <Button icon="pi pi-times" onClick={props.onClose} rounded text raised severity="danger" aria-label="Cancel" />
      </div>
    </>
  );
}