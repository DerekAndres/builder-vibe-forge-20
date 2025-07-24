import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Car, BookOpen, Plus, Eye } from "lucide-react";
import Navbar from "@/components/Navbar";

export default function Index() {
  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 py-16">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Welcome to <span className="text-blue-600">BoxCars</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              Your ultimate car management platform. Browse, add, and manage
              your car inventory with ease.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => (window.location.href = "/cars")}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-lg px-8 py-3"
              >
                <Car className="w-5 h-5" />
                View Car Catalog
              </Button>
              <Button
                onClick={() => (window.location.href = "/cars/add")}
                variant="outline"
                className="flex items-center gap-2 text-lg px-8 py-3 border-blue-600 text-blue-600 hover:bg-blue-50"
              >
                <Plus className="w-5 h-5" />
                Add New Car
              </Button>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Car Catalog */}
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Car className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <CardTitle className="text-xl">Car Catalog</CardTitle>
                <CardDescription>
                  Browse and manage your complete car inventory
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  onClick={() => (window.location.href = "/cars")}
                  variant="outline"
                  className="w-full flex items-center gap-2"
                >
                  <Eye className="w-4 h-4" />
                  View Catalog
                </Button>
              </CardContent>
            </Card>

            {/* Add Cars */}
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Plus className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <CardTitle className="text-xl">Add Cars</CardTitle>
                <CardDescription>
                  Easily add new cars to your inventory with detailed
                  information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  onClick={() => (window.location.href = "/cars/add")}
                  variant="outline"
                  className="w-full flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Car
                </Button>
              </CardContent>
            </Card>

            {/* Blog */}
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <BookOpen className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <CardTitle className="text-xl">Car Blog</CardTitle>
                <CardDescription>
                  Read the latest news and reviews about cars and automotive
                  industry
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  onClick={() => (window.location.href = "/blog")}
                  variant="outline"
                  className="w-full flex items-center gap-2"
                >
                  <BookOpen className="w-4 h-4" />
                  Read Blog
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Stats Section */}
          <div className="mt-16 bg-white rounded-lg shadow-lg p-8 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
              Platform Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-2">✨</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Easy Management
                </h3>
                <p className="text-gray-600">
                  Add, view, and delete cars with a user-friendly interface
                </p>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-600 mb-2">🔄</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Real-time Updates
                </h3>
                <p className="text-gray-600">
                  Changes are reflected immediately across the platform
                </p>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  📱
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Responsive Design
                </h3>
                <p className="text-gray-600">
                  Works perfectly on desktop, tablet, and mobile devices
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
