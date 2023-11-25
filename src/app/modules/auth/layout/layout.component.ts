import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlobalModule } from '../../../global/global.module';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule,GlobalModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {

}
