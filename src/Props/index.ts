
export interface ProducerType {
  id: number;
  name: string;
  description: string;
}

export interface Producer {
  id: number;
  type: ProducerType;
  image: string;
  name: string;
  owner: string;
  state_registration: string;
  total_area: number;
  vegetable_garden_area: number;
  orchard_area: number;
  employees: number;
  vehicles: number;
  irrigated: boolean;
  covered_planting: boolean;
  commercialization: string;
  latitude: number;
  longitude: number;
  products: Array<Product>;
}

export interface Product {
  name: string;
  year: number;
  jan: number;
  fev: number;
  mar: number;
  abr: number;
  mai: number;
  jun: number;
  jul: number;
  ago: number;
  set: number;
  out: number;
  nov: number;
  dez: number;
  total: number;
}

export interface ProductType {
  id: number;
  name: string;
  description: string;
}

export interface HighlighterType {
  id: number;
  name: string;
  description: string;
}

export interface Highlighter {
  id: number;
  type: string | HighlighterType;
  image: string;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
}
