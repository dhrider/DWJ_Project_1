import {Component, OnDestroy, OnInit} from '@angular/core';
import {AppareilService} from '../services/appareil.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-appareil-view',
  templateUrl: './appareil-view.component.html',
  styleUrls: ['./appareil-view.component.scss']
})

export class AppareilViewComponent implements OnInit, OnDestroy {

    appareils: any[];
    appareilSubscription: Subscription;

    lastUpdate = new Promise((resolve, reject) => {
        const date = new Date();
        setTimeout(
            () => {
                resolve(date);
            }, 2000
        );
    });

    constructor(private appareilService: AppareilService) {
    }

    ngOnInit() {
        this.appareilSubscription = this.appareilService.appareilsSubject.subscribe(
            (appareils: any[]) => {
                this.appareils = appareils;
            }
        );
        this.appareilService.emitAppareilSubject();
    }

    onAllumer() {
        this.appareilService.switchOnAll();
    }

    onEteindre() {
        this.appareilService.switchOffAll();
    }

    onSave() {
        this.appareilService.saveAppareilsToServer();
    }

    onFetch() {
        this.appareilService.getAppareilsFromServer();
    }

    ngOnDestroy() {
        this.appareilSubscription.unsubscribe();
    }
}
