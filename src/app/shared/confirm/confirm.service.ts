import { Injectable } from '@angular/core'; 
import { Router, NavigationStart } from '@angular/router'; 
import { Observable } from 'rxjs'; 
import { Subject } from 'rxjs/Subject';
@Injectable() export class ConfirmService {

     private subject = new Subject<any>();
     constructor(){}

     confirmThis(message: string,confirmFn:()=>void,cancelFn:()=>void){
       this.setConfirmation(message,confirmFn,cancelFn);
     }

     setConfirmation(message: string,confirmFn:()=>void,cancelFn:()=>void) {
       let that = this;
       this.subject.next({ 
            type: "confirm",
            text: message,
            confirmFn:function() {
                that.subject.next(); //this will close the modal
                confirmFn();
            },
            cancelFn:function() {
                that.subject.next();
                cancelFn();
            }
        });
    }

    getMessage(): Observable<any> {
        return this.subject.asObservable();
    } 
}