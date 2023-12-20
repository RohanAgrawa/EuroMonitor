import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-research-department',
  templateUrl: './research-department.component.html',
  styleUrl: './research-department.component.css'
})
export class ResearchDepartmentComponent {

  constructor(private route : ActivatedRoute, private router : Router) { 
    
  }

  public onCatalystNavigate() : void{
    this.router.navigate(['catalyst'], {relativeTo : this.route});
  }

  public onOneResearchNavigate() : void{
    this.router.navigate(['one-research'], {relativeTo : this.route});
  }
}
