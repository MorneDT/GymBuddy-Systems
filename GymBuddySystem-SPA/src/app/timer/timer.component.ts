import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { BehaviorSubject, Observable, Subject, Subscription, timer } from "rxjs";
import { WorkoutService } from '../_services/workout.service';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit , OnDestroy {
  timerSubscriptionChild: Subscription;
  clock: any;
  timerRef: any;
  counter: number;
  running: boolean = false;
  minutes: any = '00';
  seconds: any = '00';
  milliseconds: any = '00';
  hours: any = '00';
  _completed: Observable<boolean>;
  @Input() start: boolean = false;
  @Input() showTimerControls: boolean = true;

  constructor(private workoutService: WorkoutService) {
    this.timerSubscriptionChild = this.workoutService.completeWorkout.subscribe((stopped) => {
      console.log('timer: completeWorkout = ', stopped);
      if(stopped == true) {
        this.pauseTimer();
      }
    });
  }
  
  startTimer() {
    this.running = !this.running;
    if (this.running) {
      const startTime = Date.now() - (this.counter || 0);

      this.timerRef = setInterval(() => {
        this.counter = Date.now() - startTime;

        this.milliseconds = Math.floor(Math.floor(this.counter % 1000) / 10).toFixed(0);
        this.minutes = Math.floor(this.counter / 60000);
        this.seconds = Math.floor(Math.floor(this.counter % 60000) / 1000).toFixed(0);
        this.hours = Math.floor(this.counter / 3600000);

        if (this.counter < 0) {
          this.clearTimer();
        }
        if (Number(this.hours) < 10) {
          this.hours = '0' + this.hours;
        } else {
          this.hours = '' + this.hours;
        }
        if (Number(this.minutes) < 10) {
          this.minutes = '0' + this.minutes;
        } else {
          this.minutes = '' + this.minutes;
        }
        if (Number(this.seconds) < 10) {
          this.seconds = '0' + this.seconds;
        } else {
          this.seconds = '' + this.seconds;
        }
      });
    }
  }

  pauseTimer() {
    console.log('timer: this.timerRef', this.timerRef);
    if (this.timerRef) {
      this.running = false;

      this.workoutService.setTime(this.hours + ':' + this.minutes + ':' + this.seconds + ':' + this.milliseconds);
      clearInterval(this.timerRef);
    }
  }

  clearTimer() {
    this.pauseTimer();
    this.counter = null;
    this.hours = '00';
    this.minutes = '00';
    this.seconds = '00';
    this.milliseconds = '00';
  }
  
  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.timerSubscriptionChild.unsubscribe;
    this.timerSubscriptionChild = null;
  }
}
