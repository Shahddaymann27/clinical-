malak
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from './ui/dialog';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { useState } from 'react';

interface NewAppointmentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddAppointment: (appointment: {
    patientName: string;
    time: string;
    type: string;
    phone: string;
    notes?: string;
  }) => void;
}

export function NewAppointmentDialog({ open, onOpenChange, onAddAppointment }: NewAppointmentDialogProps) {
  const [patientName, setPatientName] = useState('');
  const [timeInput, setTimeInput] = useState('');
  const [type, setType] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');

  const convertTo12Hour = (time24: string) => {
    const [hours, minutes] = time24.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return ${displayHour}:${minutes} ${ampm};
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!patientName || !timeInput || !type || !phone) {
      return;
    }

    onAddAppointment({
      patientName,
      time: convertTo12Hour(timeInput),
      type,
      phone,
      notes,
    });

    // Reset form
    setPatientName('');
    setTimeInput('');
    setType('');
    setPhone('');
    setNotes('');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Schedule New Appointment</DialogTitle>
          <DialogDescription>
            Add a new appointment to today's schedule
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="patientName">Patient Name *</Label>
              <Input
                id="patientName"
                placeholder="Enter patient name"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="(555) 123-4567"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="time">Appointment Time *</Label>
              <Input
                id="time"
                type="time"
                value={timeInput}
                onChange={(e) => setTimeInput(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Appointment Type *</Label>
              <Select value={type} onValueChange={setType} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select appointment type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Nutrition Consultation">Nutrition Consultation</SelectItem>
                  <SelectItem value="Weight Management">Weight Management</SelectItem>
                  <SelectItem value="Meal Planning">Meal Planning</SelectItem>
                  <SelectItem value="Skin Treatment">Skin Treatment</SelectItem>
                  <SelectItem value="Dermatology Follow-up">Dermatology Follow-up</SelectItem>
                  <SelectItem value="Acne Treatment">Acne Treatment</SelectItem>
                  <SelectItem value="Beauty Consultation">Beauty Consultation</SelectItem>
                  <SelectItem value="Facial Treatment">Facial Treatment</SelectItem>
                  <SelectItem value="Laser Treatment">Laser Treatment</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes (Optional)</Label>
              <Textarea
                id="notes"
                placeholder="Add any additional notes..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">
              Add Appointment
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}