import { Component } from '@angular/core';
import { Navbar } from '../../shared/components/navbar/navbar';
import { Button } from '../../shared/components/button/button';
import { Chip } from '../../shared/components/chip/chip';
import { NgOptimizedImage } from '@angular/common';

@Component({
  imports: [Navbar,
    Button,
    Chip,
    NgOptimizedImage
  ],
  selector: 'app-landing-page',
  styleUrl: './landing-page.scss',
  templateUrl: './landing-page.html'
})
export class LandingPage {}
