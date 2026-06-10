import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home-component/home-component';
import { ProgrammerProfile } from './features/programmers/programmer-profile/programmer-profile/programmer-profile';
import { LoginComponent } from './features/auth/login/login-component/login-component';
import { RegisterComponent } from './features/auth/register/register-component/register-component';
import { guardsGuard } from './features/auth/guard/guards-guard';
import { guestGuardGuard } from './features/auth/guard/guest.guard-guard';
import { ProjectDetail } from './features/projects/project-detail/project-detail';
import { ContactoComponent } from './shared/components/card-contacto/contacto-component/card-contacto';
import { MisSolicitudes } from './features/requests/my-requests/mis-solicitudes/mis-solicitudes';
import { SolicitudesRecibidas } from './features/programmers/programmer-list/solicitudes-recibidas/solicitudes-recibidas';

export const routes: Routes = [
    {
        path:'',
        component: HomeComponent,
    },
    {
        path: 'programador/:slug',
        component: ProgrammerProfile
    },
    {
        path: 'proyecto/:slug',
        component: ProjectDetail
    },
    {
        path:'login',
        component: LoginComponent,
        canActivate: [guestGuardGuard]
    },
    {
        path:'registro',
        component: RegisterComponent,
        canActivate: [guestGuardGuard]
    },
    {
        path:'mis-solicitudes',
        component: MisSolicitudes,
        canActivate: [guardsGuard]
    },
    {
        path:'solicitudes-recibidas',
        component:SolicitudesRecibidas,
        canActivate: [guardsGuard]
    }
];
