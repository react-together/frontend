import React from 'react';
import { Toolbar } from 'primereact/toolbar';
import { classNames } from 'primereact/utils';
import { Button } from 'primereact/button'; 

const Gallery: React.FC = () => { 
  const rightContents = (
    <div className="flex items-center space-x-2">
      <Button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
        登出
      </Button>
    </div>
  );

  return (
    <div>
      <Toolbar
        unstyled
        start="React Together"
        end={rightContents}
        pt={{
          root: {
            className: classNames('bg-gray-700 flex justify-between py-2 px-4 shadow-xl'),
          },
          start: {
            className: classNames('flex items-center justify-center space-x-2 text-white text-xl'),
          },
        }}
      />
    </div>
  );
}

export default Gallery;