import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/core/auth/auth.guard';
import { HomeComponent } from 'src/home/components/home/home.component';
import { UserProfileComponent } from 'src/home/components/user-profile/user-profile.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        component: UserProfileComponent
      },
      {
        path: 'some-feature',
        loadChildren: () => import('./../some-feature/some-feature.module')
          .then(m => m.SomeFeatureModule),
        canActivate: [AuthGuard]
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
