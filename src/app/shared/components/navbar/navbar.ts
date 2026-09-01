import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Button } from "../button/button";

@Component({
  imports: [RouterLink, Button],
  selector: 'app-navbar',
  styleUrl: './navbar.scss',
  templateUrl: './navbar.html'
})
export class Navbar {}
