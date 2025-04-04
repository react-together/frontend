import React from 'react';
import { Button } from 'primereact/button';

export const FilterButton: React.FC = () => { 
  return (
    <Button
      text
      className='!text-white'
    >
      篩選照片
    </Button>
  );
}