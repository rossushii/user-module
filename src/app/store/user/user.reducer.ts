import { createReducer, on } from "@ngrx/store";

import { getuserssuccess } from "./user.actions";
import { UserAdapter, UserState } from "./user.state";



const _userReducer = createReducer(UserState,
    on(getuserssuccess, (state, action) => {
        return UserAdapter.setAll(action.userlist, state)
    }),
    
)
export function UserReducer(state: any, action: any) {
    return _userReducer(state, action);
}


