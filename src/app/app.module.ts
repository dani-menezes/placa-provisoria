import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID, ErrorHandler } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LocationStrategy, HashLocationStrategy} from '@angular/common';

import { ApplicationErrorHandler} from './app.error-handler'
import { ROUTES } from './app.routes'

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { SharedModule } from './shared/shared.module'
import { NotFoundComponent } from './not-found/not-found.component';
import { ContextsComponent } from 'app/contexts/contexts.component';
import { ContextComponent } from 'app/contexts/context/context.component';
import { ContextDetailComponent } from 'app/contexts/context-detail/context-detail.component';
import { RecipesComponent } from 'app/recipes/recipes.component';
import { RecipeComponent } from 'app/recipes/recipe/recipe.component';
import { RecipeDetailComponent } from 'app/recipes/recipe-detail/recipe-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    NotFoundComponent,
    ContextComponent,
    ContextsComponent,
    ContextComponent,
    ContextDetailComponent,
    RecipesComponent,
    RecipeComponent,
    RecipeDetailComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule.forRoot(),
    RouterModule.forRoot(ROUTES, {preloadingStrategy: PreloadAllModules})
  ],
  providers: [{provide: LOCALE_ID, useValue: 'pt-BR'}, {provide: ErrorHandler, useClass: ApplicationErrorHandler}],
  bootstrap: [AppComponent]
})
export class AppModule { }
