import { JsonPipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Exercise } from '../_models/exercise';
import { User } from '../_models/user';
import { Workout } from "../_models/workout";
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';
import { WorkoutService } from '../_services/workout.service';

@Component({
  selector: 'app-workout',
  templateUrl: './workout.component.html',
  styleUrls: ['./workout.component.css']
})
export class WorkoutComponent implements OnInit, OnDestroy {
  timerSubscription: Subscription;
  exerciseList: Exercise[];
  workoutCompleted: boolean = false;
  myWorkout: Workout = <Workout>{user:<User>{}, exercises: [] };
  workoutForm: FormGroup;
  weight = 70;

  constructor(private authService: AuthService, private workoutService: WorkoutService, private router: Router, private alertify: AlertifyService, private fb: FormBuilder) {
    this.timerSubscription = this.workoutService.workoutTime.subscribe((timeVal) => {
      console.log('time value', timeVal);
      this.myWorkout.time = timeVal;
    });
  }

  ngOnInit(): void {
    if (this.authService.currentUser)
    {
      this.myWorkout.user = this.authService.currentUser;
      if (this.authService.currentUser.weight && this.authService.currentUser.weight > 0)
      {
        this.weight = this.authService.currentUser.weight;  
      }
    }
    this.createWorkoutForm();

    this.addTodo({ id: 0, checked: false, name:'Push-up', sets: 1 });
    this.addTodo({ id: 1, checked: false, name:'Wide Push-up', sets: 1 });
    this.addTodo({ id: 2, checked: false, name:'Diamond Push-up', sets: 1 });
    this.addTodo({ id: 3, checked: false, name:'Rotating Push-up', sets: 1 });
  }

  createWorkoutForm() {
    this.workoutForm = this.fb.group({
      weight: [this.weight, Validators.required]
    });
  }
  
  async workoutComplete() {
    this.workoutCompleted = true;
    this.workoutService.setCompleted(this.workoutCompleted);
    
    let formData = Object.assign({}, this.workoutForm.value);
    this.myWorkout.user.weight = formData["weight"]
    
    // save to DB
    this.workoutService.AddWorkout(this.myWorkout).subscribe(() => {
      this.alertify.success('Workout submitted successful.');
    }, error => {
      this.alertify.error(error);
    }, () => {
      this.router.navigate(['/user']);
    });
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
    let exerciseIndex = this.exerciseList.findIndex((e) => e.name == exercise.name);
    if (exerciseIndex > -1) {
      let newExlist: Exercise[] = JSON.parse(JSON.stringify(this.exerciseList));
      this.exerciseList = null;
      newExlist[exerciseIndex].checked = exercise.checked;
      newExlist[exerciseIndex].reps = exercise.reps;
      newExlist[exerciseIndex].sets = exercise.sets;

      newExlist.forEach(newExItem => {
        this.addTodo(newExItem);
      });

      let exList: Array<Exercise> = [];
      newExlist.forEach(item => {
        if (item.checked == true) {
          let newitem = JSON.parse(JSON.stringify(item));
          newitem.id = null;
          exList.push(newitem);
        }
      });

      this.myWorkout.exercises = exList;
    }
  }

  ngOnDestroy() {
    this.timerSubscription.unsubscribe;
    this.timerSubscription = null;
  }
}
