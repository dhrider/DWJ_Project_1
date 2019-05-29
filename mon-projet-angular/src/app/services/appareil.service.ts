import {Subject} from 'rxjs';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class AppareilService {

    appareilsSubject = new Subject<any[]>();

    private appareils = [];

    constructor(private httpClient: HttpClient) {}

    emitAppareilSubject() {
        this.appareilsSubject.next(this.appareils.slice());
    }

    getAppareilById(id: number) {
        const appareil = this.appareils.find(
            (a) => {
                return a.id === id;
            }
        );
        return appareil;
    }

    switchOnAll() {
        for(let appareil of this.appareils) {
            appareil.status = 'allumé';
            this.emitAppareilSubject();
        }
    }

    switchOffAll() {
        for(let appareil of this.appareils) {
            appareil.status = 'éteint';
            this.emitAppareilSubject();
        }
    }

    switchOnOne(index: number) {
        this.appareils[index].status = 'allumé';
        this.emitAppareilSubject();
    }

    switchOffOne(index: number) {
        this.appareils[index].status = 'éteint';
        this.emitAppareilSubject();
    }

    addAppareil(name: string, status: string) {
        const appareilObject = {
            id: 0,
            name: '',
            status: ''
        };
        appareilObject.name = name;
        appareilObject.status = status;
        appareilObject.id = this.appareils[(this.appareils.length) - 1 ].id + 1;

        this.appareils.push(appareilObject);
        this.emitAppareilSubject();
    }

    saveAppareilsToServer() {
        this.httpClient
            .put('https://mon-projet-angular-c838c.firebaseio.com/appareils.json', this.appareils)
            .subscribe(
                () => {
                    console.log('Enregistrement terminé !');
                },
                (error) => {
                    console.log('Erreur ! : ' + error);
                }
            );
    }

    getAppareilsFromServer() {
        this.httpClient
            .get<any[]>('https://mon-projet-angular-c838c.firebaseio.com/appareils.json')
            .subscribe(
                (response) => {
                    this.appareils = response;
                    this.emitAppareilSubject();
                },
                (error) => {
                    console.log('Erreur ! : ' + error);
                }
            );
    }
}
