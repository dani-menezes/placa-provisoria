import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl} from '@angular/forms'
import { Router, ActivatedRoute } from '@angular/router'

import { BaseAnimationRenderer } from '@angular/platform-browser/animations/src/animation_renderer';
import { ContextComponent } from 'app/contexts/context/context.component';
import { ContextService } from 'app/contexts/context/context.service';
import { Context } from 'app/contexts/context/context.model';
import { getComponent } from '@angular/core/src/linker/component_factory_resolver';

@Component({
  selector: 'ctx-context-detail',
  templateUrl: './context-detail.component.html',
  styleUrls: ['./context-detail.component.css']
})
export class ContextDetailComponent implements OnInit {

  contextForm: FormGroup
  constructor(private contextservice: ContextService, private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
    let id = this.route.snapshot.params['id']
    if (id === undefined) {
      this.buildForm()
    } else {
      this.contextservice.findById(id).subscribe(context => {
        this.buildForm(context)
      })
    }
  }

  buildForm(context?) {
    this.contextForm = this.formBuilder.group({
      id: this.formBuilder.control(context?context.id:''),
      name: this.formBuilder.control(context?context.name:'', [Validators.required, Validators.minLength(5)]),
      maxY: this.formBuilder.control(context?context.maxY:'', [Validators.required]),
      minX: this.formBuilder.control(context?context.minX:'', [Validators.required]),
      maxX: this.formBuilder.control(context?context.maxX:'', [Validators.required]),
      minY: this.formBuilder.control(context?context.minY:'', [Validators.required]),
      colorBg: this.formBuilder.control(context?context.colorBg:'', [Validators.required, Validators.minLength(3)]),
      colorMn: this.formBuilder.control(context?context.colorMn:'', [Validators.required, Validators.minLength(3)]),
      colorFn: this.formBuilder.control(context?context.colorFn:'', [Validators.required, Validators.minLength(3)])
    })
  }

  saveOrUpdate(context: any) {
    console.log('save', context);
    if (context.id === undefined || context.id === "") {
      this.contextservice.save(context).subscribe((context: Context)=> {this.router.navigate(['/contexts'])});
    } else {
      this.contextservice.update(context).subscribe((context: Context)=> {this.router.navigate(['/contexts'])});
    }
  }
}

