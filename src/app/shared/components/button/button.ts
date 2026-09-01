import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  selector: 'app-button',
  styleUrl: './button.scss',
  templateUrl: './button.html'
})
export class Button {
  readonly variant = input<'primary' | 'secondary'>('primary');
  readonly routerLink = input<string>('');
  readonly href = input<string>('');
}
