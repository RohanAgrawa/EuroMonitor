import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sof-engineering',
  templateUrl: './sof-engineering.component.html',
  styleUrl: './sof-engineering.component.css'
})
export class SofEngineeringComponent {

  constructor(private route : ActivatedRoute, private router : Router) { 
    
  }

  public onDataTransformationNavigate(): void {
    this.router.navigate(['data-transformation'], {relativeTo: this.route});
  }

  public onPassportNavigate(): void {
    this.router.navigate(['passport'], {relativeTo: this.route});
  }

  public onIssacNavigate(): void {
    this.router.navigate(['issac'], {relativeTo: this.route});
  }

  public onEcomNavigate(): void {
    this.router.navigate(['e-com'], {relativeTo: this.route});
  }


}
