import {Component} from '@angular/core';
import {SharedVariableService} from '../shared/shared-variable.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.scss']
})
export class ManagementComponent {
  
  tab = 0;


  constructor(private service: SharedVariableService, private router: Router) {
    this.service.updateLogged(true);
  }

  logout() {
    this.service.updateLogged(false);
    this.router.navigate(['/']);
  }

}
