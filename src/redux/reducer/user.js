import { SET_INFO, SET_LOGIN_STATUS } from "../constant/user";

let initialState = {
  // Khi localStore trả về mà không có dữ liệu => user:null
  user: JSON.parse(localStorage.getItem("USER_INFO")),
  // Kiểm tra trạng thái đăng nhập
  // isLoggedIn: false,
};

export let userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_INFO: {
      state.user = action.payload;
      return { ...state };
    }
    case SET_LOGIN_STATUS: {
      state.isLoggedIn = action.payload;
      return { ...state };
    }
    default:
      return state;
  }
};
