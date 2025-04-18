// script.js

document.addEventListener('DOMContentLoaded', () => {
  const cart = [];
  const cartToggle = document.getElementById('cart-toggle');
  const cartPanel = document.getElementById('cart-panel');
  const cartCount = document.getElementById('cart-count');
  const cartItemsList = document.getElementById('cart-items');
  const cartSubtotalEl = document.getElementById('cart-subtotal');
  const checkoutBtn = document.getElementById('checkout-btn');

  // Toggle cart panel
  cartToggle.addEventListener('click', () => {
    cartPanel.classList.toggle('visible');
  });

  // Add to cart
  document.querySelectorAll('.product-card button').forEach(button => {
    button.addEventListener('click', e => {
      const card = e.target.closest('.product-card');
      const title = card.querySelector('h3').textContent;
      const price = parseFloat(
        card.querySelector('p').textContent.replace(/[^0-9.]/g, '')
      );
      addToCart({ title, price, qty: 1 });
    });
  });

  // Checkout -> print receipt
  checkoutBtn.addEventListener('click', showReceipt);

  function addToCart(item) {
    const existing = cart.find(i => i.title === item.title);
    if (existing) existing.qty++;
    else cart.push(item);
    renderCart();
  }

  function renderCart() {
    cartItemsList.innerHTML = '';
    let subtotal = 0;
    cart.forEach((item, idx) => {
      const lineTotal = item.price * item.qty;
      subtotal += lineTotal;

      const li = document.createElement('li');
      li.textContent = `${item.title} x ${item.qty} — $${lineTotal.toFixed(2)}`;

      const removeBtn = document.createElement('button');
      removeBtn.textContent = '✕';
      removeBtn.addEventListener('click', () => {
        cart.splice(idx, 1);
        renderCart();
      });

      li.append(removeBtn);
      cartItemsList.append(li);
    });

    cartSubtotalEl.textContent = subtotal.toFixed(2);
    cartCount.textContent = cart.reduce((sum, i) => sum + i.qty, 0);
  }

  function showReceipt() {
    const printWin = window.open('', '', 'height=600,width=400');
    printWin.document.write('<html><head><title>Receipt</title></head><body>');
    printWin.document.write('<h1>FreshMart Receipt</h1><ul>');

    let subtotal = 0;
    cart.forEach(item => {
      const lineTotal = item.price * item.qty;
      subtotal += lineTotal;
      printWin.document.write(
        `<li>${item.title} x ${item.qty} — $${lineTotal.toFixed(2)}</li>`
      );
    });

    const tax = subtotal * 0.07;
    const total = subtotal + tax;

    printWin.document.write('</ul>');
    printWin.document.write(`<p>Subtotal: $${subtotal.toFixed(2)}</p>`);
    printWin.document.write(`<p>Tax (7%): $${tax.toFixed(2)}</p>`);
    printWin.document.write(`<h2>Total: $${total.toFixed(2)}</h2>`);
    printWin.document.write('</body></html>');

    printWin.document.close();
    printWin.focus();
    printWin.print();
    printWin.close();
  }
});
