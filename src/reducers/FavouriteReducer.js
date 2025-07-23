import {
  ADD_TO_FAVOURITE,
  REMOVE_FROM_FAVOURITE,
} from "../constants/FavouriteConstants";

export const favouriteReducer = (state = { favouriteItems: [] }, action) => {
  switch (action.type) {
    case ADD_TO_FAVOURITE:
      const item = action.payload;

      const isItemExist = state.favouriteItems.find(
        (i) => i.product === item.product
      );

     

    
  }
};
