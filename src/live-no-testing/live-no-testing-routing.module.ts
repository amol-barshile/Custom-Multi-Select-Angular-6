import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LiveNoTestingComponent } from './live-no-testing.component';
import { extract } from '@app/core';
import { Shell } from '@app/shell/shell.service';

// const routes: Routes = [];
const routes: Routes = [
  Shell.childRoutes([
    {
      path: 'live-no-testing',
      component: LiveNoTestingComponent,
      data: { title: extract('Live') }
    }
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LiveNoTestingRoutingModule {}
