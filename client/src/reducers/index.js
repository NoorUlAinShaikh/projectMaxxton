import { combineReducers } from 'redux'
import issuesReducer from './issuesReducer'
import ownerRepoReducer from './ownerRepoReducer'

export default combineReducers({ issues: issuesReducer, owner_repo: ownerRepoReducer });