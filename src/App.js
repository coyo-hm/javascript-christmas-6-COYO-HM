import InputView from "./InputView.js";
import OutputView from "./OutputView.js";
import { MENU } from "./constant.js";

class App {
  async run() {
    const date = await InputView.getDate();
    const menus = await InputView.getMenu();
    const totalOrderAmount = this.calcTotalOrderAmount(menus);

    OutputView.printNotice(date);
    OutputView.printMenu(menus);
    OutputView.printTotalOrderAmount(totalOrderAmount);
  }

  calcTotalOrderAmount(menus) {
    return menus.reduce((total, [menu, count]) => {
      const price = MENU.find(({ name }) => menu === name)?.price || 0;

      return total + price * count;
    }, 0);
  }
}

export default App;
