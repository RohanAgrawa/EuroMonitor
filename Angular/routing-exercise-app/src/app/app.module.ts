import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ResearchDepartmentComponent } from './components/research-department/research-department.component';
import { CatalystComponent } from './components/research-department/catalyst/catalyst.component';
import { OneResearchComponent } from './components/research-department/one-research/one-research.component';
import { BuisnessComponent } from './components/buisness/buisness.component';
import { TechnologyComponent } from './components/technology/technology.component';
import { SofEngineeringComponent } from './components/technology/sof-engineering/sof-engineering.component';
import { PublicationComponent } from './components/technology/publication/publication.component';
import { CloudEngineeringComponent } from './components/technology/cloud-engineering/cloud-engineering.component';
import { DataTransformationComponent } from './components/technology/sof-engineering/data-transformation/data-transformation.component';
import { PassportComponent } from './components/technology/sof-engineering/passport/passport.component';
import { Dt1Component } from './components/technology/sof-engineering/data-transformation/dt-1/dt-1.component';
import { Dt2Component } from './components/technology/sof-engineering/data-transformation/dt-2/dt-2.component';
import { Dt3Component } from './components/technology/sof-engineering/data-transformation/dt-3/dt-3.component';
import { Pp1Component } from './components/technology/sof-engineering/passport/pp1/pp1.component';
import { Pp2Component } from './components/technology/sof-engineering/passport/pp2/pp2.component';
import { Pp3Component } from './components/technology/sof-engineering/passport/pp3/pp3.component';
import { Pp4Component } from './components/technology/sof-engineering/passport/pp4/pp4.component';
import { IssacComponent } from './components/technology/sof-engineering/issac/issac.component';
import { EcomComponent } from './components/technology/sof-engineering/ecom/ecom.component';
import { AppRoutingModule } from './app-routing/app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    ResearchDepartmentComponent,
    CatalystComponent,
    OneResearchComponent,
    BuisnessComponent,
    TechnologyComponent,
    SofEngineeringComponent,
    PublicationComponent,
    CloudEngineeringComponent,
    DataTransformationComponent,
    PassportComponent,
    Dt1Component,
    Dt2Component,
    Dt3Component,
    Pp1Component,
    Pp2Component,
    Pp3Component,
    Pp4Component,
    IssacComponent,
    EcomComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
