import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-spinner',
  templateUrl: './spinner.html',
  styleUrl: './spinner.scss',
})
export class Spinner {
  readonly size = input<'xs' | 'sm' | 'md' | 'lg' | 'xl'>('md');
  readonly label = input<string>('');
}
