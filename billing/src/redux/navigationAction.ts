export const SET_PAGE = "SET_PAGE";
export const SET_SIDE_BAR = "SET_SIDE_BAR";
export const SET_SUB_MENU = "SET_SUB_MENU";

export const setPage = (page: string) => ({
  type: SET_PAGE,
  payload: page,
});

export const setSideBar = (menu: string) => ({
  type: SET_SIDE_BAR,
  payload: menu,
});


export const setSubmenu = (submenu: string) => ({
  type: "SET_SUB_MENU",
  payload: submenu,
});