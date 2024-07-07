import verify from "../json/verificationPayments.json";

export function validateCardNumber(cardNumber) {
  let sum = null;
  for (let i = 0; i < cardNumber.length; i += 1) {
    let result = parseInt(cardNumber[i], 10);

    if ((cardNumber.length - i) % 2 === 0) {
      result *= 2;
      if (result > 9) {
        result -= 9;
      }
    }
    sum += result;
  }
  return sum % 10 === 0;
}

export function checkPayment(cardNumber) {
  // проверка наименования платежной системы
  const value = verify;
  for (const [paymentName, IDs] of Object.entries(value)) {
    for (const ID of IDs) {
      if (cardNumber.startsWith(ID)) {
        return paymentName.toLowerCase();
      }
    }
  }
  return false;
}
