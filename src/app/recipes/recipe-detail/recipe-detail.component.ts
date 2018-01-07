import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl} from '@angular/forms'
import { Router, ActivatedRoute } from '@angular/router'

import { BaseAnimationRenderer } from '@angular/platform-browser/animations/src/animation_renderer';
import { RecipeComponent } from 'app/recipes/recipe/recipe.component';
import { RecipeService } from 'app/recipes/recipe/recipe.service';
import { Recipe } from 'app/recipes/recipe/recipe.model';
import { getComponent } from '@angular/core/src/linker/component_factory_resolver';

@Component({
  selector: 'ctx-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  colorImgBasePath: String = "https://s3.amazonaws.com/leapmind/contextManager/placa/img/"
  recipeForm: FormGroup
  constructor(private recipeService: RecipeService, private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
    let id = this.route.snapshot.params['id']
    if (id === undefined) {
      this.buildForm()
    } else {
      this.recipeService.findById(id).subscribe(Recipe => {
        this.buildForm(Recipe)
      })
    }
  }

  buildForm(recipe?) {
    this.recipeForm = this.formBuilder.group({
      id: this.formBuilder.control(recipe?recipe.id:''),
      name: this.formBuilder.control(recipe?recipe.name:'', [Validators.required, Validators.minLength(3)]),      
      lote: this.formBuilder.control(recipe?recipe.lote:'', [Validators.required]),
      boilTime: this.formBuilder.control(recipe?recipe.boilTime:'', [Validators.required]),
      originalGravity: this.formBuilder.control(recipe?recipe.originalGravity:'', [Validators.required]),
      finalGravity: this.formBuilder.control(recipe?recipe.finalGravity:'', [Validators.required]),
      ABV: this.formBuilder.control(recipe?recipe.ABV:'', [Validators.required]),
      styleImg: this.formBuilder.control(recipe?recipe.styleImg:'', [Validators.required]),
      IBU: this.formBuilder.control(recipe?recipe.IBU:'', [Validators.required])
    })
  }

  saveOrUpdate(recipe: any) {
    console.log('save', recipe);
    if (recipe.id === undefined || recipe.id === "") {
      this.recipeService.save(recipe).subscribe((Recipe: Recipe)=> {this.router.navigate(['/recipes'])});
    } else {
      this.recipeService.update(recipe).subscribe((Recipe: Recipe)=> {this.router.navigate(['/recipes'])});
    }
  }
}

