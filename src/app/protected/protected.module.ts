import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProtectedRoutingModule } from './protected-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';

import { NgxQRCodeModule } from 'ngx-qrcode2';


@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    ProtectedRoutingModule,
    NgxQRCodeModule
  ]
})
export class ProtectedModule { }
