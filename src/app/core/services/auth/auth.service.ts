import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth) { }

  async login(email: string, password: string): Promise<string | undefined | null> {
    const userCredential = await this.afAuth.signInWithEmailAndPassword(email, password);
    const token = await userCredential.user?.getIdToken();
    return token;
  }


  async logout() {
    return this.afAuth.signOut();
  }
}
