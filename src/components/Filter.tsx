import React, { useCallback, useMemo, useRef } from "react";
import { ConnectOprtator, FilterItem, FilterKey, FilterOperator } from "../types/FilterItem";
import { Chip } from './Chip';
import { Menu } from 'primereact/menu';
import { gql, useQuery } from "@apollo/client";
import { Tag } from "../types/Tag";

const GET_TAGS = gql`
query GetTags {
  tag {
    nodes {
      id,
      name,
      description,
      note,
      tagType
    }
  }
}
`;

export interface FilterProps {
  item: FilterItem;
  setPayloads: React.Dispatch<React.SetStateAction<FilterItem[]>>;
  showConnect: boolean;
}

export const Filter: React.FC<FilterProps> = (props) => {
  const { data: raw, loading, error } = useQuery(GET_TAGS);

  const data = useMemo(() => {
    if (raw?.tag?.nodes) {
      return raw.tag.nodes.filter((item: Tag) => item.description !== '測試');
    }
    return [];
  }, [raw]);

  const photographers = useMemo(() => {
    return data.filter((item: Tag) => item.tagType === 'photographer')
  }, [data]);

  const categories = useMemo(() => {
    return data.filter((item: Tag) => item.tagType === 'category')
  }, [data]);

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
          return { ...item, label: value, values: [] };
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
  const onValueChange = (value: string) => {
    props.setPayloads((prev) => {
      const updated = prev.map((item) => {
        if (item.id === props.item.id) {
          if (item.values.includes(value)) {
            const values = item.values.filter((v) => v !== value);
            return { ...item, values };
          } else {
            const values =item.values.concat(value);
            return { ...item, values };
          }
        }
        return item;
      });
      return updated;
    });
  }
  const makeValueeOption = useCallback((value: string, selecteds: string[]) => {
    return { label: value, icon: selecteds.includes(value) ? 'pi pi-check' : '', value, command: () => onValueChange(value) };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const valueMenu = useRef<Menu | null>(null);
  const valueOptions = useMemo(() => {
    switch (props.item.label) {
      case FilterKey.REACTIONS:
        return ['正向', '負向'].map((item) => makeValueeOption(item, props.item.values));
      case FilterKey.AUTHORS:
        return photographers.map((item: Tag) => makeValueeOption(item.name, props.item.values));
      case FilterKey.CATEGORIES:
        return categories.map((item: Tag) => makeValueeOption(item.name, props.item.values));
      default:
        return [];
    }
  }, [props.item, photographers, categories, makeValueeOption]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

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
      <Chip
        label={props.item.values.join(', ')}
        onClick={(event) => valueMenu?.current?.toggle(event)}
      />
      <Menu popup ref={valueMenu} model={valueOptions} />
      <Chip label='x' onClick={() => {
        props.setPayloads((prev) => {
          const removed = prev.filter((item) => item.id !== props.item.id);
          return removed
        });
      }} />
    </>
  )
}