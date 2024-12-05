if (!customElements.get('cart-drawer')) {
  customElements.define('cart-drawer', class extends HTMLElement {
    constructor() {
      super();
    }

    connectedCallback() {
      setTimeout(() => {
        this.setEventListeners();
      });
    }

    setEventListeners() {
      this.querySelector('.close').addEventListener('click', (event) => {
        event.preventDefault();
        this.closeCart();
      });
    }

    closeCart() {
      this.classList.remove('active');
    }

    openCart() {
      this.classList.add('active');
    }
  });
}