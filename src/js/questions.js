const faqItems = document.querySelectorAll('.questions-item input');
faqItems.forEach(input => {
  input.addEventListener('change', () => {
    if (input.checked) {
      // тільки одна комірка
      faqItems.forEach(other => {
        if (other !== input) {
          other.checked = false;
        }
      });
    }
  });
});
