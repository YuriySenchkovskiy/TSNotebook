import {combineReducers} from "redux";
import cellsReducers from "./cellsReducers";

const reducers = combineReducers({
    cells: cellsReducers
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;