// src/store/userStore.ts
import { create } from "zustand";
import { User } from "../types/user";
import api from "../api/apiClients"; // points to your User Service
import { useAuthStore } from "./authStore";




interface UserState {
  user: User | null;
  loading: boolean;
  error: string | null;
  fetchUserInfo: () => Promise<void>;
  clearUser: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  loading: false,
  error: null,

  // fetch user data after login
  fetchUserInfo: async () => {
    const username = useAuthStore.getState().username;
    const token = useAuthStore.getState().token;
    if (!token) {
      console.warn("No token found — user not logged in");
      return;
    }
    try {
      set({ loading: true, error: null });
      console.log("Fetching user info from:", `/users/${username}`);
      // route has been changed by P guy
      const response = await api.get(`/users/${username}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      set({ user: response.data, loading: false });
    } catch (err: any) {
      console.error("Failed to fetch user info:", err);
      set({ error: err.message, loading: false });
    }
  },

  clearUser: () => set({ user: null, loading: false, error: null }),
}));

// useAuthStore.subscribe((state) => {
//   const token = state.token;
//   if (token) {
//     useUserStore.getState().fetchUserInfo();
//   } else {
//     useUserStore.getState().clearUser();
//   }
// });

// const initialToken = useAuthStore.getState().token;
// if (initialToken) {
//   useUserStore.getState().fetchUserInfo();
// }
