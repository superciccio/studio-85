import {Component} from '@angular/core';
import {SharedVariableService} from './shared/shared-variable.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'studio85';

  isAdmin = false;

  constructor(private service: SharedVariableService) {
    this.service.getLogged().subscribe(logged => {
      this.isAdmin = logged;
    });
  }


}
