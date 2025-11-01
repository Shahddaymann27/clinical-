import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { Button } from "./components/ui/button";
import {
  Calendar,
  Plus,
  Clock,
  Users,
  CheckCircle,
  Apple,
  Sparkles,
  Heart,
  CalendarClock,
} from "lucide-react";
import { AppointmentTimeline } from "./components/AppointmentTimeline";
import { DepartmentSection } from "./components/DepartmentSection";
import { StatsCard } from "./components/StatsCard";
import { Badge } from "./components/ui/badge";
import { BookingDialog } from "./components/BookingDialog";
import { Toaster } from "./components/ui/sonner";

// Mock data for today's appointments
const todayAppointments = [
  {
    id: "1",
    patientName: "Sarah Anderson",
    time: "09:00",
    duration: "45 min",
    treatmentType: "Nutritional Consultation",
    department: "Nutrition",
    status: "completed" as const,
    phone: "+1 (555) 123-4567",
    room: "101",
    notes: "Follow-up on weight management plan",
  },
  {
    id: "2",
    patientName: "Emma Williams",
    time: "09:30",
    duration: "30 min",
    treatmentType: "Vitamin B12 Injection",
    department: "Nutrition",
    status: "completed" as const,
    phone: "+1 (555) 234-5678",
    room: "102",
  },
  {
    id: "3",
    patientName: "Michael Chen",
    time: "10:00",
    duration: "60 min",
    treatmentType: "Diet Plan Assessment",
    department: "Nutrition",
    status: "in-progress" as const,
    phone: "+1 (555) 345-6789",
    room: "101",
    notes: "Diabetic meal planning session",
  },
  {
    id: "4",
    patientName: "Isabella Rodriguez",
    time: "09:00",
    duration: "30 min",
    treatmentType: "Botox Injection - Forehead",
    department: "Beauty",
    status: "completed" as const,
    phone: "+1 (555) 456-7890",
    room: "201",
  },
  {
    id: "5",
    patientName: "Sophia Thompson",
    time: "09:45",
    duration: "45 min",
    treatmentType: "Hyaluronic Acid Filler - Lips",
    department: "Beauty",
    status: "completed" as const,
    phone: "+1 (555) 567-8901",
    room: "202",
    notes: "0.5ml requested for natural enhancement",
  },
  {
    id: "6",
    patientName: "Olivia Brown",
    time: "10:30",
    duration: "30 min",
    treatmentType: "Botox Injection - Eyes",
    department: "Beauty",
    status: "in-progress" as const,
    phone: "+1 (555) 678-9012",
    room: "201",
  },
  {
    id: "7",
    patientName: "Charlotte Davis",
    time: "11:15",
    duration: "60 min",
    treatmentType: "PDO Thread Lift",
    department: "Beauty",
    status: "upcoming" as const,
    phone: "+1 (555) 789-0123",
    room: "203",
    notes: "First-time thread lift procedure",
  },
  {
    id: "8",
    patientName: "James Wilson",
    time: "09:15",
    duration: "30 min",
    treatmentType: "Acne Treatment Consultation",
    department: "Dermatology",
    status: "completed" as const,
    phone: "+1 (555) 890-1234",
    room: "301",
  },
  {
    id: "9",
    patientName: "Mia Garcia",
    time: "10:00",
    duration: "45 min",
    treatmentType: "Chemical Peel",
    department: "Dermatology",
    status: "in-progress" as const,
    phone: "+1 (555) 901-2345",
    room: "302",
    notes: "Medium-depth glycolic acid peel",
  },
  {
    id: "10",
    patientName: "Liam Taylor",
    time: "11:00",
    duration: "30 min",
    treatmentType: "Skin Cancer Screening",
    department: "Dermatology",
    status: "upcoming" as const,
    phone: "+1 (555) 012-3456",
    room: "301",
  },
  {
    id: "11",
    patientName: "Amelia Moore",
    time: "11:45",
    duration: "30 min",
    treatmentType: "Tretinoin Follow-up",
    department: "Dermatology",
    status: "upcoming" as const,
    phone: "+1 (555) 123-4560",
    room: "303",
  },
  {
    id: "12",
    patientName: "David Martinez",
    time: "11:00",
    duration: "45 min",
    treatmentType: "Sports Nutrition Plan",
    department: "Nutrition",
    status: "upcoming" as const,
    phone: "+1 (555) 234-5601",
    room: "102",
    notes: "Marathon training nutrition strategy",
  },
  {
    id: "13",
    patientName: "Ava Johnson",
    time: "12:00",
    duration: "45 min",
    treatmentType: "Mesotherapy Session",
    department: "Beauty",
    status: "upcoming" as const,
    phone: "+1 (555) 345-6012",
    room: "202",
  },
  {
    id: "14",
    patientName: "Noah Anderson",
    time: "12:30",
    duration: "30 min",
    treatmentType: "Laser Treatment - Pigmentation",
    department: "Dermatology",
    status: "upcoming" as const,
    phone: "+1 (555) 456-7123",
    room: "304",
  },
];

export default function App() {
  const [activeTab, setActiveTab] = useState("all");
  const [bookingDialogOpen, setBookingDialogOpen] = useState(false);

  const nutritionAppointments = todayAppointments.filter(
    (apt) => apt.department === "Nutrition"
  );
  const beautyAppointments = todayAppointments.filter(
    (apt) => apt.department === "Beauty"
  );
  const dermatologyAppointments = todayAppointments.filter(
    (apt) => apt.department === "Dermatology"
  );

  const getStatusCount = (status: string) => {
    return todayAppointments.filter((apt) => apt.status === status).length;
  };

  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-background">
      <Toaster position="top-center" richColors />
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
                <p className="text-sm text-muted-foreground">Today's Appointments</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-secondary rounded-lg border border-border/50">
                <Calendar className="h-4 w-4 text-primary" />
                <span className="text-sm text-foreground">{currentDate}</span>
              </div>
              <Button className="bg-primary hover:bg-primary/90" onClick={() => setBookingDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                New Appointment
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatsCard
            title="Total Appointments"
            value={todayAppointments.length}
            icon={CalendarClock}
            description="Scheduled for today"
          />
          <StatsCard
            title="Completed"
            value={getStatusCount("completed")}
            icon={CheckCircle}
            trend={{ value: ${getStatusCount("in-progress")} in progress, isPositive: true }}
          />
          <StatsCard
            title="Upcoming"
            value={getStatusCount("upcoming")}
            icon={Clock}
            description="Still to come"
          />
          <StatsCard
            title="Total Patients"
            value={todayAppointments.length}
            icon={Users}
            trend={{ value: "+12% from yesterday", isPositive: true }}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="bg-secondary border border-border/50 w-full justify-start">
                <TabsTrigger
                  value="all"
                  className="data-[state=active]:bg-primary data-[state=active]:text-white"
                >
                  All Departments
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

              {/* All Departments View */}
              <TabsContent value="all" className="space-y-8">
                <DepartmentSection
                  title="Nutrition Department"
                  icon={Apple}
                  appointments={nutritionAppointments}
                  color="bg-green-50 text-green-700"
                />
                <DepartmentSection
                  title="Beauty Department"
                  icon={Sparkles}
                  appointments={beautyAppointments}
                  color="bg-pink-50 text-pink-700"
                />
                <DepartmentSection
                  title="Dermatology Department"
                  icon={Heart}
                  appointments={dermatologyAppointments}
                  color="bg-blue-50 text-blue-700"
                />
              </TabsContent>

              {/* Nutrition Department */}
              <TabsContent value="nutrition" className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-foreground">Nutrition Department</h2>
                    <p className="text-muted-foreground">
                      Nutritional consultations and wellness programs
                    </p>
                  </div>
                  <Badge variant="outline" className="border-primary text-primary">
                    {nutritionAppointments.length} Appointments
                  </Badge>
                </div>
                <DepartmentSection
                  title="Today's Schedule"
                  icon={Apple}
                  appointments={nutritionAppointments}
                  color="bg-green-50 text-green-700"
                />
              </TabsContent>

              {/* Beauty Department */}
              <TabsContent value="beauty" className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-foreground">Beauty Department</h2>
                    <p className="text-muted-foreground">
                      Aesthetic treatments including botox, fillers, and more
                    </p>
                  </div>
                  <Badge variant="outline" className="border-primary text-primary">
                    {beautyAppointments.length} Appointments
                  </Badge>
                </div>
                <DepartmentSection
                  title="Today's Schedule"
                  icon={Sparkles}
                  appointments={beautyAppointments}
                  color="bg-pink-50 text-pink-700"
                />
              </TabsContent>

              {/* Dermatology Department */}
              <TabsContent value="dermatology" className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-foreground">Dermatology Department</h2>
                    <p className="text-muted-foreground">
                      Skin care treatments and dermatological consultations
                    </p>
                  </div>
                  <Badge variant="outline" className="border-primary text-primary">
                    {dermatologyAppointments.length} Appointments
                  </Badge>
                </div>
                <DepartmentSection
                  title="Today's Schedule"
                  icon={Heart}
                  appointments={dermatologyAppointments}
                  color="bg-blue-50 text-blue-700"
                />
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar - Timeline */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <AppointmentTimeline appointments={todayAppointments} />
            </div>
          </div>
        </div>
      </div>

      {/* Booking Dialog */}
      <BookingDialog open={bookingDialogOpen} onOpenChange={setBookingDialogOpen} />
    </div>
  );
}
