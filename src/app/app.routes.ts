import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home-component/home-component';
import { ProgrammerProfile } from './features/programmers/programmer-profile/programmer-profile/programmer-profile';
import { CardProgrammerComponent } from './shared/components/card-programmer/card-programmer-component/card-programmer-component';

export const routes: Routes = [
    {
        path:'',
        component: HomeComponent,
    },
    {
        path: 'programador/:slug',
        component: ProgrammerProfile
    }
];
