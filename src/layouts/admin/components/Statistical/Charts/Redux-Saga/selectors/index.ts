import { RootState } from '~/Redux-Saga/Redux/rootReducer';

export const genderUserSelector = (state: RootState) => state.genderUser;
export const amountOfCustomerSelector = (state: RootState) => state.amountOfCustomer;
export const gmvSelector = (state: RootState) => state.gmv;
export const bookedCategoriesSelector = (state: RootState) => state.bookedCategories;
