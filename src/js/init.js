import { createCategories, createFurnitureList } from './render.js';
import { initSwiper } from './popularproducts.js';
function init() {
  document.addEventListener('DOMContentLoaded', async () => {
    await createCategories();
    await createFurnitureList();
    await initSwiper();
  });
}

export { init };
