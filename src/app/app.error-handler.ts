import {ErrorHandler, Injectable, Injector, NgZone} from '@angular/core'
import {HttpErrorResponse} from '@angular/common/http'
import {Observable} from 'rxjs/Observable'
import 'rxjs/add/observable/throw'

import {NotificationService} from './shared/messages/notification.service'

@Injectable()
export class ApplicationErrorHandler extends ErrorHandler {

  constructor(private ns: NotificationService,
              private injector: Injector,
              private zone: NgZone){
    super()
  }

  handleError(errorResponse: HttpErrorResponse | any){
    if (errorResponse instanceof HttpErrorResponse){
      const message = errorResponse.error.message
      this.zone.run(() => {
        switch (errorResponse.status){
          case 404:
            this.ns.notify(message || 'Recurso não encontrado. Verifique o console para mais detalhes')
            break;
        }
      })
    }
    super.handleError(errorResponse)
  }
}