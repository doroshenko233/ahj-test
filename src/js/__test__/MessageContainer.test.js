import MessageContainer from "../MessageContainer";

const parentEl = document.createElement("div");
const modalMessage = new MessageContainer(parentEl);
modalMessage.redrawModalMessage();

test("redrawModalMessage() подключает разметку в DOM", () => {
  expect(modalMessage.parentEl.innerHTML).toEqual(MessageContainer.markup);
});

test("добавление modal-active", () => {
  modalMessage.showMessage("message");
  expect(
    modalMessage.modalWrapperEl.classList.contains("modal-active"),
  ).toBeTruthy();
});

test("клик на крестик и удаление modal-active", () => {
  modalMessage.showMessage("message");
  modalMessage.closeModal();
  expect(
    modalMessage.modalWrapperEl.classList.contains("modal-active"),
  ).toBeFalsy();
});
