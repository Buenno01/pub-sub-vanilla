if (!customElements.get('add-to-cart-button')) {
  customElements.define('add-to-cart-button', class AddToCartButton extends HTMLElement {
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
        await this.addToCart();
      });
    }

    async addToCart() {
      // Adds the product to the cart
      try {
        const data = {
          id: this.variantId,
          quantity: 1,
        }

        const response = await fetch('/cart/add.js', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });

        if (!response.ok) {
          throw new Error('Erro ao adicionar o item ao carrinho');
        }

        const cart = await response.json();

        publish(PUB_SUB_EVENTS.cartChanged, { data: cart });

      } catch (error) {
        publish(PUB_SUB_EVENTS.error, {
          data: {
            message: 'Erro ao adicionar o item ao carrinho' 
          },
          source: this,
        });
      }
    }
  });
}