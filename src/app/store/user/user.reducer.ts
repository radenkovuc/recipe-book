import {createReducer, on} from "@ngrx/store";

import {setUser} from "./user.actions";
import {initialState} from "./user.state";

export const userReducer = createReducer(initialState,
  on(setUser, (state, action) => ({
    user: action.user,
  })),
);
