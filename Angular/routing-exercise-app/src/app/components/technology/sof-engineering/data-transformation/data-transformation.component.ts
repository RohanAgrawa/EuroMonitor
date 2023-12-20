import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-data-transformation',
  templateUrl: './data-transformation.component.html',
  styleUrl: './data-transformation.component.css'
})
export class DataTransformationComponent {

  constructor(private route : ActivatedRoute, private router : Router) { 
    
  }

  public onDT1Navigate(): void {
    this.router.navigate(['1'], {relativeTo: this.route});
  }

  public onDT2Navigate(): void {
    this.router.navigate(['2'], {relativeTo: this.route});
  }
  
  public onDT3Navigate(): void {
    this.router.navigate(['3'], {relativeTo: this.route});
  }
}
