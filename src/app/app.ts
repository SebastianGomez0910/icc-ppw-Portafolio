import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/components/navbar/navbar-component/navbar-component';
import { FooterComponent } from "./shared/components/footer/footer-component/footer-component";
import { HeroComponent } from './shared/components/hero-section/hero-component/hero-component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, FooterComponent,HeroComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('portafolio-Personal');
}
