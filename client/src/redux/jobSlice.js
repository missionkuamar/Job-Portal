import { createSlice } from "@reduxjs/toolkit"

const jobSlice = createSlice({
    name: "job",
    initialState:{
        alljobs:[],
    },
    reducers:{
        //actions
        setAlljobs:(state, action) =>{
            state.alljobs = action.payload;
        }
    }
});
export const {setAlljobs} = jobSlice.actions;
export default jobSlice.reducer;