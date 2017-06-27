import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule }    from '@angular/http';
import { FormsModule }   from '@angular/forms';

import { AppComponent } from './app.component';
import { ServerRequestService } from './services/server-request.service';
import { MyDateRangePickerModule } from 'mydaterangepicker';

@NgModule({
  declarations: [
    AppComponent    
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    MyDateRangePickerModule
  ],
  providers: [ServerRequestService],
  bootstrap: [AppComponent]
})
export class AppModule { }
