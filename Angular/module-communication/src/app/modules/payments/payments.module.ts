import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentsComponent } from '../../components/payments/payments.component';
import { PaymentsService } from '../../services/payments.service';



@NgModule({
  declarations: [PaymentsComponent],
  imports: [],
  providers: [PaymentsService]
})
export class PaymentsModule { }
