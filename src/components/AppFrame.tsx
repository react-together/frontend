import React from 'react';
import { Toolbar } from 'primereact/toolbar';
import { LogoutButton } from './LogoutButton';
import { FilterButton } from './FilterButton';

export interface AppFrameProps {
  children?: React.ReactNode;
}

export const AppFrame: React.FC<AppFrameProps> = (props) => { 
  return (
    <>
      <div className='fixed top-0 left-0 w-full z-1000'>
        <Toolbar
          unstyled
          start="React Together"
          end={
            <div className="flex items-center space-x-2">
              <FilterButton />
              <LogoutButton />
            </div>
          }
          pt={{
            root: {
              className: 'bg-gray-600 backdrop-blur-md flex justify-between py-2 px-4 shadow-lg',
            },
            start: {
              className: 'flex items-center justify-center space-x-2 text-white text-xl',
            },
          }}
        />
      </div>
      <div className='h-18'></div>
      {props.children}
    </>
  );
}