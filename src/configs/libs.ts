export const baseURL: string = import.meta.env.VITE_baseURL;
export const accessToken: string = `Bearer ${localStorage.getItem(
   "accessToken"
)}`;
