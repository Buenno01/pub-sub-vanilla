if (!customElements.get('cart-icon')) {
  customElements.define('cart-icon', class CartIcon extends HTMLElement {
    constructor() {
      super();
    }

    connectedCallback() {
      setTimeout(() => {
        this.setEventListeners();
      });
    }

    setEventListeners() {
      this.querySelector('a').addEventListener('click', (event) => {
        event.preventDefault();
        this.toggleCartOpen();
      });
    }

    toggleCartOpen() {
      // Adds a "hidden" class to the cart if it's not already there
    }

    updateCartCount(something) {
      // Updates the cart count in the icon

      const { data: itemCount } = something;

      this.querySelectorAll('[data-cart-count]').forEach((element) => {
        element.textContent = itemCount;
      });
    }
  });
}