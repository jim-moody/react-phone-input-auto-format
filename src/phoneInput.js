// @flow

type Cursor = {
  start: number,
  end: number
};

export type PhoneInputType = {
  phoneNumber: string,
  cursorPosition: number
};
const INSERT = "insert";
const BACKSPACE = "backspace";

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
  if (isInvalidKey(key)) {
    return false;
  }
  return true;
};

const isSelection = ({ start, end }) => start !== end;

const getPhoneInput = ({ phoneNumber, cursorPosition }) => {
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
    // return phoneInput;
    return getPhoneInput(phoneInput);
  }
  if (isInsertable(phoneNumber, key, _isSelection)) {
    const phoneInput = insert(phoneNumber, cursor, key);
    return getPhoneInput(phoneInput);
  }
  const phoneInput = { phoneNumber, cursorPosition: cursor.start };
  return getPhoneInput(phoneInput);
};

export const backspace = (
  currentPhoneNumber: string,
  cursor: Cursor
): PhoneInputType => {
  const { start, end } = cursor;
  let phoneNumber = currentPhoneNumber;

  // if not selection
  if (!isSelection(cursor) && start > 0) {
    // if previous element is number
    if (currentPhoneNumber[start - 1].match(/[0-9]/)) {
      // remove it
      // concat string and return
      phoneNumber =
        currentPhoneNumber.substring(0, start - 1) +
        phoneNumber.substring(start);
    }
  }

  // if selection
  if (isSelection(cursor)) {
    // get selection string
    const selection = currentPhoneNumber
      .substring(start, end)
      // remove all numbers
      .replace(/\d/g, "");
    // concat beginning / cursorEnd string
    phoneNumber =
      currentPhoneNumber.substring(0, start) +
      selection +
      phoneNumber.substring(end);
  }
  const cursorPosition = getCursorPosition(
    currentPhoneNumber,
    phoneNumber,
    cursor,
    BACKSPACE
  );
  return {
    phoneNumber,
    cursorPosition
  };
};

export const insert = (
  currentPhoneNumber: string,
  cursor: Cursor,
  key: string
): PhoneInputType => {
  const { start, end } = cursor;

  let phoneNumber = currentPhoneNumber;

  // if selection
  if (isSelection(cursor)) {
    phoneNumber = insertChars(currentPhoneNumber, key, cursor);
  }
  // if not selection
  if (!isSelection(cursor)) {
    // concat string before start, key, string after start
    phoneNumber = insertChars(currentPhoneNumber, key, cursor);
  }

  const cursorPosition = getCursorPosition(
    currentPhoneNumber,
    phoneNumber,
    cursor,
    INSERT
  );

  return {
    phoneNumber,
    cursorPosition
  };
};

export const normalize = (phoneNumber: string) =>
  phoneNumber.replace(/\D/g, "");

export const insertChars = (string: string, char: string, cursor: Cursor) =>
  string.substring(0, cursor.start) + char + string.substring(cursor.end);

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

export const getCursorPosition = (
  prevNumber: string,
  newNumber: string,
  cursor: Cursor,
  action: string
): number => {
  // if cursor was at the end, keep it at the end
  if (cursor.start === prevNumber.length) {
    return format(newNumber).length;
  }
  // if cursor was at the beginning, keep it at the beginning
  if (cursor.start === 0) {
    return action === BACKSPACE ? 0 : 1;
  }
  /*
  Here is where we get really tricky. In general, we always want to end up with the same count of numbers to the right of the cursor before/after. So how we do this is like this:
  1. Figure out how many numbers are to the right of the cursor
  2. Figure out how far we have to move the cursor to get the same amount of numbers to the right in the NEW phone number
  3. Return that new cursor position offset from the end of the new phone number
  */
  // Step 1
  const numbersToRightOfCursor = prevNumber
    .substring(cursor.end)
    .match(/[0-9]/g);
  const numberCount = numbersToRightOfCursor
    ? numbersToRightOfCursor.length
    : 0;

  // Step 2
  const trueDiff = getCharacterCountContainingNumberCount(
    format(newNumber),
    numberCount
  );

  // Step 3
  return format(newNumber).length - trueDiff;
};

const getCharacterCountContainingNumberCount = (
  string: string,
  numberCount: number
): number => {
  // reverse the string so we can work from the end
  const arr = string.split("");
  arr.reverse();

  let numberCounter = 0;

  const position = arr.reduce((acc, char) => {
    if (numberCounter === numberCount) {
      return acc;
    }
    if (/[0-9]/.test(char)) {
      numberCounter++;
    }
    return acc + 1;
  }, 0);

  return position;
};
