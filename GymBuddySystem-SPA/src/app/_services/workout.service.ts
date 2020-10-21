import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Workout } from '../_models/workout';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {
  baseUrl = environment.apiUrl + 'workout/';

  workoutTime: Observable<string>;
  completeWorkout: Observable<boolean>;

  private _workoutTime: Subject<string> = new Subject();
  private _completeworkout: Subject<boolean> = new Subject();

  constructor(private http: HttpClient) { 
    this.workoutTime = this._workoutTime.asObservable();
    this.completeWorkout = this._completeworkout.asObservable();
  }

  setCompleted(value: boolean) {
    this._completeworkout.next(value);
  }

  setTime(timeValue: string) {
    this._workoutTime.next(timeValue);
  }

  AddWorkout(model: any) {
    return this.http.post(this.baseUrl + 'AddWorkout', model).pipe(
        map((response: any) => {
          const currentworkout = response;
        })
      );
  }

  GetWorkouts(personId:number): Observable<Workout[]> {
    return this.http.get<Workout[]>(this.baseUrl + personId)
  }
}
