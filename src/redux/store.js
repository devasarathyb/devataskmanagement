import { configureStore } from "@reduxjs/toolkit";
import { boardSlice } from "./boardSlice";

const store = configureStore({
    reducer : {
        //reduce slices
        boards : boardSlice.reducer,
    }
    
})


export default store;
