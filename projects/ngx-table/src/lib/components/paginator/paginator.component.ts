import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'ngx-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent implements OnInit {
  private _pageSize = 10;
  private _totalRecords = 100;

  @Output() onPageChange = new EventEmitter<any>(true);
  @Input() activePage = 1;
  @Input()
  set pageSize(pageSize: number) {
    this._pageSize = pageSize;
    this.updatePaginator();
  }

  get pageSize(): number {
    return this._pageSize;
  }
  @Input()
  set totalRecords(totalRecords: number) {
    this._totalRecords = totalRecords;
    this.updatePaginator();
  }

  get totalRecords(): number {
    return this._totalRecords;
  }

  @Input() maxPages = 10;

  pages: number[] = [];

  ngOnInit() {
    this.setPage(this.activePage);
  }

  private setPage(page: number) {
    // call change page function in parent component
    this.onPageChange.emit(page);
  }

  private updatePaginator(): void {
    const pageCount = this.getPageCount();
    this.pages = this.getArrayOfPage(pageCount);
    if (this.activePage !== 1) {
      this.activePage = 1;
      this.setPage(1);
    }
  }

  private getPageCount(): number {
    let totalPage = 0;

    if (this.totalRecords > 0 && this.pageSize > 0) {
      const pageCount = this.totalRecords / this.pageSize;
      const roundedPageCount = Math.floor(pageCount);

      totalPage = roundedPageCount < pageCount ? roundedPageCount + 1 : roundedPageCount;
    }

    return totalPage;
  }

  private getArrayOfPage(pageCount: number): number[] {
    const pageArray: number[] = [];

    if (pageCount > 0) {
      for (let i = 1; i <= pageCount; i++) {
        pageArray.push(i);
      }
    }

    return pageArray;
  }

  onClickPage(pageNumber: number) {
    if (pageNumber < 1) return;
    if (pageNumber > this.pages.length) return;
    this.activePage = pageNumber;
    this.onPageChange.emit(this.activePage);
  }
}
