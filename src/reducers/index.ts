import {combineReducers} from 'redux'
import counter from './counter'
import user from "./user";
import theme from "./theme";

export default combineReducers({
  counter,
  user,
  theme
})
