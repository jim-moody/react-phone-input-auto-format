// @flow

type Cursor = {
  start: number,
  end: number
}
export type PhoneInputType = {
  phoneNumber: string,
  cursorPosition: number
}
export const update = (prevPhoneNumber: string, cursor: Cursor, key: string) => {
  if (key === "Backspace") {
    return backspace(prevPhoneNumber, cursor);
  }
  if (isInvalidInsert(prevPhoneNumber, key)) {
    return {
      phoneNumber: prevPhoneNumber,
      cursorPosition: cursor.start
    }
  }
  if (/[0-9]/.test(key)) {
    return insert(prevPhoneNumber, cursor, key);
  }
};
const isInvalidInsert = (phoneNumber, key) => {
  if (normalize(phoneNumber).length === 10) {
    return true
  }
  if(/[^0-9]/.test(key)) {
    return true
  }
  return false
}
const isSelection = ({ start, end }) => start !== end;

export const backspace = (phoneNumber: string, cursor: Cursor): PhoneInputType => {
  const { start, end } = cursor;
  let newCursorPosition = start;
  let newPhoneNumber = phoneNumber;

  // if not selection
  if (!isSelection(cursor) && start > 0) {
    // set cursor pusition to -1
    newCursorPosition -= 1;
    // if previous element is number
    if (phoneNumber[start - 1].match(/[0-9]/)) {
      // remove it
      // concat string and return
      newPhoneNumber =
        phoneNumber.substring(0, start - 1) + phoneNumber.substring(start);
    }
  }

  // if selection
  if (isSelection(cursor)) {
    // get selection string
    const selection = phoneNumber
      .substring(start, end)
      // remove all numbers
      .replace(/\d/g, "");
    // concat beginning / cursorEnd string
    newPhoneNumber =
      phoneNumber.substring(0, start) + selection + phoneNumber.substring(end);
    // set cursor position to whatever it was before
  }

  return {
    phoneNumber: newPhoneNumber,
    cursorPosition: newCursorPosition
  };
};

export const insert = (phoneNumber: string, cursor: Cursor, key: string): PhoneInputType => {
  const { start, end } = cursor;

  let newPhoneNumber = phoneNumber;
  let newCursorPosition = start + 1;

  // if selection
  if (isSelection(cursor)) {
    newPhoneNumber = insertChars(phoneNumber, key, start, end);
  }
  // if not selection
  if (!isSelection(cursor)) {
    // concat string before start, key, string after start
    newPhoneNumber = insertChars(phoneNumber, key, start, end);
  }

  return {
    phoneNumber: newPhoneNumber,
    cursorPosition: newCursorPosition
  };
};

export const normalize = (phoneNumber: string) => {
  return phoneNumber.replace(/\D/g, "");
};

export const insertChars = (string: string, char: string, start: number, end: number) =>
  string.substring(0, start) + char + string.substring(end);

export const format = (phoneNumber: string) => {
  const partA = phoneNumber.substring(0, 3);
  const partB = phoneNumber.substring(3, 6);
  const partC = phoneNumber.substring(6, 11);

  // 2345678  =>  234-567-8
  if (partC) {
    return `(${partA}) ${partB}-${partC}`;
  }
  // 2345 => 234-5
  if (partB) {
    return `${partA}-${partB}`;
  }
  // if partA
  return phoneNumber;
};
