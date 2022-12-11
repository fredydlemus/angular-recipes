import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-recipes';
  loadedFeature = 'recipe';

  onNavigate(feature: string) {
    console.log('onNavigate: ' + feature)
    this.loadedFeature = feature;
  }

}
