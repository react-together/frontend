import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { SplitButton } from 'primereact/splitbutton';
import React, { useState } from 'react';
import { TransformWrapper, TransformComponent, MiniMap } from "react-zoom-pan-pinch";
import { ImageElement } from './ImageCard';
import { DomHandler } from 'primereact/utils';

interface PreviewProps {
  images: ImageElement[];
  index: number;
  onClose: () => void;
}

export const Preview: React.FC<PreviewProps> = (props) => {
  const { height } = DomHandler.getViewport();
  const [index, setIndex] = useState<number>(props.index);
  const image = props.images[index];
  const [value, setValue] = useState<string>('');
  const goods = [
    {
        label: '構圖不錯',
        command: () => {
        }
    },
    {
        label: '攝影技巧不錯',
        command: () => {
        }
    },
    {
        label: '主題選擇不錯',
        command: () => {
            
        }
    },
    {
        label: '內容充實',
        command: () => {
            
        }
    }
  ];
  const bads = [
    {
        label: '構圖不好',
        command: () => {
        }
    },
    {
        label: '過曝',
        command: () => {
        }
    },
    {
        label: '失焦',
        command: () => {
            
        }
    },
    {
        label: '光線不足',
        command: () => {
            
        }
    }
  ];
  return (
    <>
      <div className='absolute top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 opacity-50 z-1000'>
      </div>
      <div className='absolute top-0 left-0 w-full h-screen flex flex-col items-center z-1001'>
        <div
          className='w-full overflow-x-auto min-h-[66px] bg-gray-600'
        >
          <div className='flex h-full ml-2 min-w-[700px]'>
            <div className='flex h-full items-center gap-2'>
              <SplitButton label="我喜歡" icon="pi pi-plus" model={goods} size="small" />
              <SplitButton label="影象模糊" icon="pi pi-plus" model={bads} size="small" />
              <InputText value={value} onChange={(e) => setValue(e.target.value)} placeholder='其他想法' className='z-1002' />
              <span className='!text-white'>以</span>
              <Button
                size='small'
                className='!text-white'
              >
                正向
              </Button>
              <Button
                size='small'
                className='!text-white'
              >
                負向
              </Button>
              <span className='!text-white'>的評價送出</span>
            </div>
            <div className='flex flex-grow'></div>
            <Button
              text
              className='!text-white'
              onClick={props.onClose}
            >
              關閉
            </Button>
          </div>
        </div>
        <TransformWrapper>
          {({ zoomIn, zoomOut, resetTransform }) => (
            <>
              <div className='fixed z-1002 top-20 right-3'>
                <div className='flex gap-2 mb-2'>
                  <Button
                    icon="pi pi-search-plus"
                    onClick={() => zoomIn()}
                    size='small'
                  />
                  <Button
                    icon="pi pi-search-minus"
                    onClick={() => zoomOut()}
                    size='small'
                  />
                  <Button
                    icon="pi pi-refresh"
                    onClick={() => resetTransform()}
                    size='small'
                  />
                </div>
                <MiniMap width={100}>
                  <img src={image.src} style={{ height: `${height - 66}px` }} />
                </MiniMap>
                <div className='flex gap-2 mt-2'>
                  <Button
                    icon="pi pi-chevron-left"
                    onClick={() => setIndex((prev) => (prev > 0 ? prev - 1 : props.images.length - 1))}
                    size='small'
                  />
                  <Button
                    icon="pi pi-chevron-right"
                    onClick={() => setIndex((prev) => (prev < props.images.length - 1 ? prev + 1 : 0))}
                    size='small'
                  />
                </div>
              </div>
              <TransformComponent
                wrapperStyle={{ height: `${height - 66}px`, width: '100%' }}
              >
                <img src={image.src} style={{ height: `${height - 66}px` }} />
              </TransformComponent>
            </>
          )}
        </TransformWrapper>
      </div>
    </>
  );
}