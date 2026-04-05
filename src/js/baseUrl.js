export const BASE_URL = 'https://furniture-store-v2.b.goit.study/api/';
import axios from 'axios';

export async function getFurnituresList(page, limit, category = null) {
  try {
    const params = { limit: limit, page: page };
    if (category) {
      params.category = category;
    }
    const response = await axios.get(`${BASE_URL}furnitures`, { params });

    return {
      total: response.data.totalItems,
      furnitures: response.data.furnitures,
    };
  } catch (error) {
    console.error(
      'Помилка при запиті:',
      error.response?.status,
      error.response?.data
    );
    return null;
  }
}

export async function getFurnitureItemById(id) {
  try {
    const response = await axios.get(`${BASE_URL}furnitures/${id}`, {});
    return response.data;
  } catch (error) {
    console.error(
      'Помилка при запиті:',
      error.response?.status,
      error.response?.data
    );
    return null;
  }
}

export async function getFurnituresCategories() {
  try {
    const response = await axios.get(`${BASE_URL}categories`, {});

    return response.data;
  } catch (error) {
    console.error(
      'Помилка при запиті:',
      error.response?.status,
      error.response?.data
    );
    return null;
  }
}

export async function postCreateUsersOrder(order) {
  try {
    const response = await axios.post(`${BASE_URL}orders`, order, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    console.error(
      'Помилка при відправці форми',
      error.response?.data || error.message
    );
    throw error;
  }
}

export async function getFeedbacksList(page, limit) {
  try {
    const response = await axios.get(`${BASE_URL}feedbacks`, {
      params: {
        limit: limit,
        page: page,
      },
    });
    return response.data.feedbacks;
  } catch (error) {
    console.error(
      'Помилка при запиті:',
      error.response?.status,
      error.response?.data
    );
    return null;
  }
}

export async function getPopularProducts() {
  try {
    const response = await axios.get(`${BASE_URL}furnitures`, {
      params: { type: 'popular' },
    });

    return response.data.furnitures;
  } catch (error) {
    console.error(
      'Помилка при запиті:',
      error.response?.status,
      error.response?.data
    );
    return null;
  }
}
