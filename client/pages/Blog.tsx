import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight, User, ArrowUp, Menu } from "lucide-react";

const blogPosts = [
  {
    id: 1,
    title: "2024 BMW ALPINA XB7 with exclusive details, extraordinary",
    category: "Sound",
    author: "admin",
    date: "November 22, 2023",
    image: "https://api.builder.io/api/v1/image/assets/TEMP/908264b92e4a0a521f03b702d54f60077bd17f15?width=832"
  },
  {
    id: 2,
    title: "BMW X6 M50i is designed to exceed your sportiest.",
    category: "Accessories",
    author: "admin",
    date: "November 22, 2023",
    image: "https://api.builder.io/api/v1/image/assets/TEMP/7462c356e06661303f37b09c47b028feeb90c788?width=832"
  },
  {
    id: 3,
    title: "BMW X5 Gold 2024 Sport Review: Light on Sport",
    category: "Exterior",
    author: "admin",
    date: "November 22, 2023",
    image: "https://api.builder.io/api/v1/image/assets/TEMP/ff3c36f1e4fca013aac04b6841d202fab91887ee?width=832"
  },
  {
    id: 4,
    title: "2024 Kia Sorento Hybrid Review: Big Vehicle With Small-Vehicle",
    category: "Body Kit",
    author: "admin",
    date: "November 22, 2023",
    image: "https://api.builder.io/api/v1/image/assets/TEMP/52e6b0494b45c4c41e35f5342e3a7b2ef1005394?width=832"
  },
  {
    id: 5,
    title: "2024 Audi Hybrid gives up nothing with its optimized",
    category: "Fuel Systems",
    author: "admin",
    date: "November 22, 2023",
    image: "https://api.builder.io/api/v1/image/assets/TEMP/cea6385d5c3bf4163ea4c731f7da90e046f53a39?width=832"
  },
  {
    id: 6,
    title: "2024 BMW X3 M Sport Seats – available as a standalone option",
    category: "Exterior",
    author: "admin",
    date: "November 22, 2023",
    image: "https://api.builder.io/api/v1/image/assets/TEMP/075653d4dd6beda316af6bdb46ec1a6328fe49ee?width=832"
  },
  {
    id: 7,
    title: "2023 Carnival Standard blind-spot & forward collision avoidance",
    category: "Body Kit",
    author: "admin",
    date: "November 22, 2023",
    image: "https://api.builder.io/api/v1/image/assets/TEMP/12887ded18ff4fadae4d52613df15cdf5165a8b6?width=832"
  },
  {
    id: 8,
    title: "Golf vs Polo: A Comparison of Two Volkswagen Classics",
    category: "Sound",
    author: "admin",
    date: "September 19, 2023",
    image: "https://api.builder.io/api/v1/image/assets/TEMP/60d0aa08dcff9179bb61b7b887d860b574c2b4f7?width=832"
  },
  {
    id: 9,
    title: "Battle of the SUVs – Kia Sportage vs Hyundai Tucson",
    category: "Oil & Filters",
    author: "admin",
    date: "September 19, 2023",
    image: "https://api.builder.io/api/v1/image/assets/TEMP/177c614420acb691ded6c6893cc12ffe3e852a16?width=832"
  }
];

const companyLinks = [
  "About Us", "Blog", "Services", "FAQs", "Terms", "Contact Us"
];

const quickLinks = [
  "Get in Touch", "Help center", "Live chat", "How it works"
];

const brands = [
  "Toyota", "Porsche", "Audi", "BMW", "Ford", "Nissan", "Peugeot", "Volkswagen"
];

const vehicleTypes = [
  "Sedan", "Hatchback", "SUV", "Hybrid", "Electric", "Coupe", "Truck", "Convertible"
];

export default function Blog() {
  const [email, setEmail] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-[#050B20] text-white relative z-50">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-[60px]">
          <div className="flex items-center justify-between h-[104px]">
            {/* Logo */}
            <div className="flex-shrink-0">
              <div className="text-white font-bold text-xl tracking-wide">BOXCARS</div>
            </div>

            {/* Navigation - Desktop */}
            <nav className="hidden lg:flex items-center space-x-8">
              <a href="#" className="text-white hover:text-blue-400 transition-colors text-[15px] font-medium">
                Home
              </a>
              <a href="#" className="text-white hover:text-blue-400 transition-colors text-[15px] font-medium">
                Listings
              </a>
              <a href="#" className="text-white hover:text-blue-400 transition-colors text-[15px] font-medium underline decoration-white">
                Blog
              </a>
              <a href="#" className="text-white hover:text-blue-400 transition-colors text-[15px] font-medium">
                Pages
              </a>
              <a href="#" className="text-white hover:text-blue-400 transition-colors text-[15px] font-medium">
                About
              </a>
              <a href="#" className="text-white hover:text-blue-400 transition-colors text-[15px] font-medium">
                Contact
              </a>
            </nav>

            {/* Right side buttons - Desktop */}
            <div className="hidden lg:flex items-center space-x-4">
              <div className="flex items-center space-x-2 cursor-pointer hover:text-blue-400 transition-colors">
                <User className="w-4 h-4" />
                <span className="text-[15px] font-medium">Sign in</span>
              </div>
              <Button
                className="bg-white text-[#050B20] hover:bg-gray-100 rounded-full px-6 py-3 text-[15px] font-medium border border-white"
              >
                Submit Listing
              </Button>
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-white p-2"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="lg:hidden absolute top-full left-0 w-full bg-[#050B20] border-t border-white/10">
              <nav className="px-4 py-6 space-y-4">
                <a href="#" className="block text-white hover:text-blue-400 transition-colors text-[15px] font-medium">
                  Home
                </a>
                <a href="#" className="block text-white hover:text-blue-400 transition-colors text-[15px] font-medium">
                  Listings
                </a>
                <a href="#" className="block text-white hover:text-blue-400 transition-colors text-[15px] font-medium underline">
                  Blog
                </a>
                <a href="#" className="block text-white hover:text-blue-400 transition-colors text-[15px] font-medium">
                  Pages
                </a>
                <a href="#" className="block text-white hover:text-blue-400 transition-colors text-[15px] font-medium">
                  About
                </a>
                <a href="#" className="block text-white hover:text-blue-400 transition-colors text-[15px] font-medium">
                  Contact
                </a>
                <div className="pt-4 border-t border-white/10">
                  <div className="flex items-center space-x-2 mb-4 cursor-pointer hover:text-blue-400 transition-colors">
                    <User className="w-4 h-4" />
                    <span className="text-[15px] font-medium">Sign in</span>
                  </div>
                  <Button
                    className="bg-white text-[#050B20] hover:bg-gray-100 rounded-full px-6 py-3 text-[15px] font-medium w-full"
                  >
                    Submit Listing
                  </Button>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Breadcrumb and Title Section */}
      <section className="bg-white rounded-t-[80px] relative pt-[45px] pb-[7px]">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-[260px]">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-1 text-[15px] mb-[35px]">
            <a href="#" className="text-[#405FF2] hover:underline font-normal">Home</a>
            <span className="text-[#050B20] px-1">/</span>
            <span className="text-[#050B20] font-normal">Blog</span>
          </nav>

          {/* Page Title */}
          <h1 className="text-[40px] font-bold text-[#050B20] leading-[48px] capitalize">Blog</h1>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-[260px] pb-16">
        {/* Blog Posts Grid */}
        <div className="w-full max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-[46px] gap-y-[30px] mb-[79px]">
            {blogPosts.map((post) => (
              <article key={post.id} className="group cursor-pointer w-full max-w-[416px]">
                {/* Image Container */}
                <div className="relative mb-5 rounded-2xl overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-[267px] object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {/* Category Badge */}
                  <div className="absolute top-5 left-5">
                    <span className="bg-white text-[#050B20] px-[15px] py-[4px] rounded-[30px] text-[14px] font-medium leading-[26px]">
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-[4px]">
                  {/* Author and Date */}
                  <div className="flex items-center space-x-[10px] text-[15px] text-[#050B20] mb-[4px]">
                    <span className="font-normal leading-[28px] capitalize">{post.author}</span>
                    <div className="w-[4px] h-[4px] bg-[#E1E1E1] rounded-full"></div>
                    <span className="font-normal leading-[28px] capitalize">{post.date}</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-[20px] font-medium text-[#050B20] group-hover:text-blue-600 transition-colors leading-[30px] pt-[8px]">
                    {post.title}
                  </h3>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center space-x-2 mb-[99px] w-full">
          <div className="flex items-center space-x-2">
            <Button
              variant="default"
              className="w-[40px] h-[39px] rounded-[19.75px] bg-[#050B20] text-white border border-[#050B20] text-[15px] font-medium hover:bg-[#050B20]/90"
            >
              1
            </Button>
            <Button
              variant="outline"
              className="w-[40px] h-[39px] rounded-[19.75px] border-0 bg-white text-[#050B20] hover:bg-gray-50 text-[15px] font-medium"
            >
              2
            </Button>
            <Button
              variant="outline"
              className="w-[60px] h-[38px] rounded-[30px] border border-[#E9E9E9] bg-[#F9FBFC] text-[#050B20] hover:bg-gray-100 px-4 flex items-center justify-center"
            >
              <ChevronRight className="w-3 h-3" />
            </Button>
          </div>
        </div>
      </main>

      {/* Background transition */}
      <div className="w-full h-[80px] flex justify-center items-center bg-[#050B20] relative">
        <div className="w-full h-[80px] bg-white rounded-b-[80px]"></div>
      </div>

      {/* Newsletter Section */}
      <section className="bg-[#050B20] text-white pt-[67px] pb-[50px]">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-[260px]">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="mb-8 lg:mb-0">
              <h2 className="text-[30px] font-medium mb-2 leading-[30px] text-white">Join BoxCar</h2>
              <p className="text-white text-[15px] font-normal leading-[28px]">Receive pricing updates, shopping tips & more!</p>
            </div>
            <div className="w-full lg:w-auto">
              <div className="flex bg-white/13 rounded-[60px] p-[10px] w-[542px] h-[72px] max-w-full">
                <input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-transparent text-white placeholder-white/70 px-[20px] focus:outline-none text-[15px] font-normal"
                />
                <Button className="bg-[#405FF2] hover:bg-[#405FF2]/90 text-white rounded-[60px] px-[31px] py-[11px] border border-[#405FF2] text-[15px] font-medium h-[52px] leading-[28px]">
                  Sign Up
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Horizontal Divider */}
      <div className="w-full h-px bg-[#050B20] flex justify-center items-center">
        <div className="w-full max-w-[1920px] px-[260px]">
          <div className="w-full h-px bg-white/11"></div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#050B20] text-white pt-[55px] pb-[91px]">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-[260px]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-[72px]">
            {/* Company */}
            <div className="lg:w-[256px]">
              <h3 className="text-[20px] font-medium mb-[43px] leading-[24px] capitalize text-white">Company</h3>
              <ul className="space-y-[11px]">
                {companyLinks.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-white hover:text-white/80 transition-colors text-[15px] font-normal leading-[28px]">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Links */}
            <div className="lg:w-[256px]">
              <h3 className="text-[20px] font-medium mb-[43px] leading-[24px] capitalize text-white">Quick Links</h3>
              <ul className="space-y-[11px]">
                {quickLinks.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-white hover:text-white/80 transition-colors text-[15px] font-normal leading-[28px]">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Our Brands */}
            <div className="lg:w-[285px]">
              <h3 className="text-[20px] font-medium mb-[43px] leading-[24px] capitalize text-white">Our Brands</h3>
              <ul className="space-y-[11px]">
                {brands.map((brand) => (
                  <li key={brand}>
                    <a href="#" className="text-white hover:text-white/80 transition-colors text-[15px] font-normal leading-[28px]">
                      {brand}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Vehicle Types */}
            <div className="lg:w-[285px]">
              <h3 className="text-[20px] font-medium mb-[43px] leading-[24px] capitalize text-white">Vehicles Type</h3>
              <ul className="space-y-[11px]">
                {vehicleTypes.map((type) => (
                  <li key={type}>
                    <a href="#" className="text-white hover:text-white/80 transition-colors text-[15px] font-normal leading-[28px]">
                      {type}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Mobile App */}
            <div className="lg:w-[199px]">
              <h3 className="text-[20px] font-medium mb-[52px] leading-[20px] text-white">Our Mobile App</h3>
              <div className="space-y-3 mb-[72px]">
                <a href="#" className="flex items-center space-x-3 bg-white/7 rounded-2xl p-4 hover:bg-white/10 transition-colors w-[199px] h-[60px]">
                  <div className="text-[25px] leading-[25px] w-[19px] h-[25px] flex items-center justify-center">🍎</div>
                  <div>
                    <div className="text-[12px] text-white font-normal leading-[12px]">Download on the</div>
                    <div className="text-[15px] font-medium text-white leading-[15px]">Apple Store</div>
                  </div>
                </a>
                <a href="#" className="flex items-center space-x-3 bg-white/7 rounded-2xl p-4 hover:bg-white/10 transition-colors w-[199px] h-[60px]">
                  <div className="text-[25px] leading-[25px] w-[25px] h-[25px] flex items-center justify-center">📱</div>
                  <div>
                    <div className="text-[12px] text-white font-normal leading-[12px]">Get in on</div>
                    <div className="text-[15px] font-medium text-white leading-[15px]">Google Play</div>
                  </div>
                </a>
              </div>

              {/* Social Links */}
              <div>
                <h4 className="text-[20px] font-medium mb-[47px] leading-[20px] text-white">Connect With Us</h4>
                <div className="flex space-x-[9px]">
                  <a href="#" className="w-[40px] h-[40px] bg-transparent rounded-[20px] flex items-center justify-center hover:bg-white/10 transition-colors">
                    <span className="text-[15px] text-white leading-[15px]">f</span>
                  </a>
                  <a href="#" className="w-[40px] h-[40px] bg-transparent rounded-[20px] flex items-center justify-center hover:bg-white/10 transition-colors">
                    <span className="text-[15px] text-white leading-[15px]">tw</span>
                  </a>
                  <a href="#" className="w-[40px] h-[40px] bg-transparent rounded-[20px] flex items-center justify-center hover:bg-white/10 transition-colors">
                    <span className="text-[15px] text-white leading-[15px]">ig</span>
                  </a>
                  <a href="#" className="w-[40px] h-[40px] bg-transparent rounded-[20px] flex items-center justify-center hover:bg-white/10 transition-colors">
                    <span className="text-[15px] text-white leading-[15px]">in</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-white/12 mt-[20px]">
          <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-[260px] py-[36px]">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <p className="text-white text-[15px] font-normal leading-[28px]">
                © 2024 Boxcars.com. All rights reserved.
              </p>
              <div className="flex items-center space-x-[4px] mt-4 md:mt-0">
                <a href="#" className="text-white hover:text-white/80 text-[15px] font-normal leading-[28px] transition-colors">
                  Terms & Conditions
                </a>
                <div className="w-[4px] h-[4px] bg-white rounded-full mx-[11px]"></div>
                <a href="#" className="text-white hover:text-white/80 text-[15px] font-normal leading-[28px] transition-colors">
                  Privacy Notice
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 bg-blue-600 hover:bg-blue-700 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-colors z-50"
      >
        <ArrowUp className="w-4 h-4" />
      </button>
    </div>
  );
}
