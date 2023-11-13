import { Console } from "@woowacourse/mission-utils";
const OutputView = {
  printNotice(date) {
    Console.print(
      `12월 ${date}일에 우테코 식당에서 받을 이벤트 혜택 미리 보기!\n`,
    );
  },

  printMenu(menus) {
    Console.print("<주문 메뉴>");
    menus.forEach((m) => Console.print(`${m[0]} ${m[1]}개`));
    Console.print(" ");
  },

  printTotalOrderAmount(price) {
    Console.print("<할인 전 총주문 금액>");
    Console.print(`${price.toLocaleString("ko-KR")}원`);
    Console.print(" ");
  },

  printGift(isExistedGift) {
    Console.print("<증정 메뉴>");
    Console.print(`${isExistedGift ? "샴페인 1개" : "없음"}\n`);
  },
};

export default OutputView;
