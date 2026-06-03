import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, updateProfile } from '@angular/fire/auth';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-register-component',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './register-component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {
  
  private fb = inject(FormBuilder);
  private authService = inject(AuthService); 
  private router = inject(Router);

  registerForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  async onSubmit() {
    if (this.registerForm.valid) {
      const { email, password, name } = this.registerForm.value;

      try {
        await this.authService.register(email!, password!, name!);
        
        alert('¡Cuenta creada exitosamente!');
        this.router.navigate(['/login']);
      } catch (error: any) {
        if (error.code === 'auth/email-already-in-use') {
          alert('Este correo ya está registrado.');
        } else {
          alert('Ocurrió un error al crear la cuenta.');
        }
      }
    } else {
      this.registerForm.markAllAsTouched();
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
