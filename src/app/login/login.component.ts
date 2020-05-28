import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  password = '';
  email = '';
  name = '';

  hide = true;
  userNotFound = false;
  wrongPassword = false;
  errosMsg = '';
  isRecoveryPassword = false;
  isSignup = false;
  isLogin = true;

  emailCtrl = new FormControl('', [
    Validators.required,
    Validators.email
  ]);

  /*
  At least 8 characters in length
  Lowercase letters
  Uppercase letters
  Numbers
  Special characters
  */
   pwdCtrl = new FormControl('', [
    Validators.required,
    Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')
  ]);
  nameCtrl = new FormControl('', [
    Validators.required
  ]);
  surnameCtrl = new FormControl('', [
    Validators.required
  ]);
  surname = '';

  constructor(private dialogRef: MatDialogRef<LoginComponent>, private router: Router, private afAuth: AngularFireAuth) {
  }

  ngOnInit() {
  }

  backToLogin() {
    this.isLogin = true;
    this.isSignup = false;
    this.isRecoveryPassword = false;
  }

  signup() {
    this.isLogin = false;
    this.isSignup = true;
    this.isRecoveryPassword = false;
  }

  recoveryPassword() {
    this.isLogin = false;
    this.isSignup = false;
    this.isRecoveryPassword = true;
  }

  login() {
    if (this.email !== '' && this.password !== '') {
        this.afAuth.signInWithEmailAndPassword(this.email, this.password).then((resp) => {
      this.dialogRef.close();
      this.router.navigate(['/management']);
    }).catch((err) => {
      if (err.code === 'auth/user-not-found') {
        this.userNotFound = true;
        this.errosMsg = 'Email or password do not exists.';

      }
      if (err.code === 'auth/wrong-password') {
      this.wrongPassword = true;
      this.errosMsg = 'Wrong password. Try again or click Forgot password to reset it.';
      } else {
      this.wrongPassword = true;
      this.errosMsg = 'Email or password are wrong.';
      }
      console.error(err);
    });
    }

  }

  close() {
    this.dialogRef.close();
  }

  sendRecoveryPassword() {

  }
}
