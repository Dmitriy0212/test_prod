import refs from './refs.js';
import { loadFurnitures, PER_PAGE, renderFurnitures } from './furnitures.js';

function renderCategories(categories) {
  return categories.map(category => renderCategory(category)).join('');
}

// todo @2x.webp
function renderCategory(category) {
  return `
    <li 
      class="categories-item ${category.withAccent ? 'accent' : ''}"
      data-id="${category._id}"
      style="background-image: url('/cheerful_monk/furniture-list-section/${
        category.image
      }');"
    >
      <h4 class="categories-item__title">${category.name}</h4>
    </li>
  `;
}

function getImageById(id) {
  // ну це прікол якийсь, аххахахаха
  const arrImg = {
    all: 'a-stylish-furniture.webp',
    '66504a50a1b2c3d4e5f6a7b8': 'a-modern-fabric.webp',
    '66504a50a1b2c3d4e5f6a7b9': 'a-sleek-wooden.webp',
    '66504a50a1b2c3d4e5f6a7ba': 'a-queen-size.webp',
    '66504a50a1b2c3d4e5f6a7bb': 'a-modern-oak.webp',
    '66504a50a1b2c3d4e5f6a7bc': 'a-set-of.webp',
    '66504a50a1b2c3d4e5f6a7bd': 'a-modern-open.webp',
    '66504a50a1b2c3d4e5f6a7be': 'a-bright-and-playful.webp',
    '66504a50a1b2c3d4e5f6a7bf': 'a-modern-home.webp',
    '66504a50a1b2c3d4e5f6a7c0': 'a-stylish-entryway.webp',
    '66504a50a1b2c3d4e5f6a7c1': 'a-contemporary-bathroom.webp',
    '66504a50a1b2c3d4e5f6a7c2': 'a-cozy-outdoor.webp',
    '66504a50a1b2c3d4e5f6a7c3': 'a-curated-collection.webp',
  };
  return arrImg[id] ?? '';
}

function constructCategoriesWithImages(categories) {
  return categories.map(category => {
    const image = getImageById(category._id);
    return { ...category, image };
  });
}

refs.categories.addEventListener('click', async e => {
  const item = e.target.closest('.categories-item');
  if (!item) {
    return;
  }
  const categoryId = item.dataset.id;
  setAccent(item);
  const categorySearch = categoryId && categoryId !== 'all' ? categoryId : null;
  let furnitureResponse = await loadFurnitures(1, PER_PAGE, categorySearch);
  if (furnitureResponse.furnitures.length) {
    refs.furnitureList.innerHTML = renderFurnitures(
      furnitureResponse.furnitures
    );
  }
});

function setAccent(item) {
  refs.categories
    .querySelectorAll('.accent')
    .forEach(el => el.classList.remove('accent'));
  item.classList.add('accent');
}

export { renderCategories, renderCategory, constructCategoriesWithImages };
