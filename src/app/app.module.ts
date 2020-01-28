import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { MatToolbarModule, MatSidenavModule, MatListModule, MatIconModule, MatButtonModule, MatSelectModule, MatInputModule} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { D3Service, D3_DIRECTIVES } from './d3';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { GraphComponent } from './visuals/graph/graph.component';
import { PieChartComponent } from './visuals/pie-chart/pie-chart.component';
import { SHARED_VISUALS } from './visuals/shared';
import { HttpErrorHandler }     from './http-error-handler.service';
import { MessageService }       from './message.service';
import { MessagesComponent }    from './messages/messages.component';

@NgModule({
  declarations: [
    AppComponent,
    GraphComponent,
    PieChartComponent,
    MessagesComponent,
    ...SHARED_VISUALS,
    ...D3_DIRECTIVES
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    MatInputModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    BrowserAnimationsModule
  ],
  providers: [
    D3Service,
    HttpErrorHandler,
    MessageService
],
  bootstrap: [AppComponent]
})
export class AppModule { }
