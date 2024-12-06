if (!customElements.get('error-message')) {
  customElements.define('error-message', class extends HTMLElement {
    constructor() {
      super();

      subscribe(PUB_SUB_EVENTS.error, (data) => {
        this.showError(data);
      });
    }

    showError(something) {
      // Shows an error message
      const { message, timeout } = something.data;

      if (!message) {
        return;
      }

      this.textContent = message;
      this.style.setProperty('--error-timeout', `${ timeout || 3000 }ms`);
      this.classList.add('active');

      setTimeout(() => {
        this.classList.remove('active');
      }, timeout || 3000);
    }
  });
}