import { validateCardNumber, checkPayment } from "../validateCardNumber";

test.each([
  ["card selector", "2201382000000013", "mir"],
  ["diners club card selector", "30569309025904", "diners"],
  ["jcb card selector", "3530111333300000", "jcb"],
  ["american express card selector", "371449635398431", "americanexpress"],
  ["visa card selector", "4111111111111111", "visa"],
  ["mastercard selector", "5105105105105100", "mastercard"],
  ["discover card selector", "6011111111111117", "discover"],
])("it should be %s", (_, cardNumber, expected) => {
  expect(checkPayment(cardNumber)).toBe(expected);
});

test.each([
  ["isValide mir card number", "2201382000000013", true],
  ["isValide diners club card number", "30569309025904", true],
  ["isValide jcb card number", "3530111333300000", true],
  ["isValide american express card number", "371449635398431", true],
  ["isValide visa card number", "4111111111111111", true],
  ["isValide mastercard number", "5105105105105100", true],
  ["isValide valide discover card number", "6011111111111117", true],
  ["invalide card number", "0105105105105100", false],
  ["invalide card number", "1234", false],
  ["string instead of number", "номер", false],
  ["is very short number", "051051051", false],
])("it should be %s", (_, cardNumber, expected) => {
  expect(validateCardNumber(cardNumber)).toBe(expected);
});
