import { Console } from "@woowacourse/mission-utils";
const OutputView = {
  printNotice(date) {
    Console.print(
      `12월 ${date}일에 우테코 식당에서 받을 이벤트 혜택 미리 보기!`,
    );
  },
  printMenu(menus) {
    Console.print("<주문 메뉴>");
    menus.forEach((m) => Console.print(`${m[0]} ${m[1]}개`));
  },
  // ...
};

export default OutputView;
