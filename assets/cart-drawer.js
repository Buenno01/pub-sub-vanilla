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

    async updateUI() {
      try {
        const response = await fetch (location.href);

        if (!response.ok) {
          throw new Error('Erro ao atualizar o carrinho');
        }

        const body = await response.text();
        const parser = new DOMParser();
        const newDocument = parser.parseFromString(body, 'text/html');
        const cartDrawer = newDocument.querySelector('cart-drawer');

        this.innerHTML = cartDrawer.innerHTML;
      } catch (error) {
        console.error('Error:', error);
      }
    }
  });
}