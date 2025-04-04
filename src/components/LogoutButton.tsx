import React from 'react';
import { Button } from 'primereact/button';

export const LogoutButton: React.FC = () => { 
  return (
    <Button
      text
      className='!text-white'
    >
      登出
    </Button>
  );
}