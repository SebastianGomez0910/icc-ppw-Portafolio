import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-navbar-component',
  imports: [RouterLink],
  templateUrl: './navbar-component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {

  isMenuOpen: boolean=false;
  isMobileMenuOpen: boolean=false;

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
}
