// @flow

type Cursor = {
  start: number,
  end: number
};
export type PhoneInputType = {
  phoneNumber: string,
  cursorPosition: number
};
const formatPhoneInput = ({ phoneNumber, cursorPosition }) => {
  return {
    phoneNumber: format(phoneNumber),
    cursorPosition
  };
};

export const update = (
  phoneNumber: string,
  cursor: Cursor,
  key: string
): PhoneInputType => {
  const _isSelection = isSelection(cursor);

  if (key === "Backspace") {
    const phoneInput = backspace(phoneNumber, cursor);
    return formatPhoneInput(phoneInput);
  }
  if (isInsertable(phoneNumber, key, _isSelection)) {
    const phoneInput = insert(phoneNumber, cursor, key);
    return formatPhoneInput(phoneInput);
  }
  const phoneInput = { phoneNumber, cursorPosition: cursor.start };
  return formatPhoneInput(phoneInput);
};

export const isInvalidKey = (key: string) => {
  if (key === "Backspace") {
    return false;
  }
  if (/[0-9]/.test(key)) {
    return false;
  }
  return true;
};
const isInsertable = (phoneNumber, key, isSelection) => {
  if (normalize(phoneNumber).length === 10 && !isSelection) {
    return false;
  }
  return !isInvalidKey(key);
};

const isSelection = ({ start, end }) => start !== end;

export const backspace = (
  phoneNumber: string,
  cursor: Cursor
): PhoneInputType => {
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

      let diff = format(phoneNumber).length - format(newPhoneNumber).length;
      console.log(diff);
      if (diff > 1) {
        newCursorPosition -= diff - 2;
        if (newCursorPosition < 0) {
          newCursorPosition = 0;
        }
      }
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
  }
  let diff = format(phoneNumber).length - format(newPhoneNumber).length;
  console.log(diff);
  if (diff > 1) {
    newCursorPosition -= diff - 2;
    if (newCursorPosition < 0) {
      newCursorPosition = 0;
    }
  }
  return {
    phoneNumber: newPhoneNumber,
    cursorPosition: newCursorPosition
  };
};

export const insert = (
  phoneNumber: string,
  cursor: Cursor,
  key: string
): PhoneInputType => {
  const { start, end } = cursor;

  let newPhoneNumber = phoneNumber;
  let diff = 1;

  // if selection
  if (isSelection(cursor)) {
    newPhoneNumber = insertChars(phoneNumber, key, start, end);
  }
  // if not selection
  if (!isSelection(cursor)) {
    // concat string before start, key, string after start
    newPhoneNumber = insertChars(phoneNumber, key, start, end);
    diff = format(newPhoneNumber).length - format(phoneNumber).length;
  }

  return {
    phoneNumber: newPhoneNumber,
    cursorPosition: start + diff
  };
};

export const normalize = (phoneNumber: string) => {
  return phoneNumber.replace(/\D/g, "");
};

export const insertChars = (
  string: string,
  char: string,
  start: number,
  end: number
) => string.substring(0, start) + char + string.substring(end);

export const format = (rawPhoneNumber: string) => {
  const phoneNumber = normalize(rawPhoneNumber);

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
