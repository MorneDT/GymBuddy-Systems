import { User } from "../_models/user";
import { Exercise } from "../_models/exercise";

export interface Workout {
    id?: number;
    captureDate?: Date;
    user: User;
    time: string;
    exercises: Array<Exercise>
}