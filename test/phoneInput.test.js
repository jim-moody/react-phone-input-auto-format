import {
  backspace,
  insert,
  normalize,
  update,
  format,
  getCursorOnBackspace
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
      phoneNumber: "(23) 456-7890",
      cursorPosition: 1
    };

    expect(backspace(fullPhone, cursor)).toEqual(expected);
  });

  test("it removes all characters from a numeric selection", () => {
    const cursor = { start: 1, end: 3 };
    const expected = {
      phoneNumber: "(3) 456-7890",
      cursorPosition: 1
    };

    expect(backspace(fullPhone, cursor)).toEqual(expected);
  });

  test("it removes only numeric characters from a mixed selection", () => {
    const cursor = { start: 0, end: 3 };
    const expected = {
      phoneNumber: "(3) 456-7890",
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
      phoneNumber: "(123) 56-7",
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
      phoneNumber: "(123) 4568-789",
      cursorPosition: 10
    };
    expect(insert(phone, cursor, key)).toEqual(expected);
  });

  test("it replaces the selection with the number when there is a selection", () => {
    const phone = "(123) 456";
    const cursor = { start: 1, end: 5 };
    const key = "4";

    const expected = {
      phoneNumber: "(4 456",
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
      cursorPosition: 2
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

describe("getCursorOnBackspace", () => {
  test("returns correct cursor position when formatting changes length", () => {
    const phone1 = "(123) 456-7";
    const phone2 = "123-567";
    const cursor = 7;

    expect(getCursorOnBackspace(phone1.length, phone2.length, cursor)).toBe(4);
  });
  test("returns correct cursor position when formatting changes length and is a selection", () => {
    const phone1 = "(123) 456-7";
    const phone2 = "123-567";
    const cursor = 7;
  });
});
