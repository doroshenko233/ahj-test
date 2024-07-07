export default class MessageContainer {
  constructor(parentEl) {
    this.parentEl = parentEl;
  }

  static get markup() {
    return `
  <div class="modal">
      <div class="modal__content">
          <button class="modal-close__btn"></button>
  <h3 class="modal__description"></h3>
  </div>
  </div>
  `;
  }

  redrawModalMessage() {
    this.parentEl.insertAdjacentHTML("afterbegin", this.constructor.markup);
    this.modalButtonEl.addEventListener("click", () => this.closeModal());
  }

  showMessage(message) {
    this.modalWrapperEl.classList.add("modal-active");
    this.modalDescription = message;
  }

  get modalWrapperEl() {
    return this.parentEl.querySelector(".modal");
  }

  get modalContentEl() {
    return this.parentEl.querySelector(".modal__content");
  }

  get modalButtonEl() {
    return this.parentEl.querySelector(".modal-close__btn");
  }

  get modalDescription() {
    return this.parentEl.querySelector(".modal__description").textContent;
  }

  set modalDescription(text) {
    this.parentEl.querySelector(".modal__description").textContent = text;
  }

  closeModal() {
    this.modalWrapperEl.classList.remove("modal-active");
  }
}
