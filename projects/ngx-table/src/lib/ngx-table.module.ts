import { NgModule } from '@angular/core';
import { NgxTableComponent } from './ngx-table.component';
import { CdkTableModule } from '@angular/cdk/table';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from './components/components.module';

@NgModule({
  declarations: [NgxTableComponent],
  imports: [CommonModule, CdkTableModule, ComponentsModule],
  exports: [NgxTableComponent]
})
export class NgxTableModule {}
