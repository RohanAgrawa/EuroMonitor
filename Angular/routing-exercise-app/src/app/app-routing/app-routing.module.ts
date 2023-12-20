import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResearchDepartmentComponent } from '../components/research-department/research-department.component';
import { CatalystComponent } from '../components/research-department/catalyst/catalyst.component';
import { OneResearchComponent } from '../components/research-department/one-research/one-research.component';
import { BuisnessComponent } from '../components/buisness/buisness.component';
import { AccountsComponent } from '../components/buisness/accounts/accounts.component';
import { SalesComponent } from '../components/buisness/sales/sales.component';
import { MarketingComponent } from '../components/buisness/marketing/marketing.component';
import { TechnologyComponent } from '../components/technology/technology.component';
import { SofEngineeringComponent } from '../components/technology/sof-engineering/sof-engineering.component';
import { DataTransformationComponent } from '../components/technology/sof-engineering/data-transformation/data-transformation.component';
import { PassportComponent } from '../components/technology/sof-engineering/passport/passport.component';
import { IssacComponent } from '../components/technology/sof-engineering/issac/issac.component';
import { EcomComponent } from '../components/technology/sof-engineering/ecom/ecom.component';
import { Dt1Component } from '../components/technology/sof-engineering/data-transformation/dt-1/dt-1.component';
import { Dt2Component } from '../components/technology/sof-engineering/data-transformation/dt-2/dt-2.component';
import { Dt3Component } from '../components/technology/sof-engineering/data-transformation/dt-3/dt-3.component';
import { Pp1Component } from '../components/technology/sof-engineering/passport/pp1/pp1.component';
import { Pp2Component } from '../components/technology/sof-engineering/passport/pp2/pp2.component';
import { Pp3Component } from '../components/technology/sof-engineering/passport/pp3/pp3.component';
import { Pp4Component } from '../components/technology/sof-engineering/passport/pp4/pp4.component';
import { PublicationComponent } from '../components/technology/publication/publication.component';
import { CloudEngineeringComponent } from '../components/technology/cloud-engineering/cloud-engineering.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/research-department', pathMatch: 'full'},
  {
    path: 'research-department', component: ResearchDepartmentComponent, title: 'Research Department', children: [
      { path: 'catalyst', component: CatalystComponent, title: 'Catalyst' },
      { path : 'one-research', component: OneResearchComponent, title: 'One Research' },
    ]
  },
  {
    path: 'buisness', component: BuisnessComponent, title: 'Buisness', children: [
      { path: 'marketing', component: MarketingComponent, title: 'Marketing' },
      { path: 'sales', component: SalesComponent, title: 'Sales' },
      { path : 'accounts', component: AccountsComponent, title: 'Accounts' },
    ]
  },
  {
    path: 'technology', component: TechnologyComponent, title: 'Technology', children: [
      {
        path: 'software-eng', component: SofEngineeringComponent, title: 'Software', children: [
          {
            path: 'data-transformation', component: DataTransformationComponent, title: 'Data Transformation', children: [
              { path: '1', component: Dt1Component, title: 'Data Transformation1' },
              {path : '2', component: Dt2Component, title: 'Data Transformation2'},
              {path : '3', component: Dt3Component, title: 'Data Transformation3'}
          ] },
          {
            path: 'passport', component: PassportComponent, title: 'Passport', children: [
              { path: '1', component: Pp1Component, title: 'Passport1' },
              { path: '2', component: Pp2Component, title: 'Passport2' },
              { path: '3', component: Pp3Component, title: 'Passport3' },
              {path : '4', component: Pp4Component, title: 'Passport4'}
          ]},
          { path: 'issac', component: IssacComponent, title: 'Issac' },
          { path : 'e-com', component: EcomComponent, title: 'E-Com' }
        ]
      },
      
      { path: 'publication', component: PublicationComponent, title: 'Publication' },
      { path : 'cloud-engineering', component : CloudEngineeringComponent, title: 'Cloud Engineering'} 
  ]},
]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports : [RouterModule]
})
export class AppRoutingModule { }
