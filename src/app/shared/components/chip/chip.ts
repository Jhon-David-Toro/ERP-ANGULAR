import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-chip',
  styleUrl: './chip.scss',
  templateUrl: './chip.html'
})
export class Chip {}
