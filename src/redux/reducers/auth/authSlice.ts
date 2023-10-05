import { createSlice } from '@reduxjs/toolkit'
import { initialState } from './initialstate';
import MyCookies from '@/hooks/MyCookies';
import MY_COOKIES_FILEDS from '@/hooks/MyCookies/fileds';

const myCookies = MyCookies();

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    getToken: (state) => {
      const tokenCookies: string | undefined = myCookies.getToken();
      state.token = tokenCookies != undefined ? tokenCookies : null;;
    },

    setToken: (state, action) => {
      myCookies.setToken(action.payload)
      getToken()
    },
    logout: (state,) => {
      myCookies.removeAll([MY_COOKIES_FILEDS.TOKEN])
      state.token = null
      window.location.replace('auth/login')
    },
  },
},
)

export const { getToken, setToken, logout } = authSlice.actions;

export default authSlice.reducer



