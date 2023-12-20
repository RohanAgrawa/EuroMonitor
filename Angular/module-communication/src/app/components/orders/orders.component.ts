import { Component } from '@angular/core';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent {

  public payment: string;
  
  constructor(private orderService : OrdersService){}

  public getPayments() {
    this.payment = this.orderService.getPaymentsOfOrder(1);
  }
}
