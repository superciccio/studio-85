import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  password = '';
  email = '';
  hide = true;
  userNotFound = false;
  wrongPassword = false;


  constructor(private dialogRef: MatDialogRef<LoginComponent>, private router: Router, private afAuth: AngularFireAuth) {
  }

  ngOnInit() {
  }

  login() {
    this.afAuth.auth.signInWithEmailAndPassword(this.email, this.password).then((resp) => {
      this.dialogRef.close();
      this.router.navigate(['/management']);
    }).catch((err) => {
      if (err.code === 'auth/user-not-found') {
      this.userNotFound = true;
      }if (err.code === 'auth/wrong-password') {
      this.wrongPassword = true;
      }
      console.error(err);
    });

    // if (this.password === 'GATTO') {
    //   this.dialogRef.close();
    //   this.router.navigate(['/management']);
    // } else {
    //   alert('not a valid password ' + this.password);
    // }

  }

  close() {
    this.dialogRef.close();
  }
}
