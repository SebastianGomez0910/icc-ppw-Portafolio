import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Auth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from '@angular/fire/auth';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-login-component',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login-component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {

  private fb = inject(FormBuilder);
  private authService = inject(AuthService); 
  private router = inject(Router);

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  async onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      try {
        await this.authService.login(email!, password!);
        
        this.router.navigate(['/']);
      } catch (error: any) {
        alert('Credenciales incorrectas. Intenta de nuevo.');
      }
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  async loginWithGoogle() {
    try {
      await this.authService.loginWithGoogle(); 
      this.router.navigate(['/']);
    } catch (error: any) {
      alert('Hubo un problema al conectar con Google.');
    }
  }
}