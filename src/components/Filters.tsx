import React, { useContext } from 'react';
import { Chip } from './Chip';
import { FilterGroup } from './FilterGroup';
import { FilterContext } from './FilterContext';

export const Filters: React.FC = () => {
  const context = useContext(FilterContext);
  if (context === null) {
    throw new Error('Filters must be used within a FilterContext provider');
  }
  const { payloads, setPayloads } = context;
  return (
    <div className='p-1 flex flex-row flex-wrap items-baseline bg-white'>
      <Chip label='篩選條件' />
      <FilterGroup showConnect={false} payloads={payloads} setPayloads={setPayloads} parentId={0} />
    </div>
  );
}
