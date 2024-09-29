// src/types.ts
export interface Coordinates {
  lat: number;
  lon: number;
}

export interface Place {
  id: string;
  name: string;
  description: string;
  category: string;
  companyId: string;
  address: string;
  coordinates: Coordinates;
}

export interface Meta {
  limit: number;
  page: number;
  totalPages: number;
  totalItems: number;
}

export interface PlacesResponse {
  meta: Meta;
  data: Place[];
}
