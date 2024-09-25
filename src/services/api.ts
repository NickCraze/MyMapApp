import axios from "axios";
import { PlacesResponse } from "../types/Places";
import { filterCategories } from "../utils/filterCategories";

const API_BASE_URL = "https://api-octiv-test.vercel.app/api/places";

// Fetch places function remains the same
export const fetchPlaces = async (
  search: string,
  category: string,
  sortBy: string,
  sortDirection: string,
  page: number | null,
  limit: number | null
): Promise<PlacesResponse> => {
  const params: any = {};

  // Conditionally add parameters
  if (search) {
    params.search = search;
  }
  if (category) {
    params.category = category;
  }
  if (sortBy) {
    params.sortBy = sortBy;
  }
  if (limit !== null) {
    params.limit = limit;
  }
  if (sortDirection) {
    params.sortDirection = sortDirection;
  }
  if (page !== null) {
    params.page = page;
  }

  const { data } = await axios.get<PlacesResponse>(API_BASE_URL, { params });
  return data;
};

export const fetchPlaceById = async (id: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching place by ID:", error);
    throw error;
  }
};

// Fetch categories with a fixed limit
export const fetchCategories = async (): Promise<string[]> => {
  const { data } = await axios.get<PlacesResponse>(API_BASE_URL, {
    params: {
      limit: 50,
    },
  });

  // Extract and return unique categories
  return filterCategories(data.data || []);
};
