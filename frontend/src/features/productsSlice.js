import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import {toast} from 'react-toastify'
import axios from 'axios'
const initialState={
    items:[],
    status:null,
    error:null,
    createStatus:''
}
export const productsFetch=createAsyncThunk(
    "products/productsFetch",
    async (id=null,{rejectWithValue})=>{
        try{
            
            const response= await axios.get("https://shopping-mart-2.onrender.com//api/products");
            // const response= await axios.get("http://localhost:5000/products");
           

      return response?.data;
        }catch(err){
            return rejectWithValue("an error occurred");
        }
      
    }
)
export const productsCreate=createAsyncThunk(
    "products/productsCreate",
    async (values,{rejectWithValue})=>{
        try{
            console.log("enter")
            const response= await axios.post("https://shopping-mart-2.onrender.com//api/products",values,{
                headers:{
                    "x-auth-token":localStorage.getItem("token"),
                }
            });
            // const response= await axios.get("http://localhost:5000/products");
             console.log("exit")
      return response?.data;
        }catch(err){
            console.log("product create api not call")
            return rejectWithValue(err.response.data);
            toast.error(err.response?.data)
        }
      
    }
)
const productsSlice=createSlice({
    name:"products",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(productsFetch.pending,(state,action)=>{
            state.status="pending"
        }).
        addCase(productsFetch.fulfilled,(state,action)=>{
            state.status="fulfilled",
            state.items=action.payload;
            console.log(action.payload)
        }).
        addCase(productsFetch.rejected,(state,action)=>{
            state.status="rejected"
            ,state.error=action.payload
            console.log(action.payload)
        }),
         builder.addCase(productsCreate.pending,(state,action)=>{
            state.createStatus="pending"
        }).
        addCase(productsCreate.fulfilled,(state,action)=>{
            state.createStatus="fulfilled",
            state.items.push(action.payload);
            console.log(action.payload);
            toast.success("Uploaded on Home page",{
                position:'bottom-left'
            });
        }).
        addCase(productsCreate.rejected,(state,action)=>{
            state.createStatus="rejected"
            ,state.error=action.payload
            toast.warn(action.payload)
        })
    }
})
export default productsSlice.reducer;
