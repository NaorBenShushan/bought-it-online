// This service keeps the user's data more ORGANIZED 📰

import http from "./httpService";
import { apiUrl } from "../config.json";
import jwtDecode from "jwt-decode";

export function getJwt() {
  return localStorage.getItem("token");
}

// logout user and delete saved token
export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("favorites");
}

// use the token for Logout
export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem("token");
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}

//

export async function login(email, password) {
  const { data } = await http.post(`/auth`, { email, password });
  localStorage.setItem("token", data.token);
  localStorage.setItem("favorites", data.favorites);
}

// Favorites
export async function toggleFavorites(cardId) {
  try {
    // server
    await http.patch(`/users/t-favorites/${cardId}`);

    // LS
    let currentFavorites = JSON.parse(localStorage.getItem("favorites"));

    if (currentFavorites.includes(cardId)) {
      currentFavorites = currentFavorites.filter(
        (favorite) => favorite !== cardId
      );
    } else {
      currentFavorites.push(cardId);
    }

    localStorage.setItem("favorites", JSON.stringify(currentFavorites));
  } catch (err) {}
}

export function getFavoritesLS() {
  return localStorage.getItem("favorites");
}

export async function getFavoritesSE() {
  return await http.get(`/users/get-favorites`);
}

const userService = {
  login,
  logout,
  getJwt,
  getCurrentUser,
  getFavoritesLS,
  getFavoritesSE,
  toggleFavorites,
};

export default userService;
