import { Injectable } from '@angular/core';
import { PaymentsService } from './payments.service';

@Injectable()
export class OrdersService {

  constructor(private paymentService : PaymentsService) { }

  getPaymentsOfOrder(orderId: number) : string{
    return this.paymentService.getPayments(orderId);
  }
}
