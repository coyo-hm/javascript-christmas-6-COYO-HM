import Validate from "./Validate.js";

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
};

export default InputView;
