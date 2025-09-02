import { LOADER } from "../../utils/constants";

const initialState = {
  isLoading: false,
};

export const loadingReducer = (state = initialState, action) => {
  switch (action.type) {
    // Instead of making two things for loading false and true we manage it in one way directly by passing action .payload to i.
    case LOADER:
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
};
