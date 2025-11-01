import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { Card, CardContent } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Plus, Trash2, Search, LayoutGrid, List } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./components/ui/select";

// Types
type StockItem = {
  id: string;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  minStock: number;
  price: number;
  expiryDate: string;
};

// Stats Card Component
function StatsCard({ title, value }: { title: string; value: string | number }) {
  return (
    <Card className="flex-1">
      <CardContent className="p-4">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <p className="text-2xl font-semibold mt-1">{value}</p>
      </CardContent>
    </Card>
  );
}

// Stock Table Component
function StockTable({ items, onDelete }: { items: StockItem[]; onDelete: (id: string) => void }) {
  return (
    <table className="min-w-full border rounded-lg overflow-hidden">
      <thead className="bg-gray-100 dark:bg-neutral-800">
        <tr>
          <th className="px-4 py-2 text-left">Name</th>
          <th className="px-4 py-2 text-left">Category</th>
          <th className="px-4 py-2 text-right">Qty</th>
          <th className="px-4 py-2 text-right">Price</th>
          <th className="px-4 py-2 text-right">Expiry</th>
          <th className="px-4 py-2 text-center">Action</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr key={item.id} className="border-t hover:bg-gray-50 dark:hover:bg-neutral-800">
            <td className="px-4 py-2">{item.name}</td>
            <td className="px-4 py-2">{item.category}</td>
            <td className="px-4 py-2 text-right">{item.quantity} {item.unit}</td>
            <td className="px-4 py-2 text-right">${item.price.toFixed(2)}</td>
            <td className="px-4 py-2 text-right">{item.expiryDate}</td>
            <td className="px-4 py-2 text-center">
              <Button variant="ghost" size="icon" onClick={() => onDelete(item.id)}>
                <Trash2 className="h-4 w-4 text-red-500" />
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// Stock Card View
function StockCard({ item, onDelete }: { item: StockItem; onDelete: (id: string) => void }) {
  return (
    <Card className="p-4 flex flex-col justify-between">
      <div>
        <h3 className="font-semibold text-lg">{item.name}</h3>
        <p className="text-sm text-gray-500">{item.category}</p>
        <p className="text-sm mt-2">Quantity: {item.quantity} {item.unit}</p>
        <p className="text-sm">Price: ${item.price.toFixed(2)}</p>
        <p className="text-sm">Expiry: {item.expiryDate}</p>
      </div>
      <Button variant="destructive" className="mt-3" size="sm" onClick={() => onDelete(item.id)}>
        <Trash2 className="mr-1 h-4 w-4" /> Delete
      </Button>
    </Card>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState("nutrition");
  const [viewMode, setViewMode] = useState("table");
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    quantity: "",
    unit: "",
    minStock: "",
    price: "",
    expiryDate: "",
  });

  const loadData = (key: string, fallback: StockItem[]) =>
    JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback));

  const [nutritionStock, setNutritionStock] = useState<StockItem[]>(() =>
    loadData("nutritionStock", [
      { id: "1", name: "Protein Powder", category: "Supplements", quantity: 20, unit: "kg", minStock: 5, price: 500, expiryDate: "2025-12-31" },
      { id: "2", name: "Vitamin C", category: "Vitamins", quantity: 50, unit: "bottles", minStock: 10, price: 150, expiryDate: "2026-03-01" },
    ])
  );
  const [beautyStock, setBeautyStock] = useState<StockItem[]>(() =>
    loadData("beautyStock", [
      { id: "1", name: "Botox", category: "Injectables", quantity: 10, unit: "vials", minStock: 2, price: 1200, expiryDate: "2025-08-15" },
      { id: "2", name: "Filler", category: "Injectables", quantity: 15, unit: "syringes", minStock: 5, price: 1000, expiryDate: "2025-09-10" },
    ])
  );
  const [dermatologyStock, setDermatologyStock] = useState<StockItem[]>(() =>
    loadData("dermatologyStock", [
      { id: "1", name: "Acne Cream", category: "Topical", quantity: 40, unit: "tubes", minStock: 10, price: 200, expiryDate: "2026-01-20" },
      { id: "2", name: "Sunscreen", category: "Topical", quantity: 30, unit: "bottles", minStock: 8, price: 180, expiryDate: "2025-07-10" },
    ])
  );

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem("nutritionStock", JSON.stringify(nutritionStock));
    localStorage.setItem("beautyStock", JSON.stringify(beautyStock));
    localStorage.setItem("dermatologyStock", JSON.stringify(dermatologyStock));
  }, [nutritionStock, beautyStock, dermatologyStock]);

  const getActiveStock = () => {
    if (activeTab === "nutrition") return nutritionStock;
    if (activeTab === "beauty") return beautyStock;
    return dermatologyStock;
  };

  const setActiveStock = (data: StockItem[]) => {
    if (activeTab === "nutrition") setNutritionStock(data);
    else if (activeTab === "beauty") setBeautyStock(data);
    else setDermatologyStock(data);
  };

  const handleAddItem = () => {
    const newItem: StockItem = {
      id: Date.now().toString(),
      name: formData.name,
      category: formData.category,
      quantity: Number(formData.quantity),
      unit: formData.unit,
      minStock: Number(formData.minStock),
      price: Number(formData.price),
      expiryDate: formData.expiryDate,
    };

    setActiveStock([...getActiveStock(), newItem]);
    setFormData({ name: "", category: "", quantity: "", unit: "", minStock: "", price: "", expiryDate: "" });
    setIsModalOpen(false);
  };

  const handleDeleteItem = (id: string) => {
    const updatedStock = getActiveStock().filter((item) => item.id !== id);
    setActiveStock(updatedStock);
  };

  const getFilteredItems = () =>
    getActiveStock().filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const totalValue = getActiveStock().reduce((sum, item) => sum + item.price * item.quantity, 0);
  const lowStock = getActiveStock().filter((item) => item.quantity <= item.minStock).length;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Clinic Stock Management</h1>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add New Item
        </Button>
      </header>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <StatsCard title="Total Items" value={getActiveStock().length} />
        <StatsCard title="Low Stock Alerts" value={lowStock} />
        <StatsCard title="Total Value" value={$${totalValue.toFixed(2)}} />
        <StatsCard title="Active Products" value={getFilteredItems().length} />
      </div>

      {/* Controls */}
      <div className="flex justify-between mb-4">
        <div className="flex gap-2">
          <Input placeholder="Search..." className="w-64" onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
        <Select onValueChange={(val) => setViewMode(val)}>
          <SelectTrigger className="w-[130px]">
            <SelectValue placeholder="View Mode" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="table">
              <List className="inline h-4 w-4 mr-2" /> Table
            </SelectItem>
            <SelectItem value="grid">
              <LayoutGrid className="inline h-4 w-4 mr-2" /> Grid
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
          <TabsTrigger value="beauty">Beauty</TabsTrigger>
          <TabsTrigger value="dermatology">Dermatology</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab}>
          {viewMode === "table" ? (
            <StockTable items={getFilteredItems()} onDelete={handleDeleteItem} />
          ) : (
            <div className="grid grid-cols-3 gap-4">
              {getFilteredItems().map((item) => (
                <StockCard key={item.id} item={item} onDelete={handleDeleteItem} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Add New Item Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-neutral-900 rounded-2xl p-6 w-[400px] shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Add New Item</h2>
            <div className="space-y-3">
              {["name", "category", "unit", "expiryDate"].map((field) => (
                <Input
                  key={field}
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  type={field === "expiryDate" ? "date" : "text"}
                  value={(formData as any)[field]}
                  onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                />
              ))}
              {["quantity", "minStock", "price"].map((field) => (
                <Input
                  key={field}
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  type="number"
                  value={(formData as any)[field]}
                  onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                />
              ))}
            </div>
            <div className="flex justify-end gap-3 mt-5">
              <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddItem}>Add</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
