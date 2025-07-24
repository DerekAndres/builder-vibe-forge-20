import { RequestHandler } from "express";
import { Car, CreateCarRequest, GetCarsResponse, CreateCarResponse, DeleteCarResponse, ToggleCarVisibilityRequest, ToggleCarVisibilityResponse } from "@shared/api";

// In-memory storage for demo purposes
// In a real app, this would be a database
let cars: Car[] = [
  {
    id: "1",
    title: "2024 BMW X5 M50i Sport",
    brand: "BMW",
    model: "X5",
    year: 2024,
    price: 75000,
    mileage: 1200,
    fuelType: "Gasoline",
    transmission: "Automatic",
    bodyType: "SUV",
    color: "Black",
    description: "Luxury SUV with premium features and excellent performance. Nearly new with low mileage.",
    imageUrl: "https://api.builder.io/api/v1/image/assets/TEMP/ff3c36f1e4fca013aac04b6841d202fab91887ee?width=832",
    showInCatalog: true,
    createdAt: new Date().toISOString()
  },
  {
    id: "2",
    title: "2023 Tesla Model S Plaid",
    brand: "Tesla",
    model: "Model S",
    year: 2023,
    price: 89000,
    mileage: 5000,
    fuelType: "Electric",
    transmission: "Automatic",
    bodyType: "Sedan",
    color: "White",
    description: "High-performance electric sedan with ludicrous acceleration and cutting-edge technology.",
    imageUrl: "https://api.builder.io/api/v1/image/assets/TEMP/7462c356e06661303f37b09c47b028feeb90c788?width=832",
    showInCatalog: true,
    createdAt: new Date().toISOString()
  },
  {
    id: "3",
    title: "2024 Audi A4 Hybrid",
    brand: "Audi",
    model: "A4",
    year: 2024,
    price: 42000,
    mileage: 800,
    fuelType: "Hybrid",
    transmission: "Automatic",
    bodyType: "Sedan",
    color: "Silver",
    description: "Fuel-efficient hybrid sedan with premium interior and advanced safety features.",
    imageUrl: "https://api.builder.io/api/v1/image/assets/TEMP/cea6385d5c3bf4163ea4c731f7da90e046f53a39?width=832",
    showInCatalog: false,
    createdAt: new Date().toISOString()
  }
];

// Get all cars
export const getCars: RequestHandler = (req, res) => {
  const response: GetCarsResponse = {
    cars: cars.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  };
  res.json(response);
};

// Create a new car
export const createCar: RequestHandler = (req, res) => {
  try {
    const carData: CreateCarRequest = req.body;
    
    // Validate required fields
    const requiredFields: (keyof CreateCarRequest)[] = [
      'title', 'brand', 'model', 'year', 'price', 'mileage', 
      'fuelType', 'transmission', 'bodyType', 'color', 'description', 'imageUrl'
    ];
    
    for (const field of requiredFields) {
      if (!carData[field]) {
        return res.status(400).json({ error: `${field} is required` });
      }
    }
    
    // Validate year range
    const currentYear = new Date().getFullYear();
    if (carData.year < 1900 || carData.year > currentYear + 1) {
      return res.status(400).json({ error: 'Year must be between 1900 and next year' });
    }
    
    // Validate price and mileage
    if (carData.price <= 0) {
      return res.status(400).json({ error: 'Price must be greater than 0' });
    }
    
    if (carData.mileage < 0) {
      return res.status(400).json({ error: 'Mileage cannot be negative' });
    }

    const newCar: Car = {
      id: Date.now().toString(), // Simple ID generation for demo
      ...carData,
      createdAt: new Date().toISOString()
    };

    cars.push(newCar);

    const response: CreateCarResponse = {
      car: newCar,
      message: "Car added successfully"
    };

    res.status(201).json(response);
  } catch (error) {
    console.error('Error creating car:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete a car by ID
export const deleteCar: RequestHandler = (req, res) => {
  try {
    const { id } = req.params;
    
    if (!id) {
      return res.status(400).json({ error: 'Car ID is required' });
    }

    const carIndex = cars.findIndex(car => car.id === id);
    
    if (carIndex === -1) {
      return res.status(404).json({ error: 'Car not found' });
    }

    const deletedCar = cars[carIndex];
    cars.splice(carIndex, 1);

    const response: DeleteCarResponse = {
      message: `Car "${deletedCar.title}" deleted successfully`
    };

    res.json(response);
  } catch (error) {
    console.error('Error deleting car:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get a single car by ID
export const getCar: RequestHandler = (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: 'Car ID is required' });
    }

    const car = cars.find(car => car.id === id);

    if (!car) {
      return res.status(404).json({ error: 'Car not found' });
    }

    res.json({ car });
  } catch (error) {
    console.error('Error getting car:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Toggle car visibility in catalog
export const toggleCarVisibility: RequestHandler = (req, res) => {
  try {
    const { id } = req.params;
    const { showInCatalog }: ToggleCarVisibilityRequest = req.body;

    if (!id) {
      return res.status(400).json({ error: 'Car ID is required' });
    }

    const carIndex = cars.findIndex(car => car.id === id);

    if (carIndex === -1) {
      return res.status(404).json({ error: 'Car not found' });
    }

    // Update the car's visibility
    cars[carIndex].showInCatalog = showInCatalog;

    const response: ToggleCarVisibilityResponse = {
      car: cars[carIndex],
      message: `Car visibility updated: ${showInCatalog ? 'shown' : 'hidden'} in catalog`
    };

    res.json(response);
  } catch (error) {
    console.error('Error toggling car visibility:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
