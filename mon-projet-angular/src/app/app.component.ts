import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import 'rxjs-compat/add/observable/interval';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

    seconds: number;
    counterSubscription: Subscription;

    ngOnInit() {
        const counter = Observable.interval(1000);
        this.counterSubscription = counter.subscribe(
            (value) => {
                this.seconds = value;
            }
        );
    }

    ngOnDestroy() {
        this.counterSubscription.unsubscribe();
    }
}
