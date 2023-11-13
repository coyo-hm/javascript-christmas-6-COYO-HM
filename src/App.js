import InputView from "./InputView.js";
import OutputView from "./OutputView.js";
import { GIFT_THRESHOLD_AMOUNT, MENU } from "./constant.js";

class App {
  async run() {
    const date = await InputView.getDate();
    const menus = await InputView.getMenu();
    const totalOrderAmount = this.calcTotalOrderAmount(menus);
    const isExistedGift = totalOrderAmount >= GIFT_THRESHOLD_AMOUNT;
    const discountInfo = [{label:"크리스마스 디데이 할인", discount: this.calcChristmasDiscounts(+date)}]

    OutputView.printNotice(date);
    OutputView.printMenu(menus);
    OutputView.printTotalOrderAmount(totalOrderAmount);
    OutputView.printGift(isExistedGift);
  }

  parseMenu = (menuStr = "") => {
    const menus = menuStr.split(",");
    return menus.map((row) => row.split("-"));
  };

  calcTotalOrderAmount(menus) {
    return menus.reduce((total, [menu, count]) => {
      const price = MENU.find(({ name }) => menu === name)?.price || 0;

      return total + price * count;
    }, 0);
  }

  calcChristmasDiscounts(date) {
    return date < 26 ? 900 + date * 100 : 0;
  }
}

export default App;
