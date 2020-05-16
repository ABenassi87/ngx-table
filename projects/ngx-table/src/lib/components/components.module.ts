import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginatorComponent } from './paginator/paginator.component';
import { TableHeaderCellComponent } from './table-header-cell/table-header-cell.component';

@NgModule({
  declarations: [PaginatorComponent, TableHeaderCellComponent],
  imports: [CommonModule],
  exports: [PaginatorComponent, TableHeaderCellComponent]
})
export class ComponentsModule {}
