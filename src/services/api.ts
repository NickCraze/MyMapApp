import axios from "axios";
import { PlacesResponse } from "../types/Places";
import { filterCategories } from "../utils/filterCategories";

const OCTIV_API_PUBLIC_URL = "https://api-octiv-test.vercel.app/api/places"; // Would usually go in the process.env file

export const fetchPlaces = async (
  search: string,
  category: string,
  sortBy: string,
  sortDirection: string,
  page: number | null,
  limit: number | null
): Promise<PlacesResponse> => {
  const params: any = {};

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

  const { data } = await axios.get<PlacesResponse>(OCTIV_API_PUBLIC_URL, {
    params,
  });
  return data;
};

export const fetchPlaceById = async (id: string) => {
  try {
    const response = await axios.get(`${OCTIV_API_PUBLIC_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching place by ID:", error);
    throw error;
  }
};

export const fetchCategories = async (): Promise<string[]> => {
  const { data } = await axios.get<PlacesResponse>(OCTIV_API_PUBLIC_URL, {
    params: {
      limit: 50,
    },
  });

  return filterCategories(data.data || []);
};
