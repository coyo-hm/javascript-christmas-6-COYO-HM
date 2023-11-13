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

  printBenefit(isExistedGift, discountInfo, discountAmount) {
    Console.print("<혜택 내역>");
    discountInfo.forEach(({ label, discount }) =>
      Console.print(`${label}: -${discount.toLocaleString("ko-KR")}원`),
    );
    if (isExistedGift) {
      Console.print(`증정 이벤트: -25,000원`);
    } else if (discountAmount === 0) {
      Console.print(`없음`);
    }
    Console.print(" ");

    Console.print("<총혜택 내역>");
    const price = isExistedGift ? 25000 + discountAmount : discountAmount;
    Console.print(`${discountAmount.toLocaleString("ko-KR")}원\n`);
  },
};

export default OutputView;
