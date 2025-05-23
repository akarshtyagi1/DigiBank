import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './pages/common/navbar/navbar.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true,
  imports: [NavbarComponent, RouterOutlet],
})
export class AppComponent {
  title = 'digibank-prototype';

  constructor(public translate: TranslateService) {
    translate.addLangs(['en', 'fr', 'ar']);
    translate.setDefaultLang('en');
  }

  switchLang(lang: string) {
    debugger;
    this.translate.setDefaultLang(lang);
  }
}
