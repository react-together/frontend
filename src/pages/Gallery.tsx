import React from 'react';
import { ImageCard, ImageElement } from '../components/ImageCard';
import test from '../assets/test.jpg';
import test2 from '../assets/test2.png';
import test3 from '../assets/test3.png';
import test4 from '../assets/test4.png';
import test5 from '../assets/test5.png';
import test6 from '../assets/test6.jpg';
import { AppFrame } from '../components/AppFrame';

const Gallery: React.FC = () => {
  const arr: ImageElement[] = [
    {
      src: test,
      fileName: 'test.jpg',
      info: '1/400 ƒ/6.3 ISO 640',
      categories: ['Nature', 'Animals'],
    },
    {
      src: test2,
      fileName: 'test2.png',
      info: '1/400 ƒ/6.3 ISO 640',
      categories: ['Nature', 'Animals'],
    },
    {
      src: test3,
      fileName: 'test3.png',
      info: '1/400 ƒ/6.3 ISO 640',
      categories: ['Nature', 'Animals'],
    },
    {
      src: test4,
      fileName: 'test4.png',
      info: '1/400 ƒ/6.3 ISO 640',
      categories: ['Nature', 'Animals'],
    },
    {
      src: test5,
      fileName: 'test5.png',
      info: '1/400 ƒ/6.3 ISO 640',
      categories: ['Nature', 'Animals'],
    },
    {
      src: test6,
      fileName: 'test6.jpg',
      info: '1/400 ƒ/6.3 ISO 640',
      categories: ['Nature', 'Animals'],
    },
  ]
  return (
    <AppFrame>
      <div className='flex flex-row flex-wrap justify-center'>
        {arr.map((_, index) => (
          <ImageCard
            images={arr}
            index={index}
            key={index}
          />
        ))}
      </div>
    </AppFrame>
  );
}

export default Gallery;