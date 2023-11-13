import InputView from "./InputView.js";
import OutputView from "./OutputView.js";
import {
  DAY_DISCOUNT_AMOUNT,
  GIFT_THRESHOLD_AMOUNT,
  MENU,
} from "./constant.js";

class App {
  async run() {
    const date = await InputView.getDate();
    const menus = await InputView.getMenu();
    const totalOrderAmount = this.calcTotalOrderAmount(menus);
    const isExistedGift = totalOrderAmount >= GIFT_THRESHOLD_AMOUNT;
    const discountInfo = this.getDiscountInfo(
      +date,
      this.getMenuInfoList(menus),
    );

    OutputView.printNotice(date);
    OutputView.printMenu(menus);
    OutputView.printTotalOrderAmount(totalOrderAmount);
    OutputView.printGift(isExistedGift);
  }

  parseMenu(menuStr = "") {
    const menus = menuStr.split(",");
    return menus.map((row) => row.split("-"));
  }

  isWeekend(date) {
    const day = new Date(2023, 11, date).getDay();
    return day === 5 || day === 6;
  }

  calcTotalOrderAmount(menus) {
    return menus.reduce((total, [menu, count]) => {
      const price = MENU.find(({ name }) => menu === name)?.price || 0;

      return total + price * count;
    }, 0);
  }

  calcChristmasDiscounts(date) {
    return date < 26 ? 900 + date * 100 : 0;
  }

  getMenuInfoList(menus) {
    return menus.map(([menu, count]) => ({
      ...MENU.find(({ name }) => name === menu),
      count: +count,
    }));
  }

  getDiscountInfo(date, menus) {
    const discountInfo = [];
    const christmasDiscounts = this.calcChristmasDiscounts(date);
    if (christmasDiscounts > 0) {
      discountInfo.push({
        label: "크리스마스 디데이 할인",
        discount: christmasDiscounts,
      });
    }

    if (this.isWeekend(date)) {
      const discount = menus.reduce(
        (total, menu) =>
          menu.type === "메인" ? total + DAY_DISCOUNT_AMOUNT : total,
        0,
      );
      if (discount > 0) {
        discountInfo.push({ label: "주말 할인", discount: discount });
      }
    } else {
      const discount = menus.reduce(
        (total, menu) =>
          menu.type === "디저트" ? total + DAY_DISCOUNT_AMOUNT : total,
        0,
      );
      if (discount > 0) {
        discountInfo.push({ label: "평일 할인", discount: discount });
      }
    }

    return discountInfo;
  }
}

export default App;
