import InputView from "./InputView.js";
import OutputView from "./OutputView.js";

class App {
  async run() {
    const date = await InputView.getDate();
    const menus = await InputView.getMenu();

    OutputView.printNotice(date);
    OutputView.printMenu(menus);
  }
}

export default App;
