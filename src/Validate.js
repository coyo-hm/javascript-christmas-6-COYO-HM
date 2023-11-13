const Validate = {
  validateDate(date) {
    if (!/^\d+$/g.test(date)) {
      throw new Error("[ERROR] 방문 날짜는은 숫자로 입력하셔야 합니다.");
    } else if (+date < 1 || +date > 31) {
      throw new Error("[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요.");
    }
  },
};

export default Validate;
