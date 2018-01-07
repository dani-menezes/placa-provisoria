import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations'

import { ConfirmService } from '../../shared/confirm/confirm.service';
import { ContextService } from 'app/contexts/context/context.service';
import { NotificationService } from '../../shared/messages/notification.service';

import { Context } from 'app/contexts/context/context.model'
import { ContextsComponent } from 'app/contexts/contexts.component';


@Component({
  selector: 'ctx-context',
  templateUrl: './context.component.html',
  styleUrls: ['./context.component.css'],
  animations: [
    trigger('contextAppeared', [
      state('ready', style({opacity: 1})),
      transition ('void => ready', [
        style({opacity: 0, transform: 'translate(-30px, -10px)'}), animate('300ms 0s ease-in-out')
      ] )
    ])
  ]
})
export class ContextComponent implements OnInit {
  
  contextState = 'ready'
  
  @Input() context: Context
  @Output() reloadEntities = new EventEmitter();

  constructor(private service: ContextService, private confirmService: ConfirmService, private notificationService: NotificationService) { }

  ngOnInit() {
  }

  delete(id: number, name: string) {
    let that = this;
    this.confirmService.confirmThis(`Confirma a exclusão do contexto "${name}"?`,
      function(){
        if (that.service.delete(id)) {
          that.notificationService.notify(`Contexto "${name}" excluído com sucesso`)
          console.log('emit event----')
          that.reloadEntities.emit();
        }
      },
      function(){}
    )
  }

  getContrast(hexcolor) : String {
    var r = parseInt(hexcolor.substr(1,2),16);
    var g = parseInt(hexcolor.substr(3,2),16);
    var b = parseInt(hexcolor.substr(5,2),16);
    var yiq = ((r*299)+(g*587)+(b*114))/1000;
    return (yiq >= 128) ? 'black' : 'white';
  }

}
