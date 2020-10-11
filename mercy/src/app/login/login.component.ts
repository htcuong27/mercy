import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  message: string;

  constructor(
    private route: Router
  ) { }

  ngOnInit(): void {
  }

  onLogin(): void {
    this.route.navigate(['/chat']);
  }
}
