import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LiveNoTestingRoutingModule } from './live-no-testing-routing.module';
import { LiveNoTestingComponent } from './live-no-testing.component';
import { SharedModule } from '@app/shared';

@NgModule({
  declarations: [LiveNoTestingComponent],
  imports: [CommonModule, LiveNoTestingRoutingModule, FormsModule, ReactiveFormsModule, SharedModule]
})
export class LiveNoTestingModule {}
