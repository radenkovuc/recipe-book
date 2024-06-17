import {AppState} from "..";

export const isLoggedIn = (state: AppState) => !!state.user.user
