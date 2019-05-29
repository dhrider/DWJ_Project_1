import { Component } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor() {
        const firebaseConfig = {
            apiKey: "AIzaSyAoyEQFit2yWgLChdJ_oKLJhKfObkF1FPA",
            authDomain: "tp-book-angular.firebaseapp.com",
            databaseURL: "https://tp-book-angular.firebaseio.com",
            projectId: "tp-book-angular",
            storageBucket: "tp-book-angular.appspot.com",
            messagingSenderId: "292595116340",
            appId: "1:292595116340:web:dae13edf17e3098a"
        };
        firebase.initializeApp(firebaseConfig);
  }
}
