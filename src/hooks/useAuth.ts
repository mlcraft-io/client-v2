import { create } from "zustand";

const useAuthStore = create((set) => ({
  token: null,
  setToken: (token: string) => set(() => ({ token })),
  removeToken: () => set({ token: null }),
}));

export default useAuthStore;
