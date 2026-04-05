
import { postCreateUsersOrder } from './baseUrl'

const orderModal = document.getElementById("orderModal");
const openOrderBtn = document.getElementById("openOrderModal");
const closeBtn = document.querySelector(".order-close");
const orderForm = document.getElementById("orderForm");

const closeModal = () => {
  if (orderModal) {
    orderModal.style.display = "none";
    document.body.classList.remove('modal-open');
  }
};

if (openOrderBtn) {
  openOrderBtn.addEventListener('click', () => {
    orderModal.style.display = "flex";
    document.body.classList.add('modal-open');
  });
}

if (closeBtn) closeBtn.onclick = closeModal;

window.onclick = (e) => { 
  if (e.target === orderModal) closeModal(); 
};

if (orderForm) {
  orderForm.addEventListener("submit", async function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const orderData = {
      name: formData.get("name").trim(),
      phone: formData.get("phone").trim(),
      comment: formData.get("comment").trim(),
    };

    try {
      const result = await postCreateUsersOrder(orderData);
      closeModal();
      this.reset();
      setTimeout(() => alert("Заявка успішно відправлена!"), 100);
    } catch (error) {
      alert("Помилка відправки. Перевірте дані.");
    }
  });
}