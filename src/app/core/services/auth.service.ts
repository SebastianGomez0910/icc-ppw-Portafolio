import { inject, Injectable, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Auth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile, user } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Firestore, doc, setDoc, getDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  //Inyeccion de dependencias
  private auth = inject(Auth);
  private firestore = inject(Firestore);
  private router = inject(Router);

  //convierte el flujo asincrono de firebase a una señal (notifica cambios de sesion)
  firebaseUser = toSignal(user(this.auth));

  //actualiza la vista automaticamente al cmabiar 
  isLoggedIn = signal<boolean>(false);
  isProgrammer = signal<boolean>(false);
  userName = signal<string>('');

  constructor() {
    //vigila constantemente mantiene el contenido despues de un reinicio
    user(this.auth).subscribe(async (user) => {
      if (user) {
        //actualiza el estado
        this.isLoggedIn.set(true);
        this.userName.set(user.displayName || '');
        //trae el rol de firebase despues de consultar
        await this.getAndSetRole(user.uid);
      } else {
        //reseta las señales
        this.clearState();
      }
    });
  }

  async register(email: string, password: string, name: string) {
    //una promesa para crear la ceunat en firebase 
    const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
    const firebaseUser = userCredential.user;

    // promesa pra actualizar el perfil e incluir el nombre
    await updateProfile(firebaseUser, { displayName: name });

    //promesa para guardar los datos y rol en firestore
    await setDoc(doc(this.firestore, 'usuarios', firebaseUser.uid), {
      name: name,
      email: email,
      role: 'cliente' 
    });

    return userCredential;
  }

  async login(email: string, password: string) {
    //autentica credenciales en firebase
    const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
    //busca que rol tiene 
    await this.getAndSetRole(userCredential.user.uid);
    //actualiza el estado para mostrar la interfaz segun el rol
    this.isLoggedIn.set(true);
    this.userName.set(userCredential.user.displayName || '');
    return userCredential;
  }

  async logout() {
    //invalida la sesion en los servidores de firebase
    await signOut(this.auth);
    //reseta las señales
    this.clearState();
    this.router.navigate(['/login']);
  }

  private async getAndSetRole(uid: string) {
    //ruta excata hacai el perfil del usuario en bd
    const docRef = doc(this.firestore, 'usuarios', uid);
    //extrae una fotografia de los datos 
    const docSnap = await getDoc(docRef);

    //verifica si hay datos 
    if (docSnap.exists()) {
      const userData = docSnap.data();
      if (userData['role'] === 'programmer') {
        this.isProgrammer.set(true); //otorga privilegio
      } else {
        this.isProgrammer.set(false); //no otorga privilegios
      }
    }
  }

  private clearState() {
    this.isLoggedIn.set(false);
    this.isProgrammer.set(false);
    this.userName.set('');
  }

  async loginWithGoogle() {
    //delega la autenticacion a google
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(this.auth, provider);
    const firebaseUser = userCredential.user;
    //busca el perfil en firebase
    const docRef = doc(this.firestore, 'usuarios', firebaseUser.uid);
    const docSnap = await getDoc(docRef);
    //ve si es un usuario nuevo no 
    if (!docSnap.exists()) {
      //si es nuevo lo registra
      await setDoc(docRef, {
        name: firebaseUser.displayName || 'Usuario de Google',
        email: firebaseUser.email,
        role: 'cliente' 
      });
      this.isProgrammer.set(false); 
    } else {
      //lee su rol y aplica el control de acceso
      const userData = docSnap.data();
      if (userData['role'] === 'programmer') {
        this.isProgrammer.set(true);
      } else {
        this.isProgrammer.set(false);
      }
    }
    //actualiza las señales
    this.isLoggedIn.set(true);
    this.userName.set(firebaseUser.displayName || '');

    return userCredential;
  }
}
