import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import AdminDashboard from "@/components/AdminDashboard";
import { Product, Order } from "@/types";

// Demo credentials
const ADMIN_EMAIL = "admin@sayariscope.com";
const ADMIN_PASSWORD = "admin123";

const Admin = () => {
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const products: Product[] = [
    {
      id: 1,
      name: "Advanced Dobsonian telescope",
      price: 2500,
      image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=400&fit=crop",
      category: "Telescopes",
      description: "Large aperture Dobsonian for deep sky observation",
      sizes: ["200mm"],
      inStock: 25
    },
    {
      id: 2,
      name: "Digital Star Projector",
      price: 3200,
      image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=400&fit=crop",
      category: "Projectors",
      description: "LED star projector with multiple constellation modes",
      sizes: ["One Size"],
      inStock: 18
    },
    {
      id: 3,
      name: "Inflatable Dome Planetarium Kit",
      price: 1500,
      image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=400&h=400&fit=crop",
      category: "Jewelry",
      description: "Easy-to-set-up inflatable dome with 360° projection, ideal for immersive astronomy shows",
      sizes: ["One Size"],
      inStock: 40
    },
    {
      id: 4,
      name: "Professional Binoculars 10x50",
      price: 400,
      image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=400&h=400&fit=crop",
      category: "Binoculars",
      description: "High-quality binoculars perfect for stargazing and wildlife",
      sizes: ["One Size"],
      inStock: 25
    }
  ];

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    await new Promise(resolve => setTimeout(resolve, 1000));

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      toast({
        title: "Login successful",
        description: "Welcome to the admin dashboard."
      });
    } else {
      toast({
        title: "Login failed",
        description: "Invalid email or password.",
        variant: "destructive"
      });
    }

    setIsLoading(false);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setEmail("");
    setPassword("");
    toast({
      title: "Logged out",
      description: "You have been successfully logged out."
    });
  };

  if (isAuthenticated) {
    return (
      <div className="min-h-screen bg-sayari-white">
        <header className="bg-sayari-white border-b border-gray-200">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-sayari-gold rounded-full flex items-center justify-center">
                  <span className="text-sayari-white font-bold text-sm">SS</span>
                </div>
                <h1 className="text-2xl font-bold text-sayari-black">SayariScope Admin</h1>
              </div>
              <div className="flex items-center space-x-4">
                <Button
                  variant="outline"
                  onClick={() => window.location.href = '/'}
                  className="border-sayari-gold text-sayari-gold hover:bg-sayari-gold hover:text-sayari-white"
                >
                  Back to Store
                </Button>
                <Button
                  variant="outline"
                  onClick={handleLogout}
                  className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                >
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          <AdminDashboard
            products={products}
          />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sayari-white flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-sayari-gold rounded-full flex items-center justify-center">
              <span className="text-sayari-white font-bold text-sm">SS</span>
            </div>
            <h1 className="text-2xl font-bold text-sayari-black">SayariScope</h1>
          </div>
          <CardTitle>Admin Login</CardTitle>
          <CardDescription>
            Enter your credentials to access the admin dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@sayariscope.com"
                required
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-sayari-gold hover:bg-sayari-gold-dark text-sayari-white"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </form>
          <div className="mt-4 text-sm text-center text-gray-600">
            <p>Demo credentials:</p>
            <p>Email: admin@sayariscope.com</p>
            <p>Password: admin123</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Admin;
