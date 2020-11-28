import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-test',
    templateUrl: './test.component.html',
    styleUrls: ['./test.component.scss']
})
/** test component*/
export class TestComponent {
    /** test ctor */
  constructor(private router: Router) {

  }
  onLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['/user/login']);
  }
}
