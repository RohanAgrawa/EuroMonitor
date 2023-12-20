import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-buisness',
  templateUrl: './buisness.component.html',
  styleUrl: './buisness.component.css'
})
export class BuisnessComponent {

  constructor(private route : ActivatedRoute, private router : Router) { 
    
  }

  public onMarketingNavigate(): void {
    this.router.navigate(['marketing'], {relativeTo : this.route});
  }

  public onSalesNavigate(): void {

    this.router.navigate(['sales'], {relativeTo : this.route});
  }

  public onAccountsNavigate(): void {
    this.router.navigate(['accounts'], {relativeTo : this.route});
  }

}
