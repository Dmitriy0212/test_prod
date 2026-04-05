import refs from './refs.js';
import { getFurnituresCategories } from './baseUrl.js';
import { constructCategoriesWithImages, renderCategories } from './categories.js';
import { loadFurnitures, renderFurnitures } from './furnitures.js';

async function createCategories() {
  refs.categories.innerHTML = '';
  const categories = await getFurnituresCategories()
  categories.unshift({'_id': 'all', name: 'Всі товари', withAccent: true})
  const categoriesWithImages = constructCategoriesWithImages(categories)
  refs.categories.insertAdjacentHTML('beforeend', renderCategories(categoriesWithImages))

}

async function createFurnitureList() {
  refs.furnitureList.innerHTML = '';
  const furnitureResponse = await loadFurnitures()
  const furnituresMarkup = renderFurnitures(furnitureResponse.furnitures)
  refs.furnitureList.innerHTML = furnituresMarkup;
}



export { createCategories, createFurnitureList };