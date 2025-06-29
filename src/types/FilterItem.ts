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