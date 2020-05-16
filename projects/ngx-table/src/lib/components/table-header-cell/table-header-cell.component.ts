import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OrderCriteria } from '../../ngx-table.model';

@Component({
  selector: 'ngx-table-header-cell',
  templateUrl: './table-header-cell.component.html',
  styleUrls: ['./table-header-cell.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableHeaderCellComponent implements OnInit {
  @Input() label: string;
  @Input() order: OrderCriteria = 'no-order';

  @Output() sortClick: EventEmitter<OrderCriteria> = new EventEmitter<OrderCriteria>();

  constructor() {}

  ngOnInit(): void {}

  onSortClick() {
    console.log('onSortClick', { order: this.order });
    switch (this.order) {
      case 'no-order':
        this.sortClick.emit('desc');
        break;
      case 'desc':
        this.sortClick.emit('asc');
        break;
      case 'asc':
        this.sortClick.emit('no-order');
        break;
    }
  }
}
