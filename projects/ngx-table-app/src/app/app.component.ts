import { Component } from '@angular/core';
import { COLUMNS, EXAMPLE_DATA } from './model';
import { ColumnsTable } from '../../../ngx-table/src/lib/ngx-table.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ngx-table-app';
  data: any[] = EXAMPLE_DATA;
  columns: ColumnsTable = COLUMNS;
}
