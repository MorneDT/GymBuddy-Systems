import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { BehaviorSubject, Subscription, timer } from "rxjs";

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {
  clock: any;
  timerRef: any;
  counter: number;
  running: boolean = false;
  minutes: any = '00';
  seconds: any = '00';
  milliseconds: any = '00';
  hours: any = '00';
  _completed: boolean = false;

  @Input() 
  set done(done: boolean) {
    this._completed = (done);
    if(this._completed == true) {
      this.clearTimer();
    }
  }
  get done() { return this._completed; }
  @Input() start: boolean = false;
  @Input() showTimerControls: boolean = true;
  @Output() time = new EventEmitter<string>();

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes['start']);
    if (changes['start'].currentValue) {
      this.startTimer();
    }
    else {
      this.clearTimer();
    }
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
    if (this.timerRef) {
      clearInterval(this.timerRef);
      this.running = false;
      this.time.emit(this.hours + ':' + this.minutes + ':' + this.seconds + ':' + this.milliseconds);
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
}
