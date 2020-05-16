export type ElementSize = 'sm' | 'normal' | 'lg';
export type ColumnType = 'text' | 'link' | 'date' | 'number' | 'currency' | 'percent' | 'actions' | string;
export type OrderCriteria = 'asc' | 'desc' | 'no-order';

export interface MapOf<T> {
  [key: string]: T;
}

export interface MapOfArray<T> {
  [key: string]: T[];
}

export interface ColumnTable {
  label: string;
  type: ColumnType;
  display: boolean;
  classes?: string | string[];
  order?: OrderCriteria;
}

export interface ColumnsTable extends MapOf<ColumnTable> {}

export interface RowData {
  key: string;
  row: any;
}

export interface Pagination {
  page: number;
  size: number;
  totalRecords: number;
}

export interface SortCriteria {
  column: string;
  order: OrderCriteria;
}

export interface Pages {
  [page: number]: string[];
}

export interface TableState {
  data: MapOf<any>;
  columns: ColumnsTable;
  pages: Pages;
  sort: SortCriteria[];
  pagination: Pagination;
  enableRowClick: boolean;
  size: ElementSize;
}
