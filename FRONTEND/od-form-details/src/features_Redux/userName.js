// import { createSlice } from "@reduxjs/toolkit";


// const initialState={
//     uname:'Suganth',
//     id_num:0,
//     obj:{}
// }

// export const userNameSlice = createSlice({
//     name:"UserName",
//     initialState,
//     reducers:{
//         modifyName:(state,action)=>{
//             state.uname=action.payload
//         },
//         modifyUID:(state,action)=>{
//             state.id_num=action.payload
//         },
//         modifyObj:(state,action)=>{
//             state.obj=action.payload
//         }

//     }
// })


// export const {modifyName,modifyUID,modifyObj} = userNameSlice.actions;

// export default userNameSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    uname: '',
    id_num: 0,
    obj: {},
    detail_obj:{}
};

export const userNameSlice = createSlice({
    name: 'UserName',
    initialState,
    reducers: {
        modifyName: (state, action) => {
            state.uname = action.payload;
        },
        modifyUID: (state, action) => {
            state.id_num = action.payload;
        },
        modifyObj: (state, action) => {
            state.obj = action.payload;
        },
        modifydetail_obj:(state,action)=>{
            state.detail_obj=action.payload;
        }
    },
});

export const { modifyName, modifyUID, modifyObj,modifydetail_obj } = userNameSlice.actions;

export default userNameSlice.reducer;
