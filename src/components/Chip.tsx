import React from 'react';
import { classNames } from 'primereact/utils';
import { Ripple } from 'primereact/ripple';

export interface ChipProps {
  label: string;
  onClick?: () => void;
}

export const Chip: React.FC<ChipProps> = (props) => { 
  return (
    <span
      onClick={props.onClick}
      className={classNames('p-ripple text-gray-400 border-dotted border-color-gray-400 border-1 rounded-4xl px-2 py-1 text-sm m-1', {
        'hover:bg-gray-200 hover:text-gray-600 cursor-pointer': props.onClick,
      })}
    >
      {props.label}
      {props.onClick && (<Ripple />)}
    </span>
  );
}