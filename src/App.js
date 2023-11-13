import InputView from "./InputView.js";
import OutputView from "./OutputView.js";

class App {
  async run() {
    const date = InputView.getDate();
    const menus = InputView.getMenu();

    OutputView.printNotice(date);
    OutputView.printMenu(menus);
  }
}

export default App;
