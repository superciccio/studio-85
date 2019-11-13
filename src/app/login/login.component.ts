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
  errosMsg = '';
  
  emailCtrl = new FormControl('',[
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
   pwdCtrl = new FormControl('',[
    Validators.required,
    Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')
  ]);

  constructor(private dialogRef: MatDialogRef<LoginComponent>, private router: Router, private afAuth: AngularFireAuth) {
  }

  ngOnInit() {
  }

  login() {
    if(this.email !== '' && this.password !== ''){
        this.afAuth.auth.signInWithEmailAndPassword(this.email, this.password).then((resp) => {
      this.dialogRef.close();
      this.router.navigate(['/management']);
    }).catch((err) => {
      if (err.code === 'auth/user-not-found') {
        this.userNotFound = true;
        this.errosMsg = "Email or password do not exists.";

      }
      if (err.code === 'auth/wrong-password') {
      this.wrongPassword = true;
      this.errosMsg = 'Wrong password. Try again or click Forgot password to reset it.';
      }
      else{
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
}
