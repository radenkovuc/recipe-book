import {User} from "../../shared";

export interface UserState {
  user: User
}

export const initialState: UserState = {user: null};
