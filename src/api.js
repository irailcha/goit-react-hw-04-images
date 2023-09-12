import axios from "axios";

axios.defaults.baseURL = 'https://pixabay.com/api/';
const API_KEY = '35813093-cabe0c7219a04f4206a0ddb1b';

export const AllImages = async (query, page) => {
  const response = await axios.get(`?key=${API_KEY}&q=${query}&page=${page}&per_page=12`);

  const images = response.data.hits.map(item => ({
    id: item.id,
    webformatURL: item.webformatURL,
    largeImageURL: item.largeImageURL
  }));

  const totalHits = response.data.totalHits;

  return { totalHits, images };
}
