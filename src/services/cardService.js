import http from "./httpService";
import { apiUrl } from "../config.json";

// Delete a card
export function deleteMyCard(id) {
  return http.delete(`/boughts/${id}`);
}

export function getMyCards() {
  return http.get(`/boughts/my-boughts`);
}

export function getAllCards() {
  return http.get(`/boughts`);
}

export function getCardById(id) {
  return http.get(`/boughts/${id}`);
}

export function editCardById(card) {
  const cardId = card._id;
  delete card._id;

  return http.put(`/boughts/${cardId}`, card);
}

export function createBought(bought) {
  return http.post(`/boughts`, bought);
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
