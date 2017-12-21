// @flow
const INSERT = "insert";
const BACKSPACE = "backspace";

type Cursor = {
  start: number,
  end: number
};

type PhoneInputType = {
  phoneNumber: string,
  cursorPosition: number
};

export const isInvalidKey = (key: string) => {
  // we can let them backspace all day
  if (key === "Backspace") {
    return false;
  }
  // any numeric digit is fine
  if (/[0-9]/.test(key)) {
    return false;
  }
  // anything else defaults to native input handling
  return true;
};
const isInsertable = (phoneNumber, key, isSelection) => {
  // we only allow 10 digits in this field because thats a full phone #
  if (normalize(phoneNumber).length === 10 && !isSelection) {
    return false;
  }
  // cant insert if its not a valid key
  if (isInvalidKey(key)) {
    return false;
  }
  return true;
};

// just checks to see if the user has selected the text or we are dealing with a single cursor
const isSelection = ({ start, end }) => start !== end;

export const update = (
  phoneNumber: string,
  cursor: Cursor,
  key: string
): PhoneInputType => {
  const _isSelection = isSelection(cursor);

  if (key === "Backspace") {
    return backspace(phoneNumber, cursor);
  }
  if (isInsertable(phoneNumber, key, _isSelection)) {
    return insert(phoneNumber, cursor, key);
  }
  const phoneInput = { phoneNumber, cursorPosition: cursor.start };
  return phoneInput;
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
    phoneNumber: format(phoneNumber),
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
    phoneNumber: format(phoneNumber),
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
    if (action === BACKSPACE) {
      return 0;
    }
    if (action === INSERT) {
      return 1;
    }
  }
  // if they are trying to delete a paren/hypen/space, just move the cursor to the left one
  // unless its a selection, in which case keep cursor in place
  if (action === BACKSPACE) {
    let regEx = /[^0-9]/g;
    if (
      isSelection(cursor) &&
      regEx.test(prevNumber.substring(cursor.start, cursor.end))
    ) {
      return cursor.start;
    }
    if (!isSelection(cursor) && regEx.test(prevNumber[cursor.start - 1])) {
      return cursor.start - 1;
    }
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

  const formattedNumber = format(newNumber);
  // Step 2
  const trueDiff = getCharCountFromEndWithNumbers(formattedNumber, numberCount);

  // Step 3
  return formattedNumber.length - trueDiff;
};

// returns the number of characters in total that contains the specified count of numbers in a string, working from the end to the front
// see tests for more details
export const getCharCountFromEndWithNumbers = (
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

  if (numberCounter < numberCount) {
    return 0;
  }
  return position;
};
