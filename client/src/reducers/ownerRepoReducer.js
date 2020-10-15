import { SET_OWNER_REPO } from '../actions/types'

const INITIAL_STATE = {
    owner: "",
    repo: ""
}
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_OWNER_REPO:
            return { ...state, owner: action.payload.owner, repo: action.payload.repo }
        default: return state;
    }
}