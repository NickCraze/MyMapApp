import axios from "axios";
import { PlacesResponse } from "../types/Places";
import { filterCategories } from "../utils/filterCategories";

// Would usually go in the process.env file
// const OCTIV_API_PUBLIC_URL = "https://api-octiv-test.vercel.app/api/places";
// Trying to fix vercel deployment so commenting the api url out for now

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

  const { data } = await axios.get<PlacesResponse>(
    "https://api-octiv-test.vercel.app/api/places",
    {
      params,
    }
  );
  return data;
};

export const fetchPlaceById = async (id: string) => {
  try {
    const response = await axios.get(
      `${"https://api-octiv-test.vercel.app/api/places"}/${id}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching place by ID:", error);
    throw error;
  }
};

export const fetchCategories = async (): Promise<string[]> => {
  const { data } = await axios.get<PlacesResponse>(
    "https://api-octiv-test.vercel.app/api/places",
    {
      params: {
        limit: 50,
      },
    }
  );

  return filterCategories(data.data || []);
};
