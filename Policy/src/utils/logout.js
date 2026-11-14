export const logout = () => {
  // Remove JWT token
  localStorage.removeItem("token");
};
