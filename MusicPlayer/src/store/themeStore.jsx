import { create } from 'zustand';

export const useThemeStore = create((set) => ({
  isDarkMode: true, //default value of isDarkMode
  toggleTheme: (value) =>
    set((state) => ({ isDarkMode: value ? value : !state.isDarkMode })),
  removeAllBears: () => set({ bears: 0 }),
}));
