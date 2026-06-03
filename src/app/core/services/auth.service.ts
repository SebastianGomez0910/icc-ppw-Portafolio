import { inject, Injectable, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Auth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile, user } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Firestore, doc, setDoc, getDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private auth = inject(Auth);
  private firestore = inject(Firestore);
  private router = inject(Router);

  firebaseUser = toSignal(user(this.auth));

  isLoggedIn = signal<boolean>(false);
  isProgrammer = signal<boolean>(false);
  userName = signal<string>('');

  constructor() {
    user(this.auth).subscribe(async (user) => {
      if (user) {
        this.isLoggedIn.set(true);
        this.userName.set(user.displayName || '');
        await this.getAndSetRole(user.uid);
      } else {
        this.clearState();
      }
    });
  }
  async register(email: string, password: string, name: string) {
    const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
    const firebaseUser = userCredential.user;

    await updateProfile(firebaseUser, { displayName: name });

    await setDoc(doc(this.firestore, 'usuarios', firebaseUser.uid), {
      name: name,
      email: email,
      role: 'cliente' 
    });

    return userCredential;
  }

  async login(email: string, password: string) {
    const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
    await this.getAndSetRole(userCredential.user.uid);
    this.isLoggedIn.set(true);
    this.userName.set(userCredential.user.displayName || '');
    return userCredential;
  }

  async logout() {
    await signOut(this.auth);
    this.clearState();
    this.router.navigate(['/login']);
  }

  private async getAndSetRole(uid: string) {
    const docRef = doc(this.firestore, 'usuarios', uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const userData = docSnap.data();
      if (userData['role'] === 'programmer') {
        this.isProgrammer.set(true);
      } else {
        this.isProgrammer.set(false);
      }
    }
  }

  private clearState() {
    this.isLoggedIn.set(false);
    this.isProgrammer.set(false);
    this.userName.set('');
  }

  async loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(this.auth, provider);
    const firebaseUser = userCredential.user;

    const docRef = doc(this.firestore, 'usuarios', firebaseUser.uid);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      await setDoc(docRef, {
        name: firebaseUser.displayName || 'Usuario de Google',
        email: firebaseUser.email,
        role: 'cliente' 
      });
      this.isProgrammer.set(false); 
    } else {
      const userData = docSnap.data();
      if (userData['role'] === 'programmer') {
        this.isProgrammer.set(true);
      } else {
        this.isProgrammer.set(false);
      }
    }

    this.isLoggedIn.set(true);
    this.userName.set(firebaseUser.displayName || '');

    return userCredential;
  }
}
