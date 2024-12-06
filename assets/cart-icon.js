if (!customElements.get('cart-icon')) {
  customElements.define('cart-icon', class CartIcon extends HTMLElement {
    constructor() {
      super();
    }

    connectedCallback() {
      setTimeout(() => {
        this.setEventListeners();

        subscribe(PUB_SUB_EVENTS.cartChanged, (data) => {
          this.updateCartCount(data);
        });
      });
    }

    setEventListeners() {
      this.querySelector('a').addEventListener('click', (event) => {
        event.preventDefault();
        this.toggleCartOpen();
      });
    }

    toggleCartOpen() {
      publish(PUB_SUB_EVENTS.cartDrawerOpen, {});
    }

    updateCartCount(something) {
      const { data: cart } = something;

      this.querySelectorAll('[data-cart-count]').forEach((element) => {
        element.textContent = cart.item_count;
      });
    }
  });
}