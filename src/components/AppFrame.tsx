import React from 'react';
import { Toolbar } from 'primereact/toolbar';
import { LogoutButton } from './LogoutButton';
import { Filters } from './Filters';
import { ScrollPanel } from 'primereact/scrollpanel';

export interface AppFrameProps {
  children?: React.ReactNode;
}

const Component: React.FC<AppFrameProps> = (props) => { 
  return (
    <ScrollPanel style={{ width: '100%', height: '100vh' }}>
      <div className='sticky top-0 left-0 w-full z-1000'>
        <Toolbar
          unstyled
          start="React Together"
          end={
            <div className="flex items-center space-x-2">
              <LogoutButton />
            </div>
          }
          pt={{
            root: {
              className: 'bg-gray-600 backdrop-blur-md flex justify-between py-2 px-4',
            },
            start: {
              className: 'flex items-center justify-center space-x-2 text-white text-xl',
            },
          }}
        />
        <Filters />
      </div>
      {props.children}
    </ScrollPanel>
  );
}

export const AppFrame = React.memo(Component);