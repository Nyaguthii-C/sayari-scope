import { useState, useEffect } from 'react';
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import { TrendingUp, Package, ShoppingCart, Users, Plus, Minus, Trash2 } from "lucide-react";
import { Product, Order } from "@/types";
import { useToast } from "@/hooks/use-toast";

interface AdminDashboardProps {
  products: Product[];
  // orders: Order[];
}
// orders after products
const AdminDashboard = ({ products }: AdminDashboardProps) => {
  const { toast } = useToast();

  const [newProduct, setNewProduct] = useState<Product>({
    name: '',
    price: 0,
    category: '',
    description: '',
    sizes: [''],
    inStock: 0,
    image: '',
    id: Date.now() // or use uuid if needed
  });

  const salesData = [
    { month: 'Jan', sales: 45000 },
    { month: 'Feb', sales: 52000 },
    { month: 'Mar', sales: 48000 },
    { month: 'Apr', sales: 61000 },
    { month: 'May', sales: 55000 },
    { month: 'Jun', sales: 67000 },
  ];

  const categoryData = [
    { name: 'Kiondos', value: 35, color: '#D4AF37' },
    { name: 'Sandals', value: 25, color: '#1a1a1a' },
    { name: 'Jewelry', value: 30, color: '#F5E6A8' },
    { name: 'Keychains', value: 10, color: '#B8941F' },
  ];

  const totalRevenue = 284000;
  const totalOrders = 156;
  const totalProducts = products.length;
  const totalCustomers = 89;

  const handleAddProduct = () => {
    toast({
      title: "Product added",
      description: "New product has been added successfully.",
    });
    setNewProduct({
      name: '',
      price: 0,
      category: '',
      description: '',
      sizes: [''],
      inStock: 0,
      image: '',
      id: Date.now()
    });
  };

  const handleStockChange = (productId: number, change: number) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      const newStock = Math.max(0, product.inStock + change);
      toast({
        title: "Stock updated",
        description: `${product.name} stock ${change > 0 ? 'increased' : 'decreased'} to ${newStock}`,
      });
    }
  };

  const handleSizeChange = (index: number, value: string) => {
    const newSizes = [...newProduct.sizes];
    newSizes[index] = value;
    setNewProduct({ ...newProduct, sizes: newSizes });
  };

  const addSizeField = () => setNewProduct({ ...newProduct, sizes: [...newProduct.sizes, ''] });

  const removeSizeField = (index: number) => {
    const newSizes = newProduct.sizes.filter((_, i) => i !== index);
    setNewProduct({ ...newProduct, sizes: newSizes });
  };

const [orders, setOrders] = useState<Order[]>([]);

useEffect(() => {
  const fetchOrders = async () => {
    try {
      const res = await fetch("https://vgnvqmunurawbtwvmmgt.functions.supabase.co/get-orders", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
      });

      if (!res.ok) throw new Error("Failed to fetch");

      const data = await res.json();
      setOrders(data.orders || []);
    } catch (err) {
      console.error("Failed to fetch orders:", err);
    }
  };

  fetchOrders();
}, []);


  return (
    <div className="w-full">
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        {/* Overview */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: "Total Revenue", value: `KSh ${totalRevenue.toLocaleString()}`, icon: TrendingUp },
              { title: "Orders", value: totalOrders, icon: ShoppingCart },
              { title: "Products", value: totalProducts, icon: Package },
              { title: "Customers", value: totalCustomers, icon: Users }
            ].map((stat, i) => (
              <Card key={i}>
                <CardHeader className="flex justify-between items-center pb-2">
                  <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                  <stat.icon className="h-4 w-4 text-maasai-gold" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground">+{(i + 8) * 2}% from last month</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[1, 2, 3].map(order => (
                <div key={order} className="flex justify-between items-center p-4 border rounded-lg">
                  <div>
                    <p className="font-semibold">Order #{order}001</p>
                    <p className="text-sm text-muted-foreground">customer{order}@example.com</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">KSh {(2500 * order).toLocaleString()}</p>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Completed</Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Products */}
        <TabsContent value="products" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Product Management</h3>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Add New Product</CardTitle>
              <CardDescription>Enter product details below</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Product Name</Label>
                  <Input value={newProduct.name} onChange={e => setNewProduct({ ...newProduct, name: e.target.value })} />
                </div>
                <div>
                  <Label>Price (KSh)</Label>
                  <Input type="number" value={newProduct.price} onChange={e => setNewProduct({ ...newProduct, price: Number(e.target.value) })} />
                </div>
                <div>
                  <Label>Category</Label>
                  <Select value={newProduct.category} onValueChange={val => setNewProduct({ ...newProduct, category: val })}>
                    <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                    <SelectContent>
                      {["Kiondos", "Sandals", "Jewelry", "Keychains"].map(c => (
                        <SelectItem key={c} value={c}>{c}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Stock Quantity</Label>
                  <Input type="number" value={newProduct.inStock} onChange={e => setNewProduct({ ...newProduct, inStock: Number(e.target.value) })} />
                </div>
              </div>

              <div>
                <Label>Description</Label>
                <Textarea value={newProduct.description} onChange={e => setNewProduct({ ...newProduct, description: e.target.value })} />
              </div>

              <div>
                <Label>Sizes</Label>
                {newProduct.sizes.map((size, i) => (
                  <div key={i} className="flex items-center space-x-2 mt-2">
                    <Input value={size} onChange={e => handleSizeChange(i, e.target.value)} />
                    {newProduct.sizes.length > 1 && (
                      <Button variant="outline" size="sm" onClick={() => removeSizeField(i)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button variant="outline" size="sm" onClick={addSizeField} className="mt-2">
                  <Plus className="w-4 h-4 mr-2" /> Add Size
                </Button>
              </div>

              <div>
                <Label>Image URL</Label>
                <Input value={newProduct.image} onChange={e => setNewProduct({ ...newProduct, image: e.target.value })} />
              </div>

              <Button onClick={handleAddProduct} className="w-full bg-maasai-black text-white">
                Add Product
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Existing Products</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              {products.map(product => (
                <div key={product.id} className="flex justify-between items-center p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded" />
                    <div>
                      <h4 className="font-semibold">{product.name}</h4>
                      <p className="text-sm text-muted-foreground">{product.category}</p>
                      <p className="font-semibold text-maasai-gold">KSh {product.price.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline">{product.inStock} in stock</Badge>
                    <Button variant="outline" size="sm" onClick={() => handleStockChange(product.id, -1)} disabled={product.inStock === 0}>
                      <Minus className="w-4 h-4 text-orange-600" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleStockChange(product.id, 1)}>
                      <Plus className="w-4 h-4 text-green-600" />
                    </Button>
                    <Button variant="outline" size="sm"><Trash2 className="w-4 h-4 text-red-500" /></Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Orders */}
        <TabsContent value="orders">
          <Card>
            <CardHeader>
              <CardTitle>Order Management</CardTitle>
              <CardDescription>Orders will appear here when customers make purchases.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {orders.length > 0 ? (
                orders.map((order) => (
                  <div
                    key={order.id}
                    className="flex justify-between items-center p-4 border rounded-lg"
                  >
                    <div>
                      <p className="font-semibold">Order #{order.id}</p>
                      <p className="text-sm text-muted-foreground">{order.customerEmail}</p>
                      {/* <p className="text-sm">Items: {order.items?.map(item => item.name).join(', ')}</p> */}
                      <p className="text-sm">
                      Items:{" "}
                      {(() => {
                        let parsedItems: any[] = [];

                        if (Array.isArray(order.items)) {
                          parsedItems = order.items;
                        } else if (typeof order.items === "string") {
                          try {
                            parsedItems = JSON.parse(order.items);
                          } catch {
                            parsedItems = [];
                          }
                        }

                        return parsedItems.map(item => item.name).join(", ");
                      })()}
                    </p>

                    </div>
                    <div className="text-right">
                      <p className="font-semibold">KSh {order.total.toLocaleString()}</p>
                      <Badge variant="outline" className="capitalize">
                        {order.status}
                      </Badge>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-muted-foreground py-10">
                  No orders found.
                </div>
              )}
            </CardContent>

          </Card>
        </TabsContent>

        {/* Analytics */}
        <TabsContent value="analytics">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader><CardTitle>Sales Trend</CardTitle></CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="sales" fill="#D4AF37" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>Sales by Category</CardTitle></CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
