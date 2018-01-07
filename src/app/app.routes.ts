import {Routes} from '@angular/router'

import {HomeComponent} from './home/home.component'
import {NotFoundComponent} from './not-found/not-found.component'

import { ContextsComponent } from './contexts/contexts.component'
import { ContextDetailComponent } from 'app/contexts/context-detail/context-detail.component';
import { RecipesComponent } from 'app/recipes/recipes.component';
import { RecipeDetailComponent } from 'app/recipes/recipe-detail/recipe-detail.component';

export const ROUTES: Routes = [
  {path: '', component: HomeComponent},
  {path: 'about', loadChildren: './about/about.module#AboutModule'},
  {path: 'recipes', component: RecipesComponent},
  {path: 'recipe-detail/:id', component: RecipeDetailComponent},
  {path: 'recipe-detail', component: RecipeDetailComponent},
  {path: '**', component: NotFoundComponent}
]
