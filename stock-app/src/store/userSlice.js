import { createSlice } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";

//slice만들기 (state 와 같은 역할)
let user = createSlice({
  name: "user", //state 명칭
  initialState: { id: 1, name: "lee", balance: 1000000, stock: [], like: [] }, //초기값

  //state 함수 목록 담기
  reducers: {
    addLike(state, action) {
      let num = state.like.filter((item) => item == action.payload);
      if (num.length == 0) {
        state.like.push(action.payload);
      }
    },

    removeLike(state, action) {
      //제거 시 return 붙여야함, 전체 state가 바뀌는 거여서 그런가봄
      let newArr = state.like.filter((item) => item != action.payload);
      state.like = newArr;
    },
    buyStock(state, action) {
      let idx = state.stock.findIndex(
        (item) => item.srtnCd == action.payload.srtnCd
      );
      console.log(idx);
      if (idx > -1) {
        state.stock[idx].num += action.payload.num;
        state.stock[idx].price = action.payload.price;
        state.stock[idx].totalPrice += action.payload.totalPrice;
        state.stock[idx].date = action.payload.date;
      } else {
        state.stock.push(action.payload);
        state.balance -= action.payload.totalPrice;
      }
    },
  },
});

//함수 export action은 함수와 같은 역할
//export let {함수명} = user.actions;
export default user;
export let { addLike, removeLike, buyStock } = user.actions;
