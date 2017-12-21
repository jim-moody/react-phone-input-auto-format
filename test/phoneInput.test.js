import {
  backspace,
  insert,
  normalize,
  update,
  format,
  getCharCountFromEndWithNumbers
} from "../src/phoneInput";

const fullPhone = "(123) 456-7890";

describe("backspace", () => {
  test("it moves cursor to the left when trying to delete a paren", () => {
    const cursor = { start: 1, end: 1 };

    const expected = {
      phoneNumber: fullPhone,
      cursorPosition: 0
    };

    expect(backspace(fullPhone, cursor)).toEqual(expected);
  });
  test("it moves cursor to the left when trying to delete a hyphen", () => {
    const cursor = { start: 10, end: 10 };

    const expected = {
      phoneNumber: fullPhone,
      cursorPosition: 9
    };

    expect(backspace(fullPhone, cursor)).toEqual(expected);
  });
  test("it moves cursor to the left when trying to delete a space", () => {
    const cursor = { start: 5, end: 5 };

    const expected = {
      phoneNumber: fullPhone,
      cursorPosition: 4
    };

    expect(backspace(fullPhone, cursor)).toEqual(expected);
  });
  test("it does not change the cursor position when it is 0", () => {
    expect(backspace(fullPhone, { start: 0, end: 0 }));
  });

  test("it deletes the previous number when there is a number", () => {
    const cursor = { start: 2, end: 2 };

    const expected = {
      phoneNumber: "(234) 567-890",
      cursorPosition: 1
    };

    expect(backspace(fullPhone, cursor)).toEqual(expected);
  });

  test("it removes all characters from a numeric selection", () => {
    const cursor = { start: 1, end: 3 };
    const expected = {
      phoneNumber: "(345) 678-90",
      cursorPosition: 1
    };

    expect(backspace(fullPhone, cursor)).toEqual(expected);
  });

  test("it removes only numeric characters from a mixed selection", () => {
    const cursor = { start: 0, end: 3 };
    const expected = {
      phoneNumber: "(345) 678-90",
      cursorPosition: 0
    };

    expect(backspace(fullPhone, cursor)).toEqual(expected);
  });

  test("it doesnt remove any characters from an all non-numeric selection", () => {
    const cursor = { start: 4, end: 6 };
    const expected = {
      phoneNumber: fullPhone,
      cursorPosition: 4
    };

    expect(backspace(fullPhone, cursor)).toEqual(expected);
  });

  test("it sets the cursor at the correct position when the phone number changes dramatically after formatting", () => {
    const phoneNumber = "(123) 456-7";
    const cursor = { start: 7, end: 7 };
    const expected = {
      phoneNumber: "123-567",
      cursorPosition: 4
    };
    expect(backspace(phoneNumber, cursor)).toEqual(expected);
  });
});

describe("insert", () => {
  test("it adds the number at the specified position when there is no selection", () => {
    const phone = "(123) 456-789";
    const cursor = { start: 9, end: 9 };
    const key = "8";
    const expected = {
      phoneNumber: "(123) 456-8789",
      cursorPosition: 11
    };
    expect(insert(phone, cursor, key)).toEqual(expected);
  });

  test("it replaces the selection with the number when there is a selection", () => {
    const phone = "123-456";
    const cursor = { start: 1, end: 5 };
    const key = "4";

    const expected = {
      phoneNumber: "145-6",
      cursorPosition: 2
    };
    expect(insert(phone, cursor, key)).toEqual(expected);
  });
  test("replaces the selection with the number when the entire number is selected", () => {
    const cursor = { start: 0, end: 14 };
    const key = "2";
    const expected = {
      phoneNumber: "2",
      cursorPosition: 1
    };
    expect(insert(fullPhone, cursor, key)).toEqual(expected);
  });
});

describe("normalize", () => {
  test("removes all non-numeric characters", () => {
    const phoneNumber = "(123) 456-7890";

    expect(normalize(phoneNumber)).toBe("1234567890");
  });
});

describe("update", () => {
  test("returns phone number unchanged when there are already 10 digits", () => {
    const cursor = { start: 1, end: 1 };
    const key = "3";
    const expected = {
      phoneNumber: fullPhone,
      cursorPosition: 1
    };
    expect(update(fullPhone, cursor, key)).toEqual(expected);
  });

  test("calls insert function when a number is entered", () => {
    const phone = "1231231";
    const cursor = { start: 1, end: 1 };
    const expected = {
      phoneNumber: "(132) 312-31",
      cursorPosition: 3
    };

    expect(update(phone, cursor, "3")).toEqual(expected);
  });
  test("it sets the cursor at the correct position when the phone number changes dramatically after formatting", () => {
    const phoneNumber = "(123) 456-7";
    const cursor = { start: 7, end: 7 };
    const expected = {
      phoneNumber: "123-567",
      cursorPosition: 4
    };

    expect(update(phoneNumber, cursor, "Backspace")).toEqual(expected);
  });
});

describe("getCharCountFromEndWithNumbers", () => {
  test("returns a count of 6 characters when there is one extra non-numeric character within a group of 5 numbers at the end of string", () => {
    const string = "(123) 456-7890";
    const numberCount = 5;
    expect(getCharCountFromEndWithNumbers(string, numberCount)).toBe(6);
  });
  test("returns the same count as the number count when there are no non-numeric characters within a group of 4 numbers", () => {
    const string = "(123) 456-7890";
    const numberCount = 4;
    expect(getCharCountFromEndWithNumbers(string, numberCount)).toBe(4);
  });

  test("returns a count of 11 when there are 3 non-numeric characters within a group of 8 numbers at the end of string", () => {
    const string = "(123) 456-7890";
    const numberCount = 8;
    expect(getCharCountFromEndWithNumbers(string, numberCount)).toBe(11);
  });

  test("returns a count of 0 when there are no numeric characters within a string", () => {
    const string = "asdfg";
    const numberCount = 1;
    expect(getCharCountFromEndWithNumbers(string, numberCount)).toBe(0);
  });
  test("returns count equal to the number count when the string is all numeric characters", () => {
    const string = "12345";
    const numberCount = 5;
    expect(getCharCountFromEndWithNumbers(string, numberCount)).toBe(5);
  });
});
