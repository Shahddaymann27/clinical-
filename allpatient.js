import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select";
import {
  Search,
  Plus,
  Users,
  Calendar,
  TrendingUp,
  Activity,
  Apple,
  Sparkles,
  Heart,
  Filter,
} from "lucide-react";
import { PatientTable } from "./components/PatientTable";
import { PatientCard } from "./components/PatientCard";
import { StatsCard } from "./components/StatsCard";
import { Badge } from "./components/ui/badge";

// Mock data for patients
const nutritionPatients = [
  {
    id: "np1",
    name: "Sarah Anderson",
    age: 34,
    gender: "Female",
    phone: "+1 (555) 123-4567",
    email: "sarah.anderson@email.com",
    department: "Nutrition",
    lastVisit: "Oct 20, 2025",
    nextAppointment: "Nov 15, 2025",
    status: "active" as const,
    totalVisits: 8,
  },
  {
    id: "np2",
    name: "Michael Chen",
    age: 42,
    gender: "Male",
    phone: "+1 (555) 234-5678",
    email: "m.chen@email.com",
    department: "Nutrition",
    lastVisit: "Oct 18, 2025",
    nextAppointment: "Nov 10, 2025",
    status: "active" as const,
    totalVisits: 12,
  },
  {
    id: "np3",
    name: "Emma Williams",
    age: 29,
    gender: "Female",
    phone: "+1 (555) 345-6789",
    email: "emma.w@email.com",
    department: "Nutrition",
    lastVisit: "Oct 22, 2025",
    status: "completed" as const,
    totalVisits: 5,
  },
  {
    id: "np4",
    name: "David Martinez",
    age: 38,
    gender: "Male",
    phone: "+1 (555) 456-7890",
    email: "david.m@email.com",
    department: "Nutrition",
    lastVisit: "Oct 15, 2025",
    nextAppointment: "Nov 20, 2025",
    status: "active" as const,
    totalVisits: 15,
  },
];

const beautyPatients = [
  {
    id: "bp1",
    name: "Isabella Rodriguez",
    age: 45,
    gender: "Female",
    phone: "+1 (555) 567-8901",
    email: "isabella.r@email.com",
    department: "Beauty",
    lastVisit: "Oct 23, 2025",
    nextAppointment: "Dec 5, 2025",
    status: "active" as const,
    totalVisits: 18,
  },
  {
    id: "bp2",
    name: "Sophia Thompson",
    age: 37,
    gender: "Female",
    phone: "+1 (555) 678-9012",
    email: "sophia.t@email.com",
    department: "Beauty",
    lastVisit: "Oct 21, 2025",
    nextAppointment: "Nov 25, 2025",
    status: "active" as const,
    totalVisits: 22,
  },
  {
    id: "bp3",
    name: "Olivia Brown",
    age: 41,
    gender: "Female",
    phone: "+1 (555) 789-0123",
    email: "olivia.brown@email.com",
    department: "Beauty",
    lastVisit: "Oct 19, 2025",
    nextAppointment: "Nov 12, 2025",
    status: "active" as const,
    totalVisits: 14,
  },
  {
    id: "bp4",
    name: "Ava Johnson",
    age: 33,
    gender: "Female",
    phone: "+1 (555) 890-1234",
    email: "ava.j@email.com",
    department: "Beauty",
    lastVisit: "Oct 24, 2025",
    status: "pending" as const,
    totalVisits: 6,
  },
  {
    id: "bp5",
    name: "Charlotte Davis",
    age: 39,
    gender: "Female",
    phone: "+1 (555) 901-2345",
    email: "charlotte.d@email.com",
    department: "Beauty",
    lastVisit: "Oct 17, 2025",
    nextAppointment: "Nov 18, 2025",
    status: "active" as const,
    totalVisits: 20,
  },
];

const dermatologyPatients = [
  {
    id: "dp1",
    name: "James Wilson",
    age: 28,
    gender: "Male",
    phone: "+1 (555) 012-3456",
    email: "james.wilson@email.com",
    department: "Dermatology",
    lastVisit: "Oct 22, 2025",
    nextAppointment: "Nov 8, 2025",
    status: "active" as const,
    totalVisits: 7,
  },
  {
    id: "dp2",
    name: "Mia Garcia",
    age: 31,
    gender: "Female",
    phone: "+1 (555) 123-4560",
    email: "mia.garcia@email.com",
    department: "Dermatology",
    lastVisit: "Oct 20, 2025",
    nextAppointment: "Nov 22, 2025",
    status: "active" as const,
    totalVisits: 11,
  },
  {
    id: "dp3",
    name: "Liam Taylor",
    age: 35,
    gender: "Male",
    phone: "+1 (555) 234-5601",
    email: "liam.t@email.com",
    department: "Dermatology",
    lastVisit: "Oct 24, 2025",
    status: "completed" as const,
    totalVisits: 4,
  },
  {
    id: "dp4",
    name: "Amelia Moore",
    age: 26,
    gender: "Female",
    phone: "+1 (555) 345-6012",
    email: "amelia.moore@email.com",
    department: "Dermatology",
    lastVisit: "Oct 21, 2025",
    nextAppointment: "Nov 14, 2025",
    status: "active" as const,
    totalVisits: 9,
  },
  {
    id: "dp5",
    name: "Noah Anderson",
    age: 44,
    gender: "Male",
    phone: "+1 (555) 456-7123",
    email: "noah.a@email.com",
    department: "Dermatology",
    lastVisit: "Oct 19, 2025",
    nextAppointment: "Nov 5, 2025",
    status: "active" as const,
    totalVisits: 13,
  },
];

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");
  const [activeTab, setActiveTab] = useState("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const allPatients = [
    ...nutritionPatients,
    ...beautyPatients,
    ...dermatologyPatients,
  ];

  const getFilteredPatients = (patients: typeof allPatients) => {
    return patients.filter((patient) => {
      const matchesSearch = patient.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesStatus =
        statusFilter === "all" || patient.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  };

  const getActivePatients = (patients: typeof allPatients) => {
    return patients.filter((p) => p.status === "active").length;
  };

  const getUpcomingAppointments = (patients: typeof allPatients) => {
    return patients.filter((p) => p.nextAppointment).length;
  };

  const getTotalVisits = (patients: typeof allPatients) => {
    return patients.reduce((sum, p) => sum + p.totalVisits, 0);
  };

  const currentPatients =
    activeTab === "all"
      ? allPatients
      : activeTab === "nutrition"
      ? nutritionPatients
      : activeTab === "beauty"
      ? beautyPatients
      : dermatologyPatients;

  const filteredPatients = getFilteredPatients(currentPatients);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-primary rounded-lg flex items-center justify-center">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-foreground">Jory Clinic</h1>
                <p className="text-sm text-muted-foreground">
                  Patient Management System
                </p>
              </div>
            </div>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="mr-2 h-4 w-4" />
              Add New Patient
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatsCard
            title="Total Patients"
            value={currentPatients.length}
            icon={Users}
            description="Across all departments"
          />
          <StatsCard
            title="Active Patients"
            value={getActivePatients(currentPatients)}
            icon={Activity}
            trend={{ value: "+8% this month", isPositive: true }}
          />
          <StatsCard
            title="Upcoming Appointments"
            value={getUpcomingAppointments(currentPatients)}
            icon={Calendar}
            description="Next 30 days"
          />
          <StatsCard
            title="Total Visits"
            value={getTotalVisits(currentPatients)}
            icon={TrendingUp}
            trend={{ value: "+15% this month", isPositive: true }}
          />
        </div>

        {/* Department Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <TabsList className="bg-secondary border border-border/50">
              <TabsTrigger
                value="all"
                className="data-[state=active]:bg-primary data-[state=active]:text-white"
              >
                <Users className="mr-2 h-4 w-4" />
                All Patients
              </TabsTrigger>
              <TabsTrigger
                value="nutrition"
                className="data-[state=active]:bg-primary data-[state=active]:text-white"
              >
                <Apple className="mr-2 h-4 w-4" />
                Nutrition
              </TabsTrigger>
              <TabsTrigger
                value="beauty"
                className="data-[state=active]:bg-primary data-[state=active]:text-white"
              >
                <Sparkles className="mr-2 h-4 w-4" />
                Beauty
              </TabsTrigger>
              <TabsTrigger
                value="dermatology"
                className="data-[state=active]:bg-primary data-[state=active]:text-white"
              >
                <Heart className="mr-2 h-4 w-4" />
                Dermatology
              </TabsTrigger>
            </TabsList>

            <div className="flex items-center gap-2 w-full lg:w-auto flex-wrap">
              <div className="relative flex-1 lg:flex-initial min-w-[200px]">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search patients..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-full lg:w-[300px] bg-input-background border-border/50"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[140px] bg-input-background border-border/50">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
              <Select
                value={viewMode}
                onValueChange={(value: "table" | "grid") => setViewMode(value)}
              >
                <SelectTrigger className="w-[130px] bg-input-background border-border/50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="table">Table View</SelectItem>
                  <SelectItem value="grid">Grid View</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* All Patients Tab */}
          <TabsContent value="all" className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-foreground">All Patients</h2>
                <p className="text-muted-foreground">
                  Complete patient database across all departments
                </p>
              </div>
              <Badge variant="outline" className="border-primary text-primary">
                {filteredPatients.length} Patients
              </Badge>
            </div>

            {viewMode === "table" ? (
              <PatientTable patients={filteredPatients} />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredPatients.map((patient) => (
                  <PatientCard key={patient.id} {...patient} />
                ))}
              </div>
            )}
          </TabsContent>

          {/* Nutrition Department */}
          <TabsContent value="nutrition" className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-foreground">Nutrition Department</h2>
                <p className="text-muted-foreground">
                  Patients receiving nutritional counseling and supplements
                </p>
              </div>
              <Badge variant="outline" className="border-primary text-primary">
                {filteredPatients.length} Patients
              </Badge>
            </div>

            {viewMode === "table" ? (
              <PatientTable patients={filteredPatients} />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredPatients.map((patient) => (
                  <PatientCard key={patient.id} {...patient} />
                ))}
              </div>
            )}
          </TabsContent>

          {/* Beauty Department */}
          <TabsContent value="beauty" className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-foreground">Beauty Department</h2>
                <p className="text-muted-foreground">
                  Patients receiving aesthetic treatments including botox, fillers, and more
                </p>
              </div>
              <Badge variant="outline" className="border-primary text-primary">
                {filteredPatients.length} Patients
              </Badge>
            </div>

            {viewMode === "table" ? (
              <PatientTable patients={filteredPatients} />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredPatients.map((patient) => (
                  <PatientCard key={patient.id} {...patient} />
                ))}
              </div>
            )}
          </TabsContent>

          {/* Dermatology Department */}
          <TabsContent value="dermatology" className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-foreground">Dermatology Department</h2>
                <p className="text-muted-foreground">
                  Patients receiving dermatological treatments and skin care
                </p>
              </div>
              <Badge variant="outline" className="border-primary text-primary">
                {filteredPatients.length} Patients
              </Badge>
            </div>

            {viewMode === "table" ? (
              <PatientTable patients={filteredPatients} />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredPatients.map((patient) => (
                  <PatientCard key={patient.id} {...patient} />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}