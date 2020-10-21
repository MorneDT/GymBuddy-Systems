import { group } from '@angular/animations';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Exercise } from '../_models/exercise';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.css']
})
export class ExerciseComponent implements OnInit, OnDestroy {
  exerciseEventSubscription: Subscription;
  exerciseFromGroup: FormGroup;

  @Input() exerciseItem: Exercise;
  @Output() exerciseProgress = new EventEmitter<Exercise>();

  constructor(private authService: AuthService, private router: Router, private alertify: AlertifyService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.createExerciseForm();
    this.updateExercise();
  }

  createExerciseForm(): void {
    this.exerciseFromGroup = this.fb.group({
      id: [this.exerciseItem.id],
      checked: [this.exerciseItem.checked],
      name: [this.exerciseItem.name],
      reps: [this.exerciseItem.reps, Validators.required],
      sets: [this.exerciseItem.sets,]
    });
  }

  updateExercise(): void {
    this.exerciseEventSubscription = this.exerciseFromGroup.valueChanges.subscribe(val => {
      if (this.exerciseFromGroup.valid) {
        let exercise: Exercise = Object.assign({}, this.exerciseFromGroup.value);
        exercise.checked = true;
        this.exerciseProgress.emit(exercise);
      }
    });
  }

  ngOnDestroy(): void {
    this.exerciseEventSubscription.unsubscribe();
    this.exerciseEventSubscription = null;
  }
}
