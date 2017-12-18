import { backspace, insert, normalize, update } from "./phoneInput";

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
});

describe("normalize", () => {
  test("removes all non-numeric characters", () => {
    const phoneNumber = "(123) 456-7890";

    expect(normalize(phoneNumber)).toBe("1234567890");
  });
});

describe("update", () => {
  test("returns phone number unchanged when there are already 10 digits", () => {
    expect(update(fullPhone)).toBe(fullPhone);
  });
  test("calls insert function when a number is entered", () => {
    const phone = "1231231";
    const cursor = { start: 1, end: 1 };

    expect(update(phone, cursor, "3")).toEqual(insert(phone, cursor, "3"));
  });
});
