import InputView from "./InputView.js";
import OutputView from "./OutputView.js";
import { GIFT_THRESHOLD_AMOUNT, MENU } from "./constant.js";

class App {
  async run() {
    const date = await InputView.getDate();
    const menus = await InputView.getMenu();
    const totalOrderAmount = this.calcTotalOrderAmount(menus);
    const isExistedGift = totalOrderAmount >= GIFT_THRESHOLD_AMOUNT;

    OutputView.printNotice(date);
    OutputView.printMenu(menus);
    OutputView.printTotalOrderAmount(totalOrderAmount);
    OutputView.printGift(isExistedGift);
  }

  calcTotalOrderAmount(menus) {
    return menus.reduce((total, [menu, count]) => {
      const price = MENU.find(({ name }) => menu === name)?.price || 0;

      return total + price * count;
    }, 0);
  }
}

export default App;
