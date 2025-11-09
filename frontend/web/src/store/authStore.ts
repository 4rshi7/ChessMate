import { create } from 'zustand';
import api, { setAuthToken } from '../api/apiClients';


type AuthState = {
  token?: string | null;
  tempToken?: string | null;
  username?: string | null;
  loading: boolean;
  login: () => Promise<void>;
  logout: () => void;
  setToken: (token?: string | null) => void;
  setTempToken: (tempToken?: string | null) => void;
  setUserName:(userName: string)=>void;
};

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  username: null,
  tempToken: null,
  loading: false,
  setUserName:(username)=>{
    set({username});
     if (username) {
    localStorage.setItem("username", username);
  } else {
    localStorage.removeItem("username");
  }
  },
  setTempToken:(tempToken) => {
    set({ tempToken });
  },
  setToken: (token) => {
    set({ token });
    // axios handler
    setAuthToken(token || undefined);
    if(token){
       localStorage.setItem("token", token);
    }
    else { 
      localStorage.removeItem("token");
      };
  },
login: async () => {
  // redirect browser to backend OAuth route
  window.location.href = `${import.meta.env.VITE_AUTH_BASE_URL}/auth/login/federated/google`;
},
  logout: () => {
    setAuthToken(undefined);
    set({ token: null});
  },
}));


const savedToken = localStorage.getItem("token");
const savedUsername = localStorage.getItem("username");

if (savedToken) {
  useAuthStore.getState().setToken(savedToken);
}
if (savedUsername) {
  useAuthStore.getState().setUserName(savedUsername);
}