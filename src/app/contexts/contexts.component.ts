import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations'
import { FormBuilder, FormControl, FormGroup } from '@angular/forms'

import { Context } from './context/context.model'
import { ContextService } from './context/context.service'
import { Observable } from 'rxjs/Observable'

import 'rxjs/add/operator/switchMap'
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/debounceTime'
import 'rxjs/add/operator/distinctUntilChanged'
import 'rxjs/add/operator/catch'
import 'rxjs/add/observable/from'

@Component({
  selector: 'ctx-contexts',
  templateUrl: './contexts.component.html',
  styleUrls: ['./contexts.component.css'],
  animations: [
    trigger('toggleSearch', [
      state('hidden', style({opacity: 0, "max-height": "0px"})),
      state('visible', style({opacity: 1, "max-height": "70px", "margin-top": "20px"})),
      transition ('* => *', animate ('250ms 0s ease-in-out'))
  ])]
})
export class ContextsComponent implements OnInit {

  searchBarState = 'hidden'
  contexts: Context[]
  searchForm: FormGroup
  searchControl: FormControl

  constructor(private contextService: ContextService, private fb: FormBuilder){
    this.ngOnInit();
  }

  ngOnInit() {
    this.searchControl = this.fb.control('')
    this.searchForm = this.fb.group({
      searchControl: this.searchControl
    })
    this.searchControl.valueChanges
      .debounceTime(500)
      .distinctUntilChanged()
      // .do(searchTerm => console.log(`q=${searchTerm}`))
      .switchMap(searchTerm => 
          this.contextService.findAll(searchTerm).catch(error=>Observable.from([]))
      )
      .subscribe(contexts => this.contexts = contexts)
    this.retrieveEntities();
  }

  toggleSearch() {
    this.searchBarState = this.searchBarState === 'hidden' ? 'visible' : 'hidden';
  }
 
  retrieveEntities() {
    console.log('contexts:retrieveEntities[' + (this.contexts?this.contexts.length:0)+']')
    setTimeout(() => {
      this.contextService.findAll().subscribe(contexts => {
        this.contexts = contexts
        console.log('contexts:subscribe[' + (this.contexts?this.contexts.length:0)+']')
      }) 
    }, 500);
  }
}
