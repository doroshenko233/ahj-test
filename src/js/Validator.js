import MessageContainer from "./MessageContainer";
import { validateCardNumber, checkPayment } from "./validateCardNumber";

export default class Validator {
  constructor(container) {
    this.container = container;
    this.modalMessage = new MessageContainer(container);
    this.inputEl = document.querySelector(".input-card-number");
    this.cards = [...document.querySelectorAll(".card-img")];
  }

  init() {
    this.modalMessage.redrawModalMessage();

    this.inputEl.addEventListener("input", this.onInput.bind(this));

    this.validateButton = this.container.querySelector(".validate-button");

    this.validateButton.addEventListener("click", this.onSubmit.bind(this));
  }

  onSubmit(event) {
    event.preventDefault();
    this.cards.forEach((el) => el.classList.remove("card-img-filter"));

    const isNumber = /^[0-9]+$/.test(parseInt(this.inputEl.value, 10));
    if (!isNumber) {
      this.modalMessage.showMessage("Enter only number 0...9");
      this.inputEl.value = "";
      return;
    }

    if (!this.inputEl.value || this.inputEl.value.length < 14) {
      this.modalMessage.showMessage("Very short number...");
      this.inputEl.value = "";
      return;
    }

    const isValid = validateCardNumber(this.inputEl.value);
    if (isValid) {
      this.modalMessage.showMessage("is Valid");
    } else {
      this.modalMessage.showMessage("is not Valid");
    }
    this.inputEl.value = "";
  }

  onInput(event) {
    event.preventDefault();
    const { value } = this.inputEl;
    if (value !== "") {
      this.cards.forEach((el) => el.classList.add("card-img-filter"));
      const check = checkPayment(value);
      this.showPaymentSystem(check);
    } else {
      this.cards.forEach((el) => el.classList.remove("card-img-filter"));
    }
  }

  showPaymentSystem(value) {
    const checkEl = this.cards.find((el) => el.classList.contains(value));
    if (checkEl) checkEl.classList.remove("card-img-filter");
  }
}
