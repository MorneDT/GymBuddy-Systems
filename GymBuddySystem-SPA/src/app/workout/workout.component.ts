import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Exercise } from '../_models/exercise';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-workout',
  templateUrl: './workout.component.html',
  styleUrls: ['./workout.component.css']
})
export class WorkoutComponent implements OnInit {
  exerciseList: Exercise[];
  workoutCompleted: boolean = false;
  workoutTime:string = '00:00:00:00'; 

  workoutForm: FormGroup;
  weight = 70;

  constructor(private authService: AuthService, private router: Router, private alertify: AlertifyService, private fb: FormBuilder) { }

  ngOnInit(): void {
    if (this.authService.currentUser && this.authService.currentUser.weight && this.authService.currentUser.weight > 0)
    {
      this.weight = this.authService.currentUser.weight;
      //this.workoutForm.patchValue({weight: this.authService.currentUser.weight});  
    }
    // else {
    //   this.workoutForm.patchValue({weight: 70});
    // }
    this.createWorkoutForm();

    this.addTodo({ id: 0, checked: false, name:'Push-up' });
    this.addTodo({ id: 1, checked: false, name:'Wide Push-up' });
    this.addTodo({ id: 2, checked: false, name:'Diamond Push-up' });
    this.addTodo({ id: 3, checked: false, name:'Rotating Push-up' });
  }

  createWorkoutForm() {
    this.workoutForm = this.fb.group({
      weight: [this.weight, Validators.required]
    });
  }

  onGetTime(timeString: string)
  {
    this.workoutTime = timeString;
    this.workoutCompleted = false;
    alert(this.workoutTime);
  }

  workoutComplete() {
    this.workoutCompleted = true;
    // save to DB
  }

  addTodo(exercise: Exercise) {
    if (!this.exerciseList || this.exerciseList.length == 0)
    {
      this.exerciseList = [exercise];
    } else {
      this.exerciseList.push(exercise);
    }
  }

  onGetProgressItem(exercise: Exercise) {
    alert(JSON.stringify(exercise));
    let exerciseIndex = this.exerciseList.findIndex((e) => e.id == exercise.id);
    if (exerciseIndex > -1) {
      this.exerciseList[exerciseIndex] = exercise;
    }
  }
}
