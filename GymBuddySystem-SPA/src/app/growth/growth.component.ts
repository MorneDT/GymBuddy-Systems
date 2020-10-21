import { Component, OnInit } from '@angular/core';
import { Workout } from '../_models/workout';
import { AuthService } from '../_services/auth.service';
import { WorkoutService } from '../_services/workout.service';
import { DaysOfWeekEnum } from '../_enums/days-of-week-enum';
import { User } from '../_models/user';
import { Router } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import { Chart } from 'node_modules/chart.js';

@Component({
  selector: 'app-growth',
  templateUrl: './growth.component.html',
  styleUrls: ['./growth.component.css']
})
export class GrowthComponent implements OnInit {
  private workouts: Array<Workout> = [];
  private currentUser: User;

  // Hours Trained
  public hours: any;//GoogleChartInterface;
  private hTitle: string = 'Hours Trained';
  private hUnits: string = 'Hours';
  private hType: string = 'line';
  private hTableHeaders: Array<any> = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  // Weight Moved
  public weight: any;//GoogleChartInterface;
  private wTitle: string = 'Weight Moved';
  private wUnits: string = 'Kg';
  private wType: string = 'line';
  private wTableHeaders: Array<any> = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  constructor(private workoutService: WorkoutService, private authService: AuthService, private router: Router, private alertify: AlertifyService) { }

  async ngOnInit() {
    if (this.authService.currentUser) {
      this.currentUser = this.authService.currentUser;
      await this.workoutService.GetWorkouts(this.currentUser.id).toPromise().then((res) => {
        this.workouts = res;
      }, error => {
        this.alertify.error(error);
      }
      );
    }

    this.generateHourChart();
    this.generateWeight();
  }

  generateHourChart(): void {
    if (this.workouts) {
      let sun: number = 0, mon: number = 0, tue: number = 0, wed: number = 0, thu: number = 0, fri: number = 0, sat: number = 0;

      this.workouts.forEach((workout: Workout) => {
        if (workout.captureDate && workout.time) {
          let curTime = workout.time.split(':');
          let hours: any = curTime[0];
          let minutes: any = curTime[1];
          let seconds: any = curTime[2];
          let milliseconds: any = curTime[3];

          let timeNumber: number = (parseInt(hours) * 3600000) + (parseInt(minutes) * 60000) + (parseInt(seconds) * 1000) + (parseInt(milliseconds));

          let thisDay: Date = new Date(workout.captureDate);
          switch (DaysOfWeekEnum[thisDay.getDay()]) {
            case DaysOfWeekEnum[0].toString():
              sun = sun + timeNumber;
              break;
            case DaysOfWeekEnum[1].toString():
              mon = mon + timeNumber;
              break;
            case DaysOfWeekEnum[2].toString():
              tue = tue + timeNumber;
              break;
            case DaysOfWeekEnum[3].toString():
              wed = wed + timeNumber;
              break;
            case DaysOfWeekEnum[4].toString():
              thu = thu + timeNumber;
              break;
            case DaysOfWeekEnum[5].toString():
              fri = fri + timeNumber;
              break;
            case DaysOfWeekEnum[6].toString():
              sat = sat + timeNumber;
              break;
            default:
              break;
          }
        }
      });

      let hourBody: Array<any> = [
        mon > 0 ? (mon / 3600000) : 0,
        tue > 0 ? (tue / 3600000) : 0,
        wed > 0 ? (wed / 3600000) : 0,
        thu > 0 ? (thu / 3600000) : 0,
        fri > 0 ? (fri / 3600000) : 0,
        sat > 0 ? (sat / 3600000) : 0,
        sun > 0 ? (sun / 3600000) : 0
      ];

      let hoursChart = document.getElementById('hoursChart');
      this.hours = new Chart(hoursChart, {
        type: this.hType,
        data: {
          labels: this.hTableHeaders,
          datasets: [{
            label: this.hTitle,
            backgroundColor: 'transparent',
            borderColor: ' #FD063C',
            data: hourBody
          }]
        },
        options: {}
      });
    }
  }

  generateWeight(): void {
    if (this.workouts) {
      let sun: number = 0, mon: number = 0, tue: number = 0, wed: number = 0, thu: number = 0, fri: number = 0, sat: number = 0;
      let bodyWeight = this.currentUser.weight ? this.currentUser.weight : 70;

      this.workouts.forEach((workout: Workout) => {
        if (workout.captureDate && workout.exercises) {
          let exerciseWeight: number = 0;

          workout.exercises.forEach((x) =>{
            if (x) {
              let calcValue = (x.sets ? x.sets : 0) * (x.reps ? x.reps : 0) * bodyWeight;
              exerciseWeight = exerciseWeight + (calcValue ? calcValue : 0);
            }
          })

          let thisDay: Date = new Date(workout.captureDate);
          switch (DaysOfWeekEnum[thisDay.getDay()]) {
            case DaysOfWeekEnum[0].toString():
              sun = sun + exerciseWeight;
              break;
            case DaysOfWeekEnum[1].toString():
              mon = mon + exerciseWeight;
              break;
            case DaysOfWeekEnum[2].toString():
              tue = tue + exerciseWeight;
              break;
            case DaysOfWeekEnum[3].toString():
              wed = wed + exerciseWeight;
              break;
            case DaysOfWeekEnum[4].toString():
              thu = thu + exerciseWeight;
              break;
            case DaysOfWeekEnum[5].toString():
              fri = fri + exerciseWeight;
              break;
            case DaysOfWeekEnum[6].toString():
              sat = sat + exerciseWeight;
              break;
            default:
              break;
          }
        }
      });

      let weightBody: Array<any> = [mon, tue, wed, thu, fri, sat, sun];

      let weightChart = document.getElementById('weightChart');
      this.weight = new Chart(weightChart, {
        type: this.wType,
        data: {
          labels: this.wTableHeaders,
          datasets: [{
            label: this.wTitle,
            backgroundColor: 'transparent',
            borderColor: '#091921',
            data: weightBody
          }]
        },
        options: {}
      });
    }
  }
}
