import { NgModule, ModuleWithProviders } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { ConfirmComponent } from './confirm/confirm.component'
import { InputComponent } from './input/input.component'
import { RadioComponent } from './radio/radio.component'

import { NotificationService } from '../shared/messages/notification.service'
import { ConfirmService } from './confirm/confirm.service'
import { SnackbarComponent } from './messages/snackbar/snackbar.component';
import { RecipeService } from 'app/recipes/recipe/recipe.service';

@NgModule({
    declarations: [ InputComponent, RadioComponent, SnackbarComponent, ConfirmComponent ],
    imports: [CommonModule, FormsModule, ReactiveFormsModule ],
    exports: [ ConfirmComponent, InputComponent, RadioComponent, CommonModule, FormsModule, ReactiveFormsModule, SnackbarComponent ]
})
export class SharedModule{
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers: [ConfirmService, RecipeService, NotificationService]
        }
    }
}