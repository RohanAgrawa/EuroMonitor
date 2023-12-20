import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-passport',
  templateUrl: './passport.component.html',
  styleUrl: './passport.component.css'
})
export class PassportComponent {

  constructor(private route : ActivatedRoute, private router : Router) { 
    
  }

  public onPP1Navigate(): void {
    this.router.navigate(['1'], {relativeTo: this.route});
  }

  public onPP2Navigate(): void {
    this.router.navigate(['2'], {relativeTo: this.route});
  }

  public onPP3Navigate(): void {
    this.router.navigate(['3'], {relativeTo: this.route});
  }

  public onPP4Navigate(): void {
    this.router.navigate(['4'], {relativeTo: this.route});
  }
}
