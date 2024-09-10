// const API_DOMAIN = "https://gnews.io/api/v4/top-headlines?country=";
// const API_SEARCH_DOMAIN = "https://gnews.io/api/v4/search?q=";
// const API_KEY = process.env.REACT_APP_API_KEY;
// export const endpointPath = (country, category) =>
//   `${API_DOMAIN}${country}&lang=en&category=${category}&apikey=${API_KEY}`;
// export const endpointSearch = (searchQuery) =>
//   `${API_SEARCH_DOMAIN}${searchQuery}&lang=en&apikey=${API_KEY}`;

const API_DOMAIN = "https://gnews.io/api/v4/top-headlines?country=";
const API_SEARCH_DOMAIN = "https://gnews.io/api/v4/search?q=";
const API_KEY = process.env.REACT_APP_API_KEY;

/**
 * Generates the endpoint URL for fetching top headlines.
 * @param {string} [country='in'] - The country code (default is 'in' for India).
 * @param {string} [category='general'] - The news category (default is 'general').
 * @returns {string} - The constructed URL for the API request.
 */
export const endpointPath = (country = 'in', category = 'general') =>
  `${API_DOMAIN}${country}&lang=en&category=${category}&apikey=${API_KEY}`;

/**
 * Generates the endpoint URL for searching news.
 * @param {string} searchQuery - The search query string.
 * @returns {string} - The constructed URL for the search API request.
 */
export const endpointSearch = (searchQuery) =>
  `${API_SEARCH_DOMAIN}${encodeURIComponent(searchQuery)}&lang=en&apikey=${API_KEY}`;

