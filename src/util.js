export const parseMenu = (menuStr = "") => {
  const menus = menuStr.split(",");
  return menus.map((row) => row.split("-"));
};
