import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { ColumnsTable, ElementSize, MapOf, OrderCriteria, Pages, Pagination, RowData, SortCriteria } from './ngx-table.model';
import { distinctUntilChanged, distinctUntilKeyChanged, map } from 'rxjs/operators';
import { NgxTableService } from './ngx-table.service';

@Component({
  selector: 'ngx-table',
  templateUrl: `./ngx-table.component.html`,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgxTableComponent implements OnInit {
  private _data: BehaviorSubject<MapOf<any>> = new BehaviorSubject<MapOf<any>>({});
  data$: Observable<MapOf<any>> = this._data.pipe(distinctUntilChanged());

  private _columns: BehaviorSubject<ColumnsTable> = new BehaviorSubject<ColumnsTable>({});
  columns$: Observable<ColumnsTable> = this._columns.pipe(distinctUntilChanged());

  headerKeys$: Observable<string[]> = this.columns$.pipe(
    map((columns) =>
      Object.keys(columns)
        .filter((columnKey) => columns[columnKey].display)
        .map((columnKey) => columnKey)
    )
  );

  private _pagination: BehaviorSubject<Pagination> = new BehaviorSubject<Pagination>({
    page: 1,
    size: 15,
    totalRecords: 0
  });
  pagination$: Observable<Pagination> = this._pagination.pipe(distinctUntilChanged());

  currentPage$: Observable<number> = this.pagination$.pipe(
    distinctUntilKeyChanged('page'),
    map((pagination: Pagination) => {
      console.log('Page change', pagination);
      return pagination.page;
    })
  );

  currentPageSize$: Observable<number> = this.pagination$.pipe(
    distinctUntilChanged((prev, curr) => prev.size === curr.size),
    map((pagination: Pagination) => pagination.size),
    distinctUntilChanged()
  );

  private _pages: BehaviorSubject<Pages> = new BehaviorSubject<Pages>({});
  pages$: Observable<Pages> = this._pages.pipe(distinctUntilChanged());

  currentPageIds$: Observable<string[]> = combineLatest([this.pages$, this.currentPage$]).pipe(
    map(([pages, currentPage]) => {
      console.log('currentPageIds', { pages, currentPage });
      if (!!pages[currentPage]) {
        return pages[currentPage];
      }

      return [];
    }),
    distinctUntilChanged()
  );

  calculatePagesSub = combineLatest([this.data$, this.currentPageSize$])
    .pipe(
      distinctUntilChanged(),
      map(([data, pageSize]) => {
        console.log('calculatePagesSub', { data, pageSize });
        const keys: string[] = Object.keys(data);
        const pages: Pages = this.ngxTableService.getPages(keys, pageSize);
        return pages;
      })
    )
    .subscribe((pages: Pages) => this._pages.next(pages));

  updateTotalRecordsSub = combineLatest([this.data$, this.currentPageSize$])
    .pipe(
      distinctUntilChanged(),
      map(
        ([data, size]): Pagination => {
          console.log('updateTotalRecordsSub', { data, size });
          const totalRecords = Object.keys(data).length;

          return {
            page: 1,
            size,
            totalRecords
          };
        }
      )
    )
    .subscribe((pagination) => (this.pagination = pagination));

  tableData$: Observable<any[]> = combineLatest([this.data$, this.currentPageIds$]).pipe(
    map(([data, ids]) => {
      console.log('Table Data', { data, ids });
      return this.ngxTableService.getArrayOf(data, ids);
    })
  );

  private _sort: BehaviorSubject<MapOf<OrderCriteria>> = new BehaviorSubject<MapOf<OrderCriteria>>({});
  sort$: Observable<MapOf<OrderCriteria>> = this._sort.pipe(distinctUntilChanged());

  sortChangeSub = this.columns$
    .pipe(
      map((columns: ColumnsTable) => {
        return Object.keys(columns).reduce((sort: MapOf<OrderCriteria>, key) => {
          sort[key] = columns[key]?.order;

          return sort;
        }, {});
      })
    )
    .subscribe((sort: MapOf<OrderCriteria>) => (this.sort = sort));

  private _enableRowClick: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  enableRowClick$: Observable<boolean> = this._enableRowClick.pipe(distinctUntilChanged());

  private _size: BehaviorSubject<ElementSize> = new BehaviorSubject<ElementSize>('normal');
  size$: Observable<ElementSize> = this._size.pipe(distinctUntilChanged());

  @Input()
  set data(arrayData: any[]) {
    console.log('Array Data', arrayData);
    const data: MapOf<any> = this.ngxTableService.getMapOf(arrayData);
    this._data.next({ ...data });
  }

  get data(): any[] {
    const dataMap = this._data.getValue();
    return this.ngxTableService.getArrayOf(dataMap, Object.keys(dataMap));
  }
  @Input()
  set columns(columns: ColumnsTable) {
    console.log('columns Data', columns);
    this._columns.next({ ...columns });
  }
  get columns(): ColumnsTable {
    return this._columns.getValue();
  }

  @Input()
  set pagination(pagination: Pagination) {
    this._pagination.next({ ...pagination });
  }

  get pagination(): Pagination {
    return this._pagination.getValue();
  }

  @Input()
  set sort(sort: MapOf<OrderCriteria>) {
    this._sort.next({ ...sort });
  }

  get sort(): MapOf<OrderCriteria> {
    return this._sort.getValue();
  }

  @Input()
  set enableRowClick(enableRowClick: boolean) {
    this._enableRowClick.next(enableRowClick);
  }

  get enableRowClick(): boolean {
    return this._enableRowClick.getValue();
  }

  @Input()
  set size(size: ElementSize) {
    this._size.next(size);
  }

  get size(): ElementSize {
    return this._size.getValue();
  }

  @Output() columnTextClick: EventEmitter<RowData> = new EventEmitter<RowData>();
  @Output() rowClick: EventEmitter<RowData> = new EventEmitter<RowData>();

  constructor(private ngxTableService: NgxTableService) {}

  ngOnInit(): void {}

  trackData(index: number, row: any) {
    return row.id ?? index;
  }

  onColumnTextClick(key: string, row: any) {
    this.columnTextClick.emit({ key, row });
  }

  onRowClick(row: any) {
    if (this.enableRowClick) {
      this.rowClick.emit(row);
    }
  }

  changePage(page: number) {
    console.log('page', page);
    let pagination: Pagination = this.pagination;
    pagination = { ...pagination, page };
    this.pagination = pagination;
  }

  sortRecords(key: string, order: OrderCriteria) {
    console.log('sort', { key, order });
    const columns: ColumnsTable = { ...this.columns };
    columns[key].order = order;
    this.columns = columns;
  }
}
