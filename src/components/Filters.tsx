import React, { useState } from 'react';
import { Chip } from './Chip';
import { FilterGroup } from './FilterGroup';
import { ConnectOprtator, FilterItem, FilterKey, FilterOperator } from '../types/FilterItem';

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
