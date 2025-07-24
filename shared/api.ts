/**
 * Shared code between client and server
 * Useful to share types between client and server
 * and/or small pure JS functions that can be used on both client and server
 */

/**
 * Example response type for /api/demo
 */
export interface DemoResponse {
  message: string;
}

/**
 * Car data structure
 */
export interface Car {
  id: string;
  title: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  fuelType: 'Gasoline' | 'Diesel' | 'Electric' | 'Hybrid';
  transmission: 'Manual' | 'Automatic';
  bodyType: 'Sedan' | 'SUV' | 'Hatchback' | 'Coupe' | 'Truck' | 'Convertible';
  color: string;
  description: string;
  imageUrl: string;
  showInCatalog: boolean;
  createdAt: string;
}

/**
 * Request/Response types for car API
 */
export interface CreateCarRequest {
  title: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  fuelType: Car['fuelType'];
  transmission: Car['transmission'];
  bodyType: Car['bodyType'];
  color: string;
  description: string;
  imageUrl: string;
}

export interface GetCarsResponse {
  cars: Car[];
}

export interface CreateCarResponse {
  car: Car;
  message: string;
}

export interface DeleteCarResponse {
  message: string;
}
