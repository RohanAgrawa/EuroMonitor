import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-technology',
  templateUrl: './technology.component.html',
  styleUrl: './technology.component.css'
})
export class TechnologyComponent {

  constructor(private route : ActivatedRoute, private router : Router) { 
    
  }

  public onSoftwareEngineeringNavigate(): void {
    this.router.navigate(['software-eng'], {relativeTo : this.route});
  }

  public onPublicationNavigate(): void {
    this.router.navigate(['publication'], {relativeTo : this.route});
  }

  public onCloudEngineeringNavigate(): void {
    this.router.navigate(['cloud-engineering'], {relativeTo : this.route});
  }
}
