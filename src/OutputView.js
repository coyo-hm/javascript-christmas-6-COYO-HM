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

  printBenefit(isExistedGift, discountInfo, totalBenefitAmount) {
    Console.print("<혜택 내역>");
    if (totalBenefitAmount === 0) {
      Console.print(`없음`);
    } else {
      discountInfo.forEach(({ label, discount }) =>
        Console.print(`${label}: -${discount.toLocaleString("ko-KR")}원`),
      );
      if (isExistedGift) {
        Console.print(`증정 이벤트: -25,000원`);
      }
    }

    Console.print(" ");
    Console.print("<총혜택 내역>");
    Console.print(`${totalBenefitAmount.toLocaleString("ko-KR")}원\n`);
  },

  printActualPaymentAmount(actualPaymentAmount) {
    Console.print("<할인 후 예상 결제 금액>");
    Console.print(`${actualPaymentAmount.toLocaleString("ko-KR")}원\n`);
  },

  printBadge(badge) {
    Console.print("<12월 이벤트 배지>");
    Console.print(badge);
  },
};

export default OutputView;
