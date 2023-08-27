import { configureStore } from "@reduxjs/toolkit";
import user from "./userSlice";
export default configureStore({
  // 만든 state(slice) 등록해야 사용가능
  reducer: {
    user: user.reducer, // 리듀서 작명 이름 : slice명.reducer
  },
});
