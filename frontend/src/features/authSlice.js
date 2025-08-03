import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { jwtDecode } from 'jwt-decode'
const initialState = {
    token: localStorage.getItem("token"),
    name: "",        // NAME,ID,EMAIL WE WERE GETTING FROM TOKEN.Token have all this data
    email: "",
    _id: "",
    registerStatus: "",
    registerError: "",
    loginStatus: "",
    loginError: "",
    isAdmin:false,
    userLoaded: false
}
export const registerUser = createAsyncThunk(
    "auth/registerUser",
    async (values, { rejectWithValue }) => {
        console.log("hello")
        try {
            const token = await axios.post("https://shopping-mart-fp9c.onrender.com/api/register", {
                name: values.name,
                email: values.email,
                password: values.password
            })
            localStorage.setItem('token', token.data)
            return token.data;
        } catch (err) {
            console.log(err.response.data)
            return rejectWithValue(err.response.data)          //IN CASE OF REJECTED action.payload CONTAINS IT
        }

    }
)
export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async (values, { rejectWithValue }) => {
        // console.log("hello")
        try {
            const token = await axios.post("https://shopping-mart-fp9c.onrender.com/api/login", {
                email: values.email,
                password: values.password
            })
            localStorage.setItem('token', token.data)
            // localStorage.setItem()
            return token.data;
        } catch (err) {
            console.log(err.response.data)
            return rejectWithValue(err.response.data)          //IN CASE OF REJECTED action.payload CONTAINS IT
        }

    }
)
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {                           // for api involvement or for async actiion we use extra reducers
        loadUser: (state, action) => {
            const token = state.token;
            if (token&&token==='') {
                const user = jwtDecode(token);
                return {
                    ...state,
                    name: user.name,
                    _id: user._id,
                    email: user.email,
                    userLoaded: true
                }
            }
        },
        logoutUser: (state, action) => {
            localStorage.removeItem('token');
            return {
                ...state,
                token: "",
                name: "",        // NAME,ID,EMAIL WE WERE GETTING FROM TOKEN.Token have all this data
                email: "",
                _id: "",
                registerStatus: "",
                registerError: "",
                loginStatus: "",
                loginError: "",
                userLoaded: false
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(registerUser.pending, (state, action) => {
            return { ...state, registerStatus: "pending" }
        }), builder.addCase(registerUser.fulfilled, (state, action) => {
            if (action.payload)    // action.payload CONTAINS OUR token
            {
                const user = jwtDecode(action.payload);
                state.token = action.payload;
                state.name = user.name;
                state.email = user.email;
                state._id = user._id;
                state.registerStatus = "success";
                state.userLoaded = true;
            }
            else return state;
        })
            , builder.addCase(registerUser.rejected, (state, action) => {
                return {
                    ...state,
                    registerStatus: "rejected",
                    registerError: action.payload      //REJECTWITHVALUE COME UNDER ACTION.PAYLOAD
                }
            })
            ,
              builder.addCase(loginUser.pending, (state, action) => {
            return { ...state, loginStatus: "pending" }
        }), builder.addCase(loginUser.fulfilled, (state, action) => {
            if (action.payload)    // action.payload CONTAINS OUR token
            {
                const user = jwtDecode(action.payload);
                state.token = action.payload;
                state.name = user.name;
                state.email = user.email;
                state._id = user._id;
                state.loginStatus = "success";
                state.isAdmin = user.isAdmin;
                state.userLoaded = true;
            }
            else return state;
        })
            , builder.addCase(loginUser.rejected, (state, action) => {
                return {
                    ...state,
                    loginStatus: "rejected",
                    loginError: action.payload      //REJECTWITHVALUE COME UNDER ACTION.PAYLOAD
                }
            })
    }



})
export const { loadUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;