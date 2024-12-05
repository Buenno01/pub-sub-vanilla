if (!customElements.get('remove-from-cart-button')) {
  customElements.define('remove-from-cart-button', class RemoveFromCartButton extends HTMLElement {
    constructor() {
      super();
    }

    connectedCallback() {
      setTimeout(() => {
        this.setEventListeners();
      });
    }

    setEventListeners() {
      this.querySelector('button').addEventListener('click', async (event) => {
        event.preventDefault();
        this.variantId = this.getAttribute('data-variant-id');
        await this.removeFromCart();
      });
    }

    async removeFromCart() {
      try {
        if (this.variantId) {
          const data = {
            id: this.variantId,
            quantity: 0,
          }

          const response = await fetch('/cart/change.js', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          });
          
          if (!response.ok) {
            throw new Error('Erro ao remover o item do carrinho');
          }

          const cart = await response.json();
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  });
}