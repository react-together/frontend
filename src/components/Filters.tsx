import React, { useState, useMemo, useRef } from 'react';
import { Chip } from './Chip';
import { Menu } from 'primereact/menu';
import { classNames } from 'primereact/utils';

export interface FilterItem {
  id: number;
  label: FilterKey;
  values: string[];
  operator: FilterOperator;
  connect: ConnectOprtator;
  parentId: number | null;
}

export enum FilterKey {
  NONE = 'none',
  REACTIONS = 'reactions',
  AUTHORS = 'authors',
  CATEGORIES = 'categories',
}

export enum FilterOperator {
  IN = 'IN',
  NOT_IN = 'NOT IN',
}

export enum ConnectOprtator {
  AND = 'AND',
  OR = 'OR',
}

export interface FilterProps {
  item: FilterItem;
  setPayloads: React.Dispatch<React.SetStateAction<FilterItem[]>>;
  showConnect: boolean;
}

export const Filter: React.FC<FilterProps> = (props) => {
  // TODO: Deal with values
  // const [values, setValues] = useState<string[]>([]);
  // const [valuesOptions, setValuesOptions] = useState<MenuItem[]>([]);
  const onConnectChange = (value: ConnectOprtator) => {
    props.setPayloads((prev) => {
      const updated = prev.map((item) => {
        if (item.id === props.item.id) {
          return { ...item, connect: value };
        }
        return item;
      });
      return updated;
    });
  }
  const connectMenu = useRef<Menu | null>(null);
  const connectOptions = [
    { label: 'AND', value: ConnectOprtator.AND, command: () => onConnectChange(ConnectOprtator.AND) },
    { label: 'OR', value: ConnectOprtator.OR, command: () => onConnectChange(ConnectOprtator.OR) },
  ]
  const onKeyChange = (value: FilterKey) => {
    props.setPayloads((prev) => {
      const updated = prev.map((item) => {
        if (item.id === props.item.id) {
          return { ...item, label: value };
        }
        return item;
      });
      return updated;
    });
  }
  const keyMenu = useRef<Menu | null>(null);
  const keyOptions = [
    { label: '你的評價', value: FilterKey.REACTIONS, command: () => onKeyChange(FilterKey.REACTIONS) },
    { label: '拍攝者', value: FilterKey.AUTHORS, command: () => onKeyChange(FilterKey.AUTHORS) },
    { label: '類別', value: FilterKey.CATEGORIES, command: () => onKeyChange(FilterKey.CATEGORIES) },
  ]
  const onOperatorChange = (value: FilterOperator) => {
    props.setPayloads((prev) => {
      const updated = prev.map((item) => {
        if (item.id === props.item.id) {
          return { ...item, operator: value };
        }
        return item;
      });
      return updated;
    });
  }
  const operatorMenu = useRef<Menu | null>(null);
  const operatorOptions = [
    { label: '包含', value: FilterOperator.IN, command: () => onOperatorChange(FilterOperator.IN) },
    { label: '不包含', value: FilterOperator.NOT_IN, command: () => onOperatorChange(FilterOperator.NOT_IN) },
  ]
  return (
    <>
      {props.showConnect && (
        <>
          <Chip
            label={props.item.connect}
            onClick={(event) => connectMenu?.current?.toggle(event)}
          />
          <Menu popup ref={connectMenu} model={connectOptions} />
        </>
      )}
      <Chip
        label={keyOptions.find((item) => item.value === props.item.label)?.label ?? ''}
        onClick={(event) => keyMenu?.current?.toggle(event)}
      />
      <Menu popup ref={keyMenu} model={keyOptions} />
      <Chip
        label={operatorOptions.find((item) => item.value === props.item.operator)?.label ?? ''}
        onClick={(event) => operatorMenu?.current?.toggle(event)}
      />
      <Menu popup ref={operatorMenu} model={operatorOptions} />
      <Chip label={props.item.values.join(', ')} />
      <Chip label='x' onClick={() => {
        props.setPayloads((prev) => {
          const removed = prev.filter((item) => item.id !== props.item.id);
          return removed
        });
      }} />
    </>
  )
}

export interface FilterGroupProps {
  payloads: FilterItem[];
  parentId: number | null;
  setPayloads: React.Dispatch<React.SetStateAction<FilterItem[]>>;
  showConnect: boolean;
}

export const FilterGroup: React.FC<FilterGroupProps> = (props) => {
  const parent = useMemo(() => {
    return props.payloads.find((item) => item.id === props.parentId);
  }, [props.payloads, props.parentId]);
  const children = useMemo(() => {
    return props.payloads.filter((item) => item.parentId === props.parentId);
  }, [props.payloads, props.parentId]);
  const plusMenu = useRef<Menu | null>(null);
  const plusOptions = [
    { label: '新增 Filter', command: () => {
      props.setPayloads((prev) => {
        const max = Math.max(...prev.map((item) => item.id), 0);
        const newItem: FilterItem = {
          id: max + 1,
          parentId: props.parentId,
          label: FilterKey.REACTIONS,
          operator: FilterOperator.IN,
          connect: ConnectOprtator.AND,
          values: []
        }
        return [...prev, newItem];
      });
    }},
    { label: '新增 FilterGroup', command: () => {
      props.setPayloads((prev) => {
        const maxId = Math.max(...prev.map((item) => item.id), 0);
        const newParentItem: FilterItem = {
          id: maxId + 1,
          parentId: props.parentId,
          label: FilterKey.NONE,
          operator: FilterOperator.IN,
          connect: ConnectOprtator.AND,
          values: []
        }
        const newItem: FilterItem = {
          id: maxId + 2,
          parentId: maxId + 1,
          label: FilterKey.REACTIONS,
          operator: FilterOperator.IN,
          connect: ConnectOprtator.AND,
          values: []
        }
        return [...prev, newParentItem, newItem];
      });
    } },
  ]
  const onConnectChange = (value: ConnectOprtator) => {
    props.setPayloads((prev) => {
      const updated = prev.map((item) => {
        if (item.id === parent?.id) {
          return { ...item, connect: value };
        }
        return item;
      });
      return updated;
    });
  }
  const connectMenu = useRef<Menu | null>(null);
  const connectOptions = [
    { label: 'AND', value: ConnectOprtator.AND, command: () => onConnectChange(ConnectOprtator.AND) },
    { label: 'OR', value: ConnectOprtator.OR, command: () => onConnectChange(ConnectOprtator.OR) },
  ]
  return (
    <div className='flex flex-row flex-wrap items-baseline'>
      {props.showConnect && parent && (
        <>
          <Chip
            label={parent.connect}
            onClick={(event) => connectMenu?.current?.toggle(event)}
          />
          <Menu popup ref={connectMenu} model={connectOptions} />
        </>
      )}
      <div className={classNames('flex flex-row flex-wrap items-baseline', {
        'border-dotted border-color-gray-400 border-1 rounded-4xl p-1 items-baseline': children.length > 0 && props.parentId !== 0,
      })}>
        {children.map((item, index) => {
          if (item.label === FilterKey.NONE) {
            return (
              <React.Fragment key={index}>
                <FilterGroup showConnect={index !== 0} payloads={props.payloads} setPayloads={props.setPayloads} parentId={item.id} key={index} />
              </React.Fragment>
          );
          }
          return (
            <Filter showConnect={index !== 0} item={item} setPayloads={props.setPayloads} key={index} />
          )
        })}
        {children.length > 0 && (
          <span className='text-gray-400'>|</span>
        )}
        <Chip label='+' onClick={(event) => plusMenu?.current?.toggle(event)} />
        <Menu popup ref={plusMenu} model={plusOptions} />
        {children.length > 0 && (
          <Chip label='x' onClick={() => {
            const removed = props.payloads
              .filter((item) => item.id !== props.parentId)
              .filter((item) => item.parentId !== props.parentId);
            props.setPayloads(removed);
          }} />
        )}
      </div>
    </div>
  )
}

export const Filters: React.FC = () => {
  const [payloads, setPayloads] = useState<FilterItem[]>([{
    id: 0,
    parentId: null,
    label: FilterKey.NONE,
    operator: FilterOperator.IN,
    connect: ConnectOprtator.AND,
    values: []
  }]);
  return (
    <div className='p-1 flex flex-row flex-wrap items-baseline bg-white'>
      <Chip label='篩選條件' />
      <FilterGroup showConnect={false} payloads={payloads} setPayloads={setPayloads} parentId={0} />
    </div>
  );
}