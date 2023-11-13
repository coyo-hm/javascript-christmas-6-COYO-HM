import InputView from "./InputView.js";
import OutputView from "./OutputView.js";
import {
  DAY_DISCOUNT_AMOUNT,
  GIFT_THRESHOLD_AMOUNT,
  MENU,
  STAR_DAY_DISCOUNT_AMOUNT,
} from "./constant.js";

class App {
  async run() {
    const date = await InputView.getDate();
    const menus = await InputView.getMenu();
    const totalOrderAmount = this.calcTotalOrderAmount(menus);
    const isExistedGift = totalOrderAmount >= GIFT_THRESHOLD_AMOUNT;
    const discountInfo = this.getDiscountInfo(
      +date,
      this.getMenuInfoList(menus),
    );
    const discountAmount = this.calcDiscountAmount(discountInfo);
    const totalBenefitAmount = isExistedGift
      ? 25000 + discountAmount
      : discountAmount;
    const actualPaymentAmount = totalOrderAmount - discountAmount;
    const badge = this.getEventBadge(totalBenefitAmount);

    OutputView.printNotice(date);
    OutputView.printMenu(menus);
    OutputView.printTotalOrderAmount(totalOrderAmount);
    OutputView.printGift(isExistedGift);
    OutputView.printBenefit(isExistedGift, discountInfo, totalBenefitAmount);
    OutputView.printActualPaymentAmount(actualPaymentAmount);
    OutputView.printBadge(badge);
  }

  parseMenu(menuStr = "") {
    const menus = menuStr.split(",");
    return menus.map((row) => row.split("-"));
  }

  isWeekend(date) {
    const day = new Date(2023, 11, date).getDay();
    return day === 5 || day === 6;
  }

  isStarDate(date) {
    const day = new Date(2023, 11, date).getDay();
    return day === 0 || date === 25;
  }

  calcTotalOrderAmount(menus) {
    return menus.reduce((total, [menu, count]) => {
      const price = MENU.find(({ name }) => menu === name)?.price || 0;

      return total + price * count;
    }, 0);
  }

  calcDiscountAmount(discountInfo) {
    return discountInfo.reduce((total, { discount }) => total + discount, 0);
  }

  calcChristmasDiscounts(date) {
    return date < 26 ? 900 + date * 100 : 0;
  }

  calcWeekendDiscount(menus) {
    return menus.reduce(
      (total, menu) =>
        menu.type === "메인" ? total + DAY_DISCOUNT_AMOUNT : total,
      0,
    );
  }
  calcWeekdaysDiscount(menus) {
    return menus.reduce(
      (total, menu) =>
        menu.type === "디저트" ? total + DAY_DISCOUNT_AMOUNT : total,
      0,
    );
  }

  getMenuInfoList(menus) {
    return menus.map(([menu, count]) => ({
      ...MENU.find(({ name }) => name === menu),
      count: +count,
    }));
  }

  getDiscountInfo(date, menus) {
    const discountInfo = [];
    const christmasDiscounts = this.calcChristmasDiscounts(date);
    if (christmasDiscounts > 0) {
      discountInfo.push({
        label: "크리스마스 디데이 할인",
        discount: christmasDiscounts,
      });
    }
    const dayDiscount = this.isWeekend(date)
      ? this.calcWeekendDiscount(menus)
      : this.calcWeekdaysDiscount(menus);
    if (dayDiscount > 0) {
      discountInfo.push({
        label: this.isWeekend(date) ? "주말 할인" : "평일 할인",
        discount: dayDiscount,
      });
    }
    if (this.isStarDate(date)) {
      discountInfo.push({
        label: "특별 할인",
        discount: STAR_DAY_DISCOUNT_AMOUNT,
      });
    }
    return discountInfo;
  }

  getEventBadge(totalBenefitAmount) {
    if (totalBenefitAmount >= 20000) {
      return "산타";
    }
    if (totalBenefitAmount >= 10000) {
      return "트리";
    }
    if (totalBenefitAmount >= 5000) {
      return "별";
    }
    return "없음";
  }
}

export default App;
