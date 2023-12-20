import { Injectable } from '@angular/core';


export class PaymentsService {

  constructor() { }

  public getPayments(orderId: number) : string{
    
    return "payments for order " + orderId;
  }
}
