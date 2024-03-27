import { createSlice } from "@reduxjs/toolkit";

const initialState={
  currentuser:null,
  error:null,
  loading:false
};

const userSlice=createSlice({
  name:'user',
  initialState,
  reducers:{
    signInStart:(state)=>{
      state.loading=true;
    },
    signInSuccess:(state,action)=>{
      state.currentuser=action.payload;
      state.loading=false;
      state.error=null;
    },
    signInFaliure:(state,action)=>{
      state.error=action.payload;
      state.loading=false;
    }
  }
});

export const {signInFaliure,signInStart,signInSuccess}=userSlice.actions;

export default userSlice.reducer;