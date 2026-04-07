import { createCategories, createFurnitureList } from './render.js';
import { initSwiper } from './popularproducts.js';
import {initFeedbacksSwiper} from './reviews.js'
function init() {
  document.addEventListener('DOMContentLoaded', async () => {
    await createCategories();
    await createFurnitureList();
    await initSwiper();
    await initFeedbacksSwiper();
  });
}
export { init };
