import App from "../src/App.js";

describe("어플리케이션 로직 테스트", () => {
  const app = new App();
  const menuInfo = [
    { name: "티본스테이크", price: 55000, type: "메인", count: 1 },
    { name: "바비큐립", price: 54000, type: "메인", count: 1 },
    { name: "초코케이크", price: 15000, type: "디저트", count: 2 },
    { name: "제로콜라", price: 3000, type: "음료", count: 1 },
  ];

  test("2일을 입력할 경우 주말이라 판단", () => {
    expect(app.isWeekend(2)).toBeTruthy();
  });

  test("2일을 입력할 경우 star day가 아니라고(false) 출력", () => {
    expect(app.isStarDate(2)).toBeFalsy();
  });

  test("메뉴 티본스테이크-1,바비큐립-1,초코케이크-2,제로콜라-1을 입력할 경우 142000 출력", () => {
    expect(
      app.calcTotalOrderAmount([
        ["티본스테이크", "1"],
        ["바비큐립", "1"],
        ["초코케이크", "2"],
        ["제로콜라", "1"],
      ]),
    ).toBe(142000);
  });

  test("3일에 메뉴 티본스테이크-1,바비큐립-1,초코케이크-2,제로콜라-1을 입력할 경우 크리스마스 할인가격은 1200 정보", () => {
    expect(app.calcChristmasDiscounts(3)).toBe(1200);
  });

  test("3일에 메뉴 티본스테이크-1,바비큐립-1,초코케이크-2,제로콜라-1을 입력할 경우 평일 할인가격은 4046 정보", () => {
    expect(app.calcWeekdaysDiscount(menuInfo)).toBe(4046);
  });

  test("3일에 메뉴 티본스테이크-1,바비큐립-1,초코케이크-2,제로콜라-1을 입력할 경우 할인 정보", () => {
    expect(app.getDiscountInfo(3, menuInfo)).toStrictEqual([
      { label: "크리스마스 디데이 할인", discount: 1200 },
      { label: "평일 할인", discount: 4046 },
      { label: "특별 할인", discount: 1000 },
    ]);
  });

  test("3일에 메뉴 티본스테이크-1,바비큐립-1,초코케이크-2,제로콜라-1을 입력할 경우 할인 금액 6246", () => {
    expect(
      app.calcDiscountAmount([
        { label: "크리스마스 디데이 할인", discount: 1200 },
        { label: "평일 할인", discount: 4046 },
        { label: "특별 할인", discount: 1000 },
      ]),
    ).toBe(6246);
  });

  test("총 혜택 금액이 31246원일 경우 이벤트 뱃지는 산타여야 함", () => {
    expect(app.getEventBadge(31246)).toBe("산타");
  });
});
