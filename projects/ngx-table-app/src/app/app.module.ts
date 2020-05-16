import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgxTableModule } from '../../../ngx-table/src/lib/ngx-table.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, NgxTableModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
