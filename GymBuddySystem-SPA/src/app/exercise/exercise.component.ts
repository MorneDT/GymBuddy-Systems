import { group } from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Exercise } from '../_models/exercise';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.css']
})
export class ExerciseComponent implements OnInit {
  exerciseFromGroup: FormGroup;

  @Input() exerciseItem: Exercise;
  @Output() exerciseProgress = new EventEmitter<Exercise>();

  constructor(private authService: AuthService, private router: Router, private alertify: AlertifyService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.createExerciseForm();
  }

  createExerciseForm() {
    this.exerciseFromGroup = this.fb.group({
      id: [this.exerciseItem.id],
      checked: [this.exerciseItem.checked],
      name: [this.exerciseItem.name],
      reps: [this.exerciseItem.reps],
      sets: [this.exerciseItem.sets]
    });
  }

  updateExercise() {
    alert('update progress')
    if (this.exerciseFromGroup.valid) {
      let exercise = Object.assign({}, this.exerciseFromGroup.value);
      this.exerciseProgress.emit(exercise);
    }
  }
}
