import { MAX_ORDERED_COUNT, MENU } from "./constant.js";

const Validate = {
  validateDate(input) {
    if (!/^\d+$/g.test(input) || +input < 1 || +input > 31) {
      throw new Error("[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요.");
    }
  },

  isValidCount(count) {
    return !/^\d+$/g.test(count) || +count < 1;
  },

  isValidMenu(menu, orderedMenu) {
    return (
      MENU.every(({ name }) => name !== menu) || orderedMenu.includes(menu)
    );
  },

  isOrderedFood(orderedMenu) {
    return orderedMenu.every(
      (menu) => MENU.find(({ name }) => name === menu)?.type === "음료",
    );
  },

  validateMenu(menus) {
    let menuCount = 0;
    const orderedMenu = [];
    for (const [menu, count] of menus) {
      if (this.isValidCount(count) || this.isValidMenu(menu, orderedMenu)) {
        throw new Error(
          "[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.",
        );
      }
      orderedMenu.push(menu);
      menuCount += +count;
      if (menuCount > MAX_ORDERED_COUNT) {
        throw new Error(
          "[ERROR] 20개 이상 주문할 수 없습니다. 다시 입력해 주세요.",
        );
      }
    }
    if (this.isOrderedFood(orderedMenu)) {
      throw new Error("[ERROR] 음료만 주문할 수 없습니다. 다시 입력해 주세요.");
    }
  },
};

export default Validate;
