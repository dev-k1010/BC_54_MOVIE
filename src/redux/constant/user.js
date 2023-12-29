export const SET_INFO = "SET_INFO";
// Kiểm tra đăng nhập
export const SET_LOGIN_STATUS = "SET_LOGIN_STATUS";
export const setLoginStatus = (isLoggedIn) => ({
  type: SET_LOGIN_STATUS,
  payload: isLoggedIn,
});
