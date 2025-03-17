// Add interactivity here (e.g., cart functionality)
document.querySelectorAll('.product-card button').forEach(button => {
  button.addEventListener('click', () => {
    alert('Added to cart!');
  });
});