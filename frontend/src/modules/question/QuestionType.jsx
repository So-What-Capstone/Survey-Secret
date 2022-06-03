import {
  ClosedQuestion_one, // 0
  ClosedQuestion_mult, // 1
  ClosedQuestion_input, // 2
  OpenedQuestion, // 3
  LinearQuestion, // 4
  GridQuestion, // 5
  PhoneQuestion, // 6
  EmailQuestion, // 7
  DateQuestion, // 8
  AddressQuestion, // 9
} from "../index.js";

export const QType = {
  CLOSED_ONE: 0,
  CLOSED_MULT: 1,
  CLOSED_INPUT: 2,
  OPENED: 3,
  LINEAR: 4,
  GRID: 5,
  PHONE: 6,
  EMAIL: 7,
  DATE: 8,
  ADDRESS: 9,
  ERROR: -1,
};

export const questionTable = [
  ClosedQuestion_one,
  ClosedQuestion_mult,
  ClosedQuestion_input,
  OpenedQuestion,
  LinearQuestion,
  GridQuestion,
  PhoneQuestion,
  EmailQuestion,
  DateQuestion,
  AddressQuestion,
];
