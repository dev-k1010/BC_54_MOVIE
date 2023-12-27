import { SET_INFO } from "../constant/user";

let initialState = {
  // Khi localStore trả về mà không có dữ liệu => user:null
  user: JSON.parse(localStorage.getItem("USER_INFO")),
};

export let userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_INFO: {
      state.user = action.payload;
      return { ...state };
    }
    default:
      return state;
  }
};
