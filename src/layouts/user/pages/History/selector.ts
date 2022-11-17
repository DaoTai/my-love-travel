import { RootState } from '~/Redux-Saga/Redux/rootReducer';

export const historySelector = (state: RootState) => state.history;
