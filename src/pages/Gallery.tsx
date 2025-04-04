import React from 'react';
import { ImageCard } from '../components/ImageCard';
import test from '../assets/test.jpg';
import { AppFrame } from '../components/AppFrame';

const Gallery: React.FC = () => { 
  return (
    <AppFrame>
      <div className='flex flex-row flex-wrap justify-center'>
        {Array(10).fill(0).map((_, index) => (
          <ImageCard
            src={test}
            key={index}
            fileName='test.jpg'
            info='1/400 ƒ/6.3 ISO 640'
            categories={['Nature', 'Animals']}
          />
        ))}
      </div>
    </AppFrame>
  );
}

export default Gallery;