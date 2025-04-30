
import React, { useState } from "react";
import Layout from "@/components/Layout";
import MobileNav from "@/components/MobileNav";
import PageHeader from "@/components/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { PlusCircle, Search, Calendar, MapPin, Pencil, Trash2, Tag } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { format } from "date-fns";

// Mock events data
const initialEvents = [
  {
    id: "1",
    name: "SM Megamall Craft Fair",
    location: "SM Megamall, EDSA Corner, Ortigas Center, Mandaluyong",
    startDate: new Date(2025, 4, 15), // May 15, 2025
    endDate: new Date(2025, 4, 17), // May 17, 2025
    itemsSent: 45,
    totalSales: 32500,
    expenses: 5000,
    notes: "Booth #24, near the main entrance"
  },
  {
    id: "2",
    name: "Ayala Makers Market",
    location: "Ayala Malls Trinoma, North Avenue, Quezon City",
    startDate: new Date(2025, 5, 8), // June 8, 2025
    endDate: new Date(2025, 5, 10), // June 10, 2025
    itemsSent: 30,
    totalSales: 0, // Upcoming event
    expenses: 3500,
    notes: "Applied for corner booth"
  },
  {
    id: "3",
    name: "BGC Artisan Showcase",
    location: "High Street, Bonifacio Global City, Taguig",
    startDate: new Date(2025, 6, 22), // July 22, 2025
    endDate: new Date(2025, 6, 23), // July 23, 2025
    itemsSent: 0, // Not yet assigned
    totalSales: 0, // Upcoming event
    expenses: 4200,
    notes: "Partnering with Handmade PH collective"
  }
];

const Events = () => {
  const [events, setEvents] = useState(initialEvents);
  const [searchQuery, setSearchQuery] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<any | null>(null);
  
  const handleAddEvent = () => {
    setEditingEvent(null);
    setIsFormOpen(true);
  };

  const handleEditEvent = (event: any) => {
    setEditingEvent(event);
    setIsFormOpen(true);
  };

  const handleDeleteEvent = (eventId: string) => {
    setEvents(events.filter(e => e.id !== eventId));
    toast({
      title: "Event deleted",
      description: "The event has been removed.",
    });
  };

  const handleSaveEvent = (eventData: any) => {
    if (editingEvent) {
      // Update existing event
      setEvents(events.map(e => e.id === editingEvent.id ? { ...eventData, id: editingEvent.id } : e));
      toast({
        title: "Event updated",
        description: "Your changes have been saved successfully.",
      });
    } else {
      // Add new event with random ID
      const newId = Math.random().toString(36).substring(2, 9);
      setEvents([...events, { ...eventData, id: newId, itemsSent: 0, totalSales: 0 }]);
      toast({
        title: "Event added",
        description: "New event has been added.",
      });
    }
    setIsFormOpen(false);
  };

  // Filter events based on search query
  const filteredEvents = events.filter(event => 
    event.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    event.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort events by date (upcoming first)
  const sortedEvents = [...filteredEvents].sort((a, b) => a.startDate.getTime() - b.startDate.getTime());

  // Helper function to determine if an event is upcoming, ongoing, or past
  const getEventStatus = (event: any) => {
    const now = new Date();
    if (now < event.startDate) return "Upcoming";
    if (now > event.endDate) return "Completed";
    return "Ongoing";
  };

  // Helper function to get badge color based on status
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Upcoming": return "bg-blue-100 text-blue-800 border-blue-200";
      case "Ongoing": return "bg-green-100 text-green-800 border-green-200";
      case "Completed": return "bg-purple-100 text-purple-800 border-purple-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <>
      <MobileNav />
      <Layout>
        <PageHeader 
          title="Events" 
          description="Manage craft fairs, markets and other sales events"
          action={{
            label: "Add Event",
            onClick: handleAddEvent,
            icon: PlusCircle
          }}
        />
        
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input 
              placeholder="Search events..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 yarn-input"
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" className="shrink-0">
              <Calendar size={18} />
            </Button>
          </div>
        </div>
        
        {sortedEvents.length === 0 ? (
          <Card className="yarn-card">
            <CardContent className="flex flex-col items-center justify-center py-10">
              <p className="text-muted-foreground mb-4">No events found</p>
              <Button onClick={handleAddEvent}>Add Your First Event</Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedEvents.map((event) => {
              const status = getEventStatus(event);
              return (
                <Card key={event.id} className="yarn-card overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg line-clamp-1">{event.name}</CardTitle>
                      <Badge className={getStatusColor(status)}>
                        {status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground mt-2">
                      <MapPin size={14} />
                      <span className="truncate">{event.location}</span>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center gap-2 mb-3">
                      <Calendar size={14} className="text-muted-foreground" />
                      <span className="text-sm">
                        {format(event.startDate, "MMM d")} - {format(event.endDate, "MMM d, yyyy")}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-2 mb-3">
                      <div className="bg-muted rounded p-2">
                        <p className="text-xs text-muted-foreground">Items</p>
                        <p className="font-medium">{event.itemsSent}</p>
                      </div>
                      <div className="bg-muted rounded p-2">
                        <p className="text-xs text-muted-foreground">Sales</p>
                        <p className="font-medium">₱{event.totalSales.toLocaleString()}</p>
                      </div>
                      <div className="bg-muted rounded p-2">
                        <p className="text-xs text-muted-foreground">Expenses</p>
                        <p className="font-medium">₱{event.expenses.toLocaleString()}</p>
                      </div>
                    </div>
                    
                    {event.notes && (
                      <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{event.notes}</p>
                    )}
                    
                    <div className="flex gap-2 mt-2">
                      <Button variant="outline" className="flex-1">
                        <Tag size={14} className="mr-1" />
                        Manage Inventory
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleEditEvent(event)}
                      >
                        <Pencil size={16} />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleDeleteEvent(event.id)}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
        
        {/* Event Form Dialog - For a complete implementation, create a separate EventForm component */}
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>
                {editingEvent ? "Edit Event" : "Add New Event"}
              </DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="name" className="text-right">Event Name</label>
                <Input
                  id="name"
                  defaultValue={editingEvent?.name || ""}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="location" className="text-right">Location</label>
                <Input
                  id="location"
                  defaultValue={editingEvent?.location || ""}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="startDate" className="text-right">Start Date</label>
                <Input
                  id="startDate"
                  type="date"
                  defaultValue={editingEvent?.startDate ? format(editingEvent.startDate, "yyyy-MM-dd") : ""}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="endDate" className="text-right">End Date</label>
                <Input
                  id="endDate"
                  type="date"
                  defaultValue={editingEvent?.endDate ? format(editingEvent.endDate, "yyyy-MM-dd") : ""}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="expenses" className="text-right">Expenses (₱)</label>
                <Input
                  id="expenses"
                  type="number"
                  defaultValue={editingEvent?.expenses || "0"}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="notes" className="text-right">Notes</label>
                <Input
                  id="notes"
                  defaultValue={editingEvent?.notes || ""}
                  className="col-span-3"
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsFormOpen(false)}>Cancel</Button>
                <Button onClick={() => handleSaveEvent({
                  name: (document.getElementById("name") as HTMLInputElement)?.value,
                  location: (document.getElementById("location") as HTMLInputElement)?.value,
                  startDate: new Date((document.getElementById("startDate") as HTMLInputElement)?.value),
                  endDate: new Date((document.getElementById("endDate") as HTMLInputElement)?.value),
                  expenses: parseInt((document.getElementById("expenses") as HTMLInputElement)?.value || "0"),
                  notes: (document.getElementById("notes") as HTMLInputElement)?.value || "",
                  itemsSent: editingEvent?.itemsSent || 0,
                  totalSales: editingEvent?.totalSales || 0
                })}>Save</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </Layout>
    </>
  );
};

export default Events;
