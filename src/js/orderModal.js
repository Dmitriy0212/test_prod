import { postCreateUsersOrder } from './baseUrl';

const orderModal = document.getElementById('orderModal');
const openOrderBtn = document.getElementById('openOrderModal');
const closeBtn = document.querySelector('.order-close');
const orderForm = document.getElementById('orderForm');
document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape') {
    orderModal.classList.remove('visibility-modal');
    document.body.style.overflow = '';
  }
});
const closeModal = () => {
  if (orderModal) {
    orderModal.style.display = 'none';
    document.body.classList.remove('modal-open');
    document.body.style.overflow = '';
  }
};

if (openOrderBtn) {
  openOrderBtn.addEventListener('click', () => {
    orderModal.style.display = 'flex';
    document.body.classList.add('modal-open');
  });
}

if (closeBtn) {
  closeBtn.addEventListener('click', e => {
    orderModal.classList.toggle('visibility-modal');
    closeModal();
  });
}

window.onclick = e => {
  if (e.target === orderModal) closeModal();
};

if (orderForm) {
  orderForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    const formData = new FormData(this);
    const localData = localStorage.getItem('selectedProduct');
    const localDataParsed = JSON.parse(localData);
    const orderData = {
      name: formData.get('name').trim(),
      phone: formData.get('phone').trim(),
      modelId: localDataParsed.id,
      color: localDataParsed.color,
      comment: formData.get('comment').trim(),
    };

    try {
      const result = await postCreateUsersOrder(orderData);
      this.reset();
      closeModal();

      setTimeout(() => alert('Заявка успішно відправлена!'), 100);
    } catch (error) {
      alert('Помилка відправки. Перевірте дані.');
    }
    document.body.style.overflow = '';
  });
}
