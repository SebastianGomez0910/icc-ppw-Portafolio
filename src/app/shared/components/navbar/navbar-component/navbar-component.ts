import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Auth, authState, signOut } from '@angular/fire/auth';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive, RouterModule } from "@angular/router";
import { AsyncPipe, CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-navbar-component',
  imports: [RouterLink, RouterLinkActive, AsyncPipe, RouterModule, CommonModule],
  templateUrl: './navbar-component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {

  private authService=inject(AuthService);

  isMenuOpen: boolean=false;
  isMobileMenuOpen: boolean=false;

  private auth=inject(Auth);
  private router=inject(Router);
  private route =inject(ActivatedRoute);

  isLoggedIn=this.authService.isLoggedIn;
  isProgrammer=this.authService.isProgrammer;

  fragmentoActivo=toSignal(this.route.fragment, {initialValue:''});

  user$=authState(this.auth);

  toggleMenu(){
    this.isMenuOpen=!this.isMenuOpen;
  }

  toggleMobileMenu(){
    this.isMobileMenuOpen=!this.isMobileMenuOpen
  }

  closeMenus(){
    this.isMenuOpen=false;
    this.isMobileMenuOpen=false;
  }

  async logout(){
    try{
      await signOut(this.auth);
      this.router.navigate(['/login']);
    }
    catch(error){
      console.error('Error al cerrar sesión:' ,error)
    }
  }
}
