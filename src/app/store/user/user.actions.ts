import {createAction, props} from "@ngrx/store";

import {User} from "../../shared";

export const setUser = createAction("user/set", props<{ user: User }>());
