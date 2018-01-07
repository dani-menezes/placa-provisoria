import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations'

import { ConfirmService } from '../../shared/confirm/confirm.service';
import { RecipeService } from 'app/recipes/recipe/recipe.service';
import { NotificationService } from '../../shared/messages/notification.service';

import { Recipe } from 'app/recipes/recipe/recipe.model'
import { RecipesComponent } from 'app/recipes/recipes.component';


@Component({
  selector: 'ctx-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css'],
  animations: [
    trigger('recipeAppeared', [
      state('ready', style({opacity: 1})),
      transition ('void => ready', [
        style({opacity: 0, transform: 'translate(-30px, -10px)'}), animate('300ms 0s ease-in-out')
      ] )
    ])
  ]
})
export class RecipeComponent implements OnInit {
  
  recipestate = 'ready'
  
  @Input() recipe: Recipe
  @Output() reloadEntities = new EventEmitter();

  constructor(private service: RecipeService, private confirmService: ConfirmService, private notificationService: NotificationService) { }

  ngOnInit() {
  }

  delete(id: number, name: string) {
    let that = this;
    this.confirmService.confirmThis(`Confirma a exclusão da Receita "${name}"?`,
      function(){
        if (that.service.delete(id)) {
          that.notificationService.notify(`Receita "${name}" excluída com sucesso`)
          console.log('emit event----')
          that.reloadEntities.emit();
        }
      },
      function(){}
    )
  }

}
