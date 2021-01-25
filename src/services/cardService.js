import http from "./httpService";
import { apiUrl } from "../config.json";

// Delete a card
export function deleteMyCard(id) {
  return http.delete(`${apiUrl}/api/boughts/${id}`);
}

export function getMyCards() {
  return http.get(`${apiUrl}/api/boughts/my-boughts`);
}

export function getAllCards() {
  return http.get(`${apiUrl}/api/boughts/`);
}

export function getCardById(id) {
  return http.get(`${apiUrl}/api/boughts/${id}`);
}

export function editCardById(card) {
  const cardId = card._id;
  delete card._id;

  return http.put(`${apiUrl}/api/boughts/${cardId}`, card);
}

export function createBought(bought) {
  return http.post(`${apiUrl}/api/boughts`, bought);
}

const cardService = {
  getAllCards,
  createBought,
  getMyCards,
  getCardById,
  editCardById,
  deleteMyCard,
};

export default cardService;
