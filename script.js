const cartCount = document.querySelector("#cart-count");
const message = document.querySelector("#form-message");
const signupForm = document.querySelector("#signup-form");
const addToCartButtons = document.querySelectorAll(".add-to-cart");

let cartItems = 0;

for (const button of addToCartButtons) {
  button.addEventListener("click", () => {
    cartItems += 1;
    cartCount.textContent = String(cartItems);
    button.textContent = "Added";
    button.disabled = true;
  });
}

signupForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const email = new FormData(signupForm).get("email");

  message.textContent = `Thanks, ${email}. You're on the list for Drop 05.`;
  signupForm.reset();
});
