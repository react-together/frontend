export interface Tag {
  id: number;
  name: string;
  description: string;
  note: string;
  tagType: TagType;
}

export enum TagType {
  CATEGORY = 'category',
  PHOTOGRAPHER = 'photographer',
}