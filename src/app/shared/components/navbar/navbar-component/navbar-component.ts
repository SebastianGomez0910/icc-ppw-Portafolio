import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Auth, authState, signOut } from '@angular/fire/auth';
import { Router, RouterLink } from "@angular/router";
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-navbar-component',
  imports: [RouterLink, AsyncPipe],
  templateUrl: './navbar-component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {

  isMenuOpen: boolean=false;
  isMobileMenuOpen: boolean=false;

  private auth=inject(Auth);
  private router=inject(Router);

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
