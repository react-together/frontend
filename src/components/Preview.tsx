import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { SplitButton } from 'primereact/splitbutton';
import { Image } from 'primereact/image';
import { DomHandler } from 'primereact/utils';
import React, { useState } from 'react';

interface PreviewProps {
  src: string;
  onClose: () => void;
}

export const Preview: React.FC<PreviewProps> = (props) => {
  const { width } = DomHandler.getViewport();
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
      <div className='absolute top-0 left-0 w-full h-full flex flex-col items-center z-1001'>
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
        <Image
          src={props.src}
          width={`${width * 0.9}px`}
        />
      </div>
    </>
  );
}