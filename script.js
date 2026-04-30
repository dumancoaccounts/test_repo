const cartCount = document.querySelector("#cart-count");
const message = document.querySelector("#form-message");
const signupForm = document.querySelector("#signup-form");
const addToCartButtons = document.querySelectorAll(".add-to-cart");
const themeButtons = document.querySelectorAll("[data-theme-option]");

const themeStorageKey = "northstar-theme";
const defaultTheme = "dune";
const availableThemes = new Set(["dune", "nightfall", "harbor", "grove"]);

let cartItems = 0;

const applyTheme = (themeName) => {
  document.body.dataset.theme = themeName;

  for (const button of themeButtons) {
    const isActive = button.dataset.themeOption === themeName;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-checked", String(isActive));
  }
};

const storedTheme = localStorage.getItem(themeStorageKey);
const initialTheme = availableThemes.has(storedTheme) ? storedTheme : defaultTheme;

applyTheme(initialTheme);

for (const button of addToCartButtons) {
  button.addEventListener("click", () => {
    cartItems += 1;
    cartCount.textContent = String(cartItems);
    button.textContent = "Added";
    button.disabled = true;
  });
}

for (const button of themeButtons) {
  button.addEventListener("click", () => {
    const { themeOption } = button.dataset;

    if (!availableThemes.has(themeOption)) {
      return;
    }

    applyTheme(themeOption);
    localStorage.setItem(themeStorageKey, themeOption);
  });
}

signupForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const email = new FormData(signupForm).get("email");

  message.textContent = `Thanks, ${email}. You're on the list for Drop 05.`;
  signupForm.reset();
});
