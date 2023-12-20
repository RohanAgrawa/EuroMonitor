import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersComponent } from '../../components/orders/orders.component';
import { OrdersRoutingModule } from './orders-routing.module';
import { PaymentsService } from '../../services/payments.service';
import { OrdersService } from '../../services/orders.service';



@NgModule({
  declarations: [OrdersComponent],
  imports: [OrdersRoutingModule],
  providers: [PaymentsService, OrdersService]
})
export class OrdersModule { }
