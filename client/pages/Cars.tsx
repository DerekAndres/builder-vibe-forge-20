import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Plus,
  Trash2,
  Car as CarIcon,
  Calendar,
  Gauge,
  Fuel,
  Settings,
  Palette,
  Eye,
  EyeOff,
} from "lucide-react";
import {
  Car,
  GetCarsResponse,
  DeleteCarResponse,
  ToggleCarVisibilityResponse,
} from "@shared/api";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";

export default function Cars() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [toggling, setToggling] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>("catalog");

  // Fetch cars from API
  const fetchCars = async () => {
    try {
      const response = await fetch("/api/cars");
      if (!response.ok) {
        throw new Error("Failed to fetch cars");
      }
      const data: GetCarsResponse = await response.json();
      setCars(data.cars);
    } catch (error) {
      console.error("Error fetching cars:", error);
      toast.error("Failed to load cars");
    } finally {
      setLoading(false);
    }
  };

  // Delete a car
  const deleteCar = async (carId: string, carTitle: string) => {
    if (!confirm(`Are you sure you want to delete "${carTitle}"?`)) {
      return;
    }

    setDeleting(carId);
    try {
      const response = await fetch(`/api/cars/${carId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete car");
      }

      const data: DeleteCarResponse = await response.json();

      // Remove car from local state
      setCars((prevCars) => prevCars.filter((car) => car.id !== carId));
      toast.success(data.message);
    } catch (error) {
      console.error("Error deleting car:", error);
      toast.error("Failed to delete car");
    } finally {
      setDeleting(null);
    }
  };

  // Toggle car visibility in catalog
  const toggleCarVisibility = async (
    carId: string,
    currentVisibility: boolean,
  ) => {
    setToggling(carId);
    try {
      const response = await fetch(`/api/cars/${carId}/visibility`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ showInCatalog: !currentVisibility }),
      });

      if (!response.ok) {
        throw new Error("Failed to toggle car visibility");
      }

      const data: ToggleCarVisibilityResponse = await response.json();

      // Update car in local state
      setCars((prevCars) =>
        prevCars.map((car) =>
          car.id === carId
            ? { ...car, showInCatalog: !currentVisibility }
            : car,
        ),
      );
      toast.success(data.message);
    } catch (error) {
      console.error("Error toggling car visibility:", error);
      toast.error("Failed to toggle car visibility");
    } finally {
      setToggling(null);
    }
  };

  // Format price
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  // Format mileage
  const formatMileage = (mileage: number) => {
    return new Intl.NumberFormat("en-US").format(mileage) + " miles";
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const visibleCars = cars.filter((car) => car.showInCatalog);
  const hiddenCars = cars.filter((car) => !car.showInCatalog);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading cars...</p>
          </div>
        </div>
      </>
    );
  }

  const renderCarGrid = (
    carList: Car[],
    showVisibilityToggle: boolean = false,
  ) => {
    if (carList.length === 0) {
      return (
        <div className="text-center py-12">
          <CarIcon className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            {showVisibilityToggle ? "No hidden cars" : "No cars in catalog"}
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            {showVisibilityToggle
              ? "All cars are currently visible in the catalog."
              : "Get started by adding a new car to your catalog."}
          </p>
          {!showVisibilityToggle && (
            <div className="mt-6">
              <Button
                onClick={() => (window.location.href = "/cars/add")}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
              >
                <Plus className="w-4 h-4" />
                Add your first car
              </Button>
            </div>
          )}
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {carList.map((car) => (
          <Card
            key={car.id}
            className="overflow-hidden hover:shadow-lg transition-shadow"
          >
            {/* Car Image */}
            <div className="relative h-48 overflow-hidden">
              <img
                src={car.imageUrl}
                alt={car.title}
                className="w-full h-full object-cover transition-transform hover:scale-105"
              />
              <div className="absolute top-3 right-3 flex gap-2">
                {showVisibilityToggle && (
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() =>
                      toggleCarVisibility(car.id, car.showInCatalog)
                    }
                    disabled={toggling === car.id}
                    className="h-8 w-8 p-0 bg-white/90 hover:bg-white"
                  >
                    {toggling === car.id ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                    ) : car.showInCatalog ? (
                      <Eye className="w-4 h-4 text-green-600" />
                    ) : (
                      <EyeOff className="w-4 h-4 text-gray-500" />
                    )}
                  </Button>
                )}
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => deleteCar(car.id, car.title)}
                  disabled={deleting === car.id}
                  className="h-8 w-8 p-0"
                >
                  {deleting === car.id ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  ) : (
                    <Trash2 className="w-4 h-4" />
                  )}
                </Button>
              </div>
              <div className="absolute top-3 left-3 flex gap-2">
                <Badge
                  variant="secondary"
                  className="bg-white/90 text-gray-900"
                >
                  {car.bodyType}
                </Badge>
                {showVisibilityToggle && (
                  <Badge
                    variant={car.showInCatalog ? "default" : "secondary"}
                    className={
                      car.showInCatalog ? "bg-green-600" : "bg-gray-500"
                    }
                  >
                    {car.showInCatalog ? "Visible" : "Hidden"}
                  </Badge>
                )}
              </div>
            </div>

            <CardHeader>
              <CardTitle className="text-lg">{car.title}</CardTitle>
              <CardDescription className="text-sm text-gray-600">
                {car.brand} {car.model}
              </CardDescription>
              <div className="text-2xl font-bold text-blue-600">
                {formatPrice(car.price)}
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Car Details */}
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>{car.year}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Gauge className="w-4 h-4" />
                  <span>{formatMileage(car.mileage)}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Fuel className="w-4 h-4" />
                  <span>{car.fuelType}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Settings className="w-4 h-4" />
                  <span>{car.transmission}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 col-span-2">
                  <Palette className="w-4 h-4" />
                  <span>{car.color}</span>
                </div>
              </div>

              {/* Visibility Toggle for Management View */}
              {showVisibilityToggle && (
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    {car.showInCatalog ? (
                      <Eye className="w-4 h-4 text-green-600" />
                    ) : (
                      <EyeOff className="w-4 h-4 text-gray-500" />
                    )}
                    <span className="text-sm font-medium">Show in catalog</span>
                  </div>
                  <Switch
                    checked={car.showInCatalog}
                    onCheckedChange={() =>
                      toggleCarVisibility(car.id, car.showInCatalog)
                    }
                    disabled={toggling === car.id}
                  />
                </div>
              )}

              {/* Description */}
              <p className="text-sm text-gray-600 line-clamp-3">
                {car.description}
              </p>

              {/* Created Date */}
              <div className="text-xs text-gray-400 pt-2 border-t">
                Added: {new Date(car.createdAt).toLocaleDateString()}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                  <CarIcon className="w-8 h-8 text-blue-600" />
                  Car Management
                </h1>
                <p className="mt-2 text-gray-600">
                  Browse and manage your car inventory
                </p>
              </div>
              <div className="mt-4 sm:mt-0">
                <Button
                  onClick={() => (window.location.href = "/cars/add")}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
                >
                  <Plus className="w-4 h-4" />
                  Add New Car
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="catalog" className="flex items-center gap-2">
                <Eye className="w-4 h-4" />
                Public Catalog ({visibleCars.length})
              </TabsTrigger>
              <TabsTrigger value="manage" className="flex items-center gap-2">
                <Settings className="w-4 h-4" />
                Manage All Cars ({cars.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="catalog" className="mt-6">
              <div className="mb-4">
                <p className="text-sm text-gray-600">
                  These are the cars currently visible to the public in your
                  catalog.
                </p>
              </div>
              {renderCarGrid(visibleCars)}
            </TabsContent>

            <TabsContent value="manage" className="mt-6">
              <div className="mb-4">
                <p className="text-sm text-gray-600">
                  Manage all your cars. Use the toggle switches to control which
                  cars appear in the public catalog.
                </p>
              </div>
              {renderCarGrid(cars, true)}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
