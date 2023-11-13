import { Console } from "@woowacourse/mission-utils";
import Validate from "./Validate.js";
import { parseMenu } from "./util.js";

const InputView = {
  async getDate() {
    try {
      const input = await Console.readLineAsync(
        "12월 중 식당 예상 방문 날짜는 언제인가요? (숫자만 입력해 주세요!)\n",
      );
      Validate.validateDate(input);
      return +input;
    } catch (e) {
      Console.print(e?.message);
      return this.getDate();
    }
  },

  async getMenu() {
    try {
      const input = await Console.readLineAsync(
        "주문하실 메뉴를 메뉴와 개수를 알려 주세요. (e.g. 해산물파스타-2,레드와인-1,초코케이크-1)\n",
      );
      const menus = parseMenu(input);
      Validate.validateMenu(menus);
      return menus;
    } catch (e) {
      Console.print(e?.message);
      return this.getMenu();
    }
  },
};

export default InputView;
