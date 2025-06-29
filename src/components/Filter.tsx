import React, { useRef } from "react";
import { ConnectOprtator, FilterItem, FilterKey, FilterOperator } from "../types/FilterItem";
import { Chip } from './Chip';
import { Menu } from 'primereact/menu';

export interface FilterProps {
  item: FilterItem;
  setPayloads: React.Dispatch<React.SetStateAction<FilterItem[]>>;
  showConnect: boolean;
}

export const Filter: React.FC<FilterProps> = (props) => {
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