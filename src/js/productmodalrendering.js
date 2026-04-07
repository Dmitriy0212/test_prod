import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { getFurnitureItemById } from './baseUrl';
import { initRatings } from './starsrendering';
export async function productmodalRender(id) {
  document.body.style.overflow = 'hidden';
  let slidesData = [];
  try {
    slidesData = await getFurnitureItemById(id);

    iziToast.success({
      title: 'Успіх',
      message: 'Дані товару успішно завантажені',
      position: 'topRight',
    });
  } catch (error) {
    console.log('Помилка запиту товару:', error);

    iziToast.error({
      title: 'Помилка',
      message: 'Не вдалося завантажити товар',
      position: 'topRight',
    });
  }

  const targetProductmodal = document.querySelector('#productmodal');

  while (targetProductmodal.children.length > 1) {
    targetProductmodal.removeChild(targetProductmodal.lastChild);
  }

  targetProductmodal.parentElement.classList.add('visibility-modal');

  let modalBody = document.createElement('div');
  modalBody.classList.add('modal-body');
  targetProductmodal.appendChild(modalBody);

  let galleryContainer = document.createElement('div');
  galleryContainer.classList.add('gallery');
  modalBody.appendChild(galleryContainer);

  let mainImage = document.createElement('div');
  mainImage.classList.add('main-image');
  galleryContainer.appendChild(mainImage);

  let mainImageContent = document.createElement('div');
  mainImageContent.classList.add('thumbs');
  galleryContainer.appendChild(mainImageContent);

  let mainImg1 = document.createElement('img');
  mainImg1.src = slidesData.images[0];
  mainImage.appendChild(mainImg1);

  let thumb1 = document.createElement('div');
  thumb1.classList.add('thumb');
  mainImageContent.appendChild(thumb1);

  let mainImg2 = document.createElement('img');
  mainImg2.src = slidesData.images[1];
  thumb1.appendChild(mainImg2);

  let thumb2 = document.createElement('div');
  thumb2.classList.add('thumb');
  mainImageContent.appendChild(thumb2);

  let mainImg3 = document.createElement('img');
  mainImg3.src = slidesData.images[2];
  thumb2.appendChild(mainImg3);

  let infoContainer = document.createElement('div');
  infoContainer.classList.add('info');
  modalBody.appendChild(infoContainer);

  let titleContent = document.createElement('h2');
  titleContent.classList.add('title');
  titleContent.textContent = slidesData.name;
  infoContainer.appendChild(titleContent);

  let categoryContent = document.createElement('p');
  categoryContent.classList.add('category');
  categoryContent.textContent = slidesData.category.name;
  infoContainer.appendChild(categoryContent);

  let priceContent = document.createElement('p');
  priceContent.classList.add('price');
  priceContent.textContent = `${slidesData.price} грн`;
  infoContainer.appendChild(priceContent);

  let ratingContent = document.createElement('div');
  ratingContent.classList.add('rating-rate');
  ratingContent.dataset.rating = slidesData.rate;
  ratingContent.classList.add('rating');
  infoContainer.appendChild(ratingContent);

  initRatings();
  let colorsUlcontainer = document.createElement('div');
  colorsUlcontainer.classList.add('colors');
  infoContainer.appendChild(colorsUlcontainer);

  let colorsLegend = document.createElement('p');
  colorsLegend.textContent = 'Колір';
  colorsUlcontainer.appendChild(colorsLegend);

  slidesData.color.forEach(color => {
    let colorLabel = document.createElement('label');
    colorLabel.classList.add('color-option');
    colorsUlcontainer.appendChild(colorLabel);

    let colorInput = document.createElement('input');
    colorInput.type = 'radio';
    colorInput.name = 'color';
    colorInput.value = color;
    colorLabel.appendChild(colorInput);

    let colorSpan = document.createElement('span');
    colorSpan.classList.add('color-option__circle');
    colorSpan.style.backgroundColor = color;
    colorLabel.appendChild(colorSpan);
  });
  let descriptionContent = document.createElement('p');
  descriptionContent.classList.add('description');
  descriptionContent.textContent = slidesData.description;
  infoContainer.appendChild(descriptionContent);

  let sizescContainer = document.createElement('p');
  sizescContainer.classList.add('sizes');
  sizescContainer.textContent = `Розміри: ${slidesData.sizes}`;
  infoContainer.appendChild(sizescContainer);

  let buttonContainer = document.createElement('button');
  buttonContainer.classList.add('order__button');
  buttonContainer.classList.add('buttonRed');
  buttonContainer.textContent = 'Перейти до замовлення';
  infoContainer.appendChild(buttonContainer);
  let orderModalMenu = document.querySelector('#orderModal');
  buttonContainer.addEventListener('click', () => {
    const selectedColor = document.querySelector(
      'input[name="color"]:checked'
    )?.value;

    if (!selectedColor) {
      iziToast.error({
        title: 'Помилка',
        message: 'Виберіть будь ласка колір для продовження замовлення',
        position: 'topRight',
      });
      return;
    }

    const productData = {
      id: slidesData.category._id,
      color: selectedColor,
    };

    localStorage.setItem('selectedProduct', JSON.stringify(productData));

    targetProductmodal.parentElement.classList.remove('visibility-modal');
    orderModalMenu.classList.add('visibility-modal');
    iziToast.success({
      title: 'Успех',
      message: 'Дані товару успішно обрані',
      position: 'topRight',
    });
  });

  targetProductmodal.parentElement.addEventListener('click', e => {
    if (e.target === targetProductmodal.parentElement) {
      targetProductmodal.parentElement.classList.remove('visibility-modal');
      document.body.style.overflow = '';
    }
  });

  targetProductmodal.children[0].addEventListener('click', e => {
    targetProductmodal.parentElement.classList.remove('visibility-modal');
    document.body.style.overflow = '';
  });
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      targetProductmodal.parentElement.classList.remove('visibility-modal');
      document.body.style.overflow = '';
    }
  });
  targetProductmodal.addEventListener('click', e => {
    e.stopPropagation();
  });
}
