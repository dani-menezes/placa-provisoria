import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations'
import { FormBuilder, FormControl, FormGroup } from '@angular/forms'

import { Recipe } from './recipe/recipe.model'
import { RecipeService } from './recipe/recipe.service'
import { Observable } from 'rxjs/Observable'

import 'rxjs/add/operator/switchMap'
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/debounceTime'
import 'rxjs/add/operator/distinctUntilChanged'
import 'rxjs/add/operator/catch'
import 'rxjs/add/observable/from'

@Component({
  selector: 'ctx-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  animations: [
    trigger('toggleSearch', [
      state('hidden', style({opacity: 0, "max-height": "0px"})),
      state('visible', style({opacity: 1, "max-height": "70px", "margin-top": "20px"})),
      transition ('* => *', animate ('250ms 0s ease-in-out'))
  ])]
})
export class RecipesComponent implements OnInit {

  searchBarState = 'hidden'
  recipes: Recipe[]
  searchForm: FormGroup
  searchControl: FormControl

  constructor(private recipeService: RecipeService, private fb: FormBuilder){
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
          this.recipeService.findAll(searchTerm).catch(error=>Observable.from([]))
      )
      .subscribe(recipes => this.recipes = recipes)
    this.retrieveEntities();
  }

  toggleSearch() {
    this.searchBarState = this.searchBarState === 'hidden' ? 'visible' : 'hidden';
  }
 
  retrieveEntities() {
    console.log('recipes:retrieveEntities[' + (this.recipes?this.recipes.length:0)+']')
    setTimeout(() => {
      this.recipeService.findAll().subscribe(recipes => {
        this.recipes = recipes
      }) 
    }, 500);
  }
}
