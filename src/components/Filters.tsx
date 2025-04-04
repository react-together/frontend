import React, { useState, useCallback, useRef } from 'react';
import { Chip } from './Chip';
import { Menu } from 'primereact/menu';

export interface FilterItem {
  label: FilterKey;
  values: string[];
  operator: FilterOperator;
}

export enum FilterKey {
  REACTIONS = 'reactions',
  AUTHORS = 'authors',
  CATEGORIES = 'categories',
}

export enum FilterOperator {
  IN = 'IN',
  NOT_IN = 'NOT IN',
}

export interface BracketItem {
  items: Array<FilterItem|BracketItem>;
  operator: BracketOperator;
}

export enum BracketOperator {
  AND = 'AND',
  OR = 'OR',
}

export const Filter: React.FC<FilterItem> = (props) => {
  const keyMenu = useRef(null);
  const keyOptions = [
    { label: '你的評價', value: FilterKey.REACTIONS },
    { label: '拍攝者', value: FilterKey.AUTHORS },
    { label: '類別', value: FilterKey.CATEGORIES },
  ]
  return (
    <>
      <Chip
        label={props.label}
      />
      <Menu popup ref={keyMenu} model={keyOptions} />
      <Chip label={props.operator} />
      <Chip label={props.values.join(', ')} />
    </>
  )
}

export const FilterGroup: React.FC<BracketItem> = (props) => {
  return (
    <>
      {props.items.map((item, index) => {
        if ('items' in item) {
          return (<FilterGroup {...item} key={index} />)
        }
        return (<Filter {...item} key={index} />)
      })}
    </>
  )
}

export const Filters: React.FC = () => {
  const [payloads, setPayloads] = useState<BracketItem>({
    items: [],
    operator: BracketOperator.AND,
  });
  return (
    <div className='m-1 flex flex-row flex-wrap'>
      <Chip label='篩選條件' />
      <FilterGroup {...payloads} />
      {payloads.items.length === 0 && (
        <Chip label='+' onClick={() => {
          setPayloads((prev) => ({ ...prev, items: [{ label: FilterKey.REACTIONS, operator: FilterOperator.IN, values: [] }] }));
        }} />
      )}
      <Chip label='reset' onClick={useCallback(() => {
        setPayloads({
          items: [],
          operator: BracketOperator.AND,
        });
      }, [])} />
    </div>
  );
}