import create from "zustand";

export const useModalStore = create((set) => ({
  isOpen: false,
  todoId: "",

  setTodoId: (id) => set((state) => ({ todoId: state })),

  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
}));
