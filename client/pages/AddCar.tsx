import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, Car as CarIcon, Save } from "lucide-react";
import { CreateCarRequest, CreateCarResponse, Car } from "@shared/api";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";

const fuelTypes: Car['fuelType'][] = ['Gasoline', 'Diesel', 'Electric', 'Hybrid'];
const transmissionTypes: Car['transmission'][] = ['Manual', 'Automatic'];
const bodyTypes: Car['bodyType'][] = ['Sedan', 'SUV', 'Hatchback', 'Coupe', 'Truck', 'Convertible'];

const currentYear = new Date().getFullYear();
const years = Array.from({ length: currentYear - 1970 + 2 }, (_, i) => currentYear + 1 - i);

export default function AddCar() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<CreateCarRequest>({
    title: '',
    brand: '',
    model: '',
    year: currentYear,
    price: 0,
    mileage: 0,
    fuelType: 'Gasoline',
    transmission: 'Automatic',
    bodyType: 'Sedan',
    color: '',
    description: '',
    imageUrl: '',
    showInCatalog: true
  });

  const handleInputChange = (field: keyof CreateCarRequest, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.title || !formData.brand || !formData.model || !formData.color || !formData.description || !formData.imageUrl) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (formData.price <= 0) {
      toast.error('Price must be greater than 0');
      return;
    }

    if (formData.mileage < 0) {
      toast.error('Mileage cannot be negative');
      return;
    }

    setLoading(true);
    
    try {
      const response = await fetch('/api/cars', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to add car');
      }

      const data: CreateCarResponse = await response.json();
      toast.success(data.message);
      
      // Redirect to cars page
      window.location.href = '/cars';
    } catch (error) {
      console.error('Error adding car:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to add car');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={() => window.location.href = '/cars'}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Catalog
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <CarIcon className="w-8 h-8 text-blue-600" />
                Add New Car
              </h1>
              <p className="mt-2 text-gray-600">
                Fill in the details to add a new car to your catalog
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Car Information</CardTitle>
            <CardDescription>
              Enter the details of the car you want to add to the catalog
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    placeholder="e.g., 2024 BMW X5 M50i Sport"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="brand">Brand *</Label>
                  <Input
                    id="brand"
                    placeholder="e.g., BMW"
                    value={formData.brand}
                    onChange={(e) => handleInputChange('brand', e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="model">Model *</Label>
                  <Input
                    id="model"
                    placeholder="e.g., X5"
                    value={formData.model}
                    onChange={(e) => handleInputChange('model', e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="year">Year *</Label>
                  <Select value={formData.year.toString()} onValueChange={(value) => handleInputChange('year', parseInt(value))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {years.map((year) => (
                        <SelectItem key={year} value={year.toString()}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="price">Price ($) *</Label>
                  <Input
                    id="price"
                    type="number"
                    min="1"
                    placeholder="e.g., 45000"
                    value={formData.price || ''}
                    onChange={(e) => handleInputChange('price', parseInt(e.target.value) || 0)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="mileage">Mileage (miles) *</Label>
                  <Input
                    id="mileage"
                    type="number"
                    min="0"
                    placeholder="e.g., 15000"
                    value={formData.mileage || ''}
                    onChange={(e) => handleInputChange('mileage', parseInt(e.target.value) || 0)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fuelType">Fuel Type *</Label>
                  <Select value={formData.fuelType} onValueChange={(value: Car['fuelType']) => handleInputChange('fuelType', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {fuelTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="transmission">Transmission *</Label>
                  <Select value={formData.transmission} onValueChange={(value: Car['transmission']) => handleInputChange('transmission', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {transmissionTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bodyType">Body Type *</Label>
                  <Select value={formData.bodyType} onValueChange={(value: Car['bodyType']) => handleInputChange('bodyType', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {bodyTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="color">Color *</Label>
                  <Input
                    id="color"
                    placeholder="e.g., Black"
                    value={formData.color}
                    onChange={(e) => handleInputChange('color', e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Image URL */}
              <div className="space-y-2">
                <Label htmlFor="imageUrl">Image URL *</Label>
                <Input
                  id="imageUrl"
                  type="url"
                  placeholder="e.g., https://example.com/car-image.jpg"
                  value={formData.imageUrl}
                  onChange={(e) => handleInputChange('imageUrl', e.target.value)}
                  required
                />
                {formData.imageUrl && (
                  <div className="mt-2">
                    <img
                      src={formData.imageUrl}
                      alt="Car preview"
                      className="w-32 h-20 object-cover rounded border"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Describe the car's features, condition, and any other relevant details..."
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={4}
                  required
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-end gap-4 pt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => window.location.href = '/cars'}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={loading}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
                >
                  {loading ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                  {loading ? 'Adding...' : 'Add Car'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
