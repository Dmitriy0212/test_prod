import refs from './refs.js';
import { getFurnituresList } from './baseUrl.js';
import { productmodalRender } from './productmodalrendering.js';

const PER_PAGE = 8;
let currentPage = 1;
let categorySearch = 'all';

function renderFurnitures(furnitures) {
  return furnitures.map(furniture => renderFurniture(furniture)).join('');
}

// todo @2x.webp
function renderFurniture(furniture) {
  const colorListLi = renderColors(furniture);
  return `
    <li class="furnitures-item" data-id="${furniture._id}">
      <img class="furnitures-item__img" src="${
        furniture.images[0] ?? ''
      }" alt="${furniture.name}">
      <h3 class="furnitures-item__title">${furniture.name}</h3>
      <div class="furnitures-item__color-list" role="radiogroup" aria-label="Колір">${colorListLi}</div>
      <p class="furnitures-item__price">${furniture.price} грн</p>
      <button class="furnitures-item__btn buttonWhite">Детальніше</button>
    </li>
  `;
}

function renderColors(furniture) {
  const groupName = `furniture-color-${furniture._id}`;
  return furniture.color
    .map(
      (color, i) => `
    <label class="furnitures-item__color ${
      color === '#FFFFFF' ? 'furnitures-item__color-swatch-white' : ''
    }">
      <input type="radio" class="furnitures-item__color-input" name="${groupName}" value="${color}"${
        i === 0 ? ' checked' : ''
      } />
      <span class="furnitures-item__color-swatch" style="background-color: ${color}"></span>
    </label>`
    )
    .join('');
}

async function loadFurnitures(page = 1, limit = PER_PAGE, category = null) {
  hideLoadMore();
  showLoader()
  categorySearch = category;
  const furnitureResponse = await getFurnituresList(page, limit, category);
  const hasMore = currentPage * PER_PAGE < furnitureResponse.total;
  if (hasMore) {
    showLoadMore();
  }
  hideLoader()
  return furnitureResponse;
}

refs.furnitureList.addEventListener('click', async e => {
  const btn = e.target.closest('.furnitures-item__btn');
  if (!btn) {
    return;
  }
  const item = btn.closest('.furnitures-item');
  if (!item) {
    return;
  }
  const id = item.dataset.id;
  if (!id) {
    return;
  }
  await productmodalRender(id);
});

refs.loadMore.addEventListener('click', async () => {
  try {
    currentPage = currentPage + 1;

    const furnitureResponse = await loadFurnitures(
      currentPage,
      PER_PAGE,
      categorySearch
    );
    if (furnitureResponse.furnitures.length) {
      const markup = renderFurnitures(furnitureResponse.furnitures);
      refs.furnitureList.insertAdjacentHTML('beforeend', markup);
    }
  } catch {}
});

function hideLoadMore() {
  refs.loadMore.style.display = 'none';
}

function showLoadMore() {
  refs.loadMore.style.display = 'block';
}
function showLoader() {
  refs.loader.classList.toggle('is-hidden');
}

function hideLoader() {
  refs.loader.classList.toggle('is-hidden');
}

export { renderFurnitures, renderFurniture, loadFurnitures, PER_PAGE };
