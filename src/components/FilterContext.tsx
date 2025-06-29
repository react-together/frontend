import React, { createContext } from 'react';
import { FilterItem } from '../types/FilterItem';

export const FilterContext = createContext<{
  payloads: FilterItem[];
  setPayloads: React.Dispatch<React.SetStateAction<FilterItem[]>>;
} | null>(null)
