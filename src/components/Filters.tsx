import React, { useState, useCallback, useMemo, useRef } from 'react';
import { Chip } from './Chip';
import { Menu } from 'primereact/menu';
import { classNames } from 'primereact/utils';
import { DomHandler } from 'primereact/utils';

export interface FilterItem {
  id: number;
  label: FilterKey;
  values: string[];
  operator: FilterOperator;
  connect: ConnectOprtator;
  parentId: number | null;
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
  const handleShow = useCallback(() => {
    DomHandler.blockBodyScroll();
  }, []);
  const handleHide = useCallback(() => {
    DomHandler.unblockBodyScroll();
  }, []);
  return (
    <>
      {props.showConnect && (
        <>
          <Chip
            label={props.item.connect}
            onClick={(event) => connectMenu?.current?.toggle(event)}
          />
          <Menu popup ref={connectMenu} model={connectOptions} onShow={handleShow} onHide={handleHide} />
        </>
      )}
      <Chip
        label={keyOptions.find((item) => item.value === props.item.label)?.label ?? ''}
        onClick={(event) => keyMenu?.current?.toggle(event)}
      />
      <Menu popup ref={keyMenu} model={keyOptions} onShow={handleShow} onHide={handleHide} />
      <Chip
        label={operatorOptions.find((item) => item.value === props.item.operator)?.label ?? ''}
        onClick={(event) => operatorMenu?.current?.toggle(event)}
      />
      <Menu popup ref={operatorMenu} model={operatorOptions} onShow={handleShow} onHide={handleHide} />
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
}

export const FilterGroup: React.FC<FilterGroupProps> = (props) => {
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
    } },
  ]
  const handleShow = useCallback(() => {
    DomHandler.blockBodyScroll();
  }, []);
  const handleHide = useCallback(() => {
    DomHandler.unblockBodyScroll();
  }, []);
  return (
    <div className={classNames('flex flex-row flex-wrap', {
      'border-dotted border-color-gray-400 border-1 rounded-4xl p-1 items-baseline': children.length > 0
    })}>
      {children.map((item, index) => {
        return (
          <React.Fragment key={index}>
            <Filter showConnect={index !== 0} item={item} setPayloads={props.setPayloads} />
            {(children.map((child) => child.parentId).includes(item.id)) && (<FilterGroup payloads={children} setPayloads={props.setPayloads} parentId={item.id} key={index} />)}
          </React.Fragment>
        )
      })}
      {children.length > 0 && (
        <>
          <span className='text-gray-400'>|</span>
          <Chip label='+' onClick={(event) => plusMenu?.current?.toggle(event)} />
          <Menu popup ref={plusMenu} model={plusOptions} onShow={handleShow} onHide={handleHide} />
          <Chip label='x' onClick={() => {
            const removed = props.payloads.filter((item) => item.parentId !== props.parentId);
            props.setPayloads(removed);
          }} />
        </>
      )}
    </div>
  )
}

export const Filters: React.FC = () => {
  const [payloads, setPayloads] = useState<FilterItem[]>([]);
  return (
    <div className='p-1 flex flex-row flex-wrap items-baseline bg-white'>
      <Chip label='篩選條件' />
      <FilterGroup payloads={payloads} setPayloads={setPayloads} parentId={null} />
      {payloads.length === 0 && (
        <Chip label='+' onClick={() => {
          setPayloads([{
            id: 0,
            parentId: null,
            label: FilterKey.REACTIONS,
            operator: FilterOperator.IN,
            connect: ConnectOprtator.AND,
            values: []
          }]);
        }} />
      )}
      <Chip label='reset' onClick={useCallback(() => {
        setPayloads([]);
      }, [])} />
    </div>
  );
}