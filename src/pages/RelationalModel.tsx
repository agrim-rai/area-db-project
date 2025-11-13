import PageLayout from "@/components/PageLayout";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const RelationalModel = () => {
  return (
    <PageLayout title="Relational Model">
      <div className="space-y-6">
        <p className="text-foreground leading-relaxed mb-8">
          The following tables represent the complete relational schema for the Airport and Airline Management System, 
          organized by functional domains:
        </p>

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="booking">
            <AccordionTrigger className="text-lg font-semibold">
              1. Booking & Passenger Flow
            </AccordionTrigger>
            <AccordionContent className="space-y-6 text-foreground">
              <div className="space-y-2">
                <h4 className="font-semibold text-primary">Passenger</h4>
                <ul className="list-disc list-inside pl-4 space-y-1">
                  <li>PassengerID (PK)</li>
                  <li>Name</li>
                  <li>Contact</li>
                  <li>PassportNumber</li>
                  <li>DateOfBirth</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-primary">Booking</h4>
                <ul className="list-disc list-inside pl-4 space-y-1">
                  <li>BookingID (PK)</li>
                  <li>PassengerID (FK → Passenger.PassengerID)</li>
                  <li>BookingRef</li>
                  <li>BookingDate</li>
                  <li>Status</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-primary">Payment</h4>
                <ul className="list-disc list-inside pl-4 space-y-1">
                  <li>PaymentID (PK)</li>
                  <li>BookingID (FK → Booking.BookingID)</li>
                  <li>Amount</li>
                  <li>PaymentDate</li>
                  <li>Method</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-primary">Ticket</h4>
                <ul className="list-disc list-inside pl-4 space-y-1">
                  <li>TicketID (PK)</li>
                  <li>BookingID (FK → Booking.BookingID)</li>
                  <li>FlightID (FK → Flight.FlightID)</li>
                  <li>SeatNumber</li>
                  <li>Class</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-primary">Baggage</h4>
                <ul className="list-disc list-inside pl-4 space-y-1">
                  <li>BaggageID (PK)</li>
                  <li>TicketID (FK → Ticket.TicketID)</li>
                  <li>Weight</li>
                  <li>TagNumber</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-primary">CheckIn</h4>
                <ul className="list-disc list-inside pl-4 space-y-1">
                  <li>CheckInID (PK)</li>
                  <li>TicketID (FK → Ticket.TicketID)</li>
                  <li>CheckInTime</li>
                  <li>GateNumber</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-primary">BoardingPass</h4>
                <ul className="list-disc list-inside pl-4 space-y-1">
                  <li>BoardingPassID (PK)</li>
                  <li>CheckInID (FK → CheckIn.CheckInID)</li>
                  <li>BoardingTime</li>
                  <li>Gate</li>
                  <li>Zone</li>
                </ul>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="flight">
            <AccordionTrigger className="text-lg font-semibold">
              2. Flight Operations & Scheduling
            </AccordionTrigger>
            <AccordionContent className="space-y-6 text-foreground">
              <div className="space-y-2">
                <h4 className="font-semibold text-primary">Flight</h4>
                <ul className="list-disc list-inside pl-4 space-y-1">
                  <li>FlightID (PK)</li>
                  <li>FlightNumber</li>
                  <li>AircraftID (FK → Aircraft.AircraftID)</li>
                  <li>RouteID (FK → Route.RouteID)</li>
                  <li>DepartureTime</li>
                  <li>ArrivalTime</li>
                  <li>Status</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-primary">Schedule</h4>
                <ul className="list-disc list-inside pl-4 space-y-1">
                  <li>ScheduleID (PK)</li>
                  <li>FlightID (FK → Flight.FlightID)</li>
                  <li>ScheduledDeparture</li>
                  <li>ScheduledArrival</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-primary">DelayCancellation</h4>
                <ul className="list-disc list-inside pl-4 space-y-1">
                  <li>EventID (PK)</li>
                  <li>FlightID (FK → Flight.FlightID)</li>
                  <li>EventType</li>
                  <li>Reason</li>
                  <li>Timestamp</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-primary">Route</h4>
                <ul className="list-disc list-inside pl-4 space-y-1">
                  <li>RouteID (PK)</li>
                  <li>OriginAirportID (FK → Airport.AirportID)</li>
                  <li>DestinationAirportID (FK → Airport.AirportID)</li>
                  <li>Distance</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-primary">Airport</h4>
                <ul className="list-disc list-inside pl-4 space-y-1">
                  <li>AirportID (PK)</li>
                  <li>Name</li>
                  <li>City</li>
                  <li>Country</li>
                  <li>Code</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-primary">Gate</h4>
                <ul className="list-disc list-inside pl-4 space-y-1">
                  <li>GateID (PK)</li>
                  <li>AirportID (FK → Airport.AirportID)</li>
                  <li>GateNumber</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-primary">Aircraft</h4>
                <ul className="list-disc list-inside pl-4 space-y-1">
                  <li>AircraftID (PK)</li>
                  <li>TailNumber</li>
                  <li>Model</li>
                  <li>Capacity</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-primary">Seat</h4>
                <ul className="list-disc list-inside pl-4 space-y-1">
                  <li>SeatID (PK)</li>
                  <li>AircraftID (FK → Aircraft.AircraftID)</li>
                  <li>SeatNumber</li>
                  <li>Class</li>
                </ul>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="crew">
            <AccordionTrigger className="text-lg font-semibold">
              3. Crew Management
            </AccordionTrigger>
            <AccordionContent className="space-y-6 text-foreground">
              <div className="space-y-2">
                <h4 className="font-semibold text-primary">CrewMember</h4>
                <ul className="list-disc list-inside pl-4 space-y-1">
                  <li>CrewID (PK)</li>
                  <li>Name</li>
                  <li>Role</li>
                  <li>Contact</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-primary">CrewAssignment</h4>
                <ul className="list-disc list-inside pl-4 space-y-1">
                  <li>AssignmentID (PK)</li>
                  <li>FlightID (FK → Flight.FlightID)</li>
                  <li>CrewID (FK → CrewMember.CrewID)</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-primary">PilotLicense</h4>
                <ul className="list-disc list-inside pl-4 space-y-1">
                  <li>LicenseID (PK)</li>
                  <li>CrewID (FK → CrewMember.CrewID)</li>
                  <li>LicenseType</li>
                  <li>IssueDate</li>
                  <li>ExpiryDate</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-primary">FARating</h4>
                <ul className="list-disc list-inside pl-4 space-y-1">
                  <li>RatingID (PK)</li>
                  <li>CrewID (FK → CrewMember.CrewID)</li>
                  <li>RatingType</li>
                  <li>ValidTill</li>
                </ul>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="maintenance">
            <AccordionTrigger className="text-lg font-semibold">
              4. Maintenance & Inventory
            </AccordionTrigger>
            <AccordionContent className="space-y-6 text-foreground">
              <div className="space-y-2">
                <h4 className="font-semibold text-primary">MaintenanceRecord</h4>
                <ul className="list-disc list-inside pl-4 space-y-1">
                  <li>RecordID (PK)</li>
                  <li>AircraftID (FK → Aircraft.AircraftID)</li>
                  <li>Date</li>
                  <li>Description</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-primary">MaintenanceTask</h4>
                <ul className="list-disc list-inside pl-4 space-y-1">
                  <li>TaskID (PK)</li>
                  <li>RecordID (FK → MaintenanceRecord.RecordID)</li>
                  <li>TaskDescription</li>
                  <li>Status</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-primary">PartInventory</h4>
                <ul className="list-disc list-inside pl-4 space-y-1">
                  <li>PartID (PK)</li>
                  <li>PartName</li>
                  <li>QuantityAvailable</li>
                  <li>SupplierID (FK → Supplier.SupplierID)</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-primary">Supplier</h4>
                <ul className="list-disc list-inside pl-4 space-y-1">
                  <li>SupplierID (PK)</li>
                  <li>Name</li>
                  <li>Contact</li>
                  <li>Address</li>
                </ul>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="rules">
            <AccordionTrigger className="text-lg font-semibold">
              5. Rules & Fares
            </AccordionTrigger>
            <AccordionContent className="space-y-6 text-foreground">
              <div className="space-y-2">
                <h4 className="font-semibold text-primary">FareBasis</h4>
                <ul className="list-disc list-inside pl-4 space-y-1">
                  <li>FareBasisID (PK)</li>
                  <li>Code</li>
                  <li>Description</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-primary">FareRule</h4>
                <ul className="list-disc list-inside pl-4 space-y-1">
                  <li>RuleID (PK)</li>
                  <li>FareBasisID (FK → FareBasis.FareBasisID)</li>
                  <li>RuleDescription</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-primary">LoyaltyProgram</h4>
                <ul className="list-disc list-inside pl-4 space-y-1">
                  <li>ProgramID (PK)</li>
                  <li>PassengerID (FK → Passenger.PassengerID)</li>
                  <li>FareBasisID (FK → FareBasis.FareBasisID)</li>
                  <li>Points</li>
                </ul>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="customer">
            <AccordionTrigger className="text-lg font-semibold">
              6. Customer & Ground Service
            </AccordionTrigger>
            <AccordionContent className="space-y-6 text-foreground">
              <div className="space-y-2">
                <h4 className="font-semibold text-primary">FeedbackComplaint</h4>
                <ul className="list-disc list-inside pl-4 space-y-1">
                  <li>FeedbackID (PK)</li>
                  <li>PassengerID (FK → Passenger.PassengerID)</li>
                  <li>Description</li>
                  <li>Date</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-primary">ServiceRequest</h4>
                <ul className="list-disc list-inside pl-4 space-y-1">
                  <li>RequestID (PK)</li>
                  <li>PassengerID (FK → Passenger.PassengerID)</li>
                  <li>RequestType</li>
                  <li>Status</li>
                  <li>AssignedAgentID (FK → CounterAgent.AgentID)</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-primary">LostFound</h4>
                <ul className="list-disc list-inside pl-4 space-y-1">
                  <li>LostFoundID (PK)</li>
                  <li>PassengerID (FK → Passenger.PassengerID)</li>
                  <li>Description</li>
                  <li>Status</li>
                  <li>AgentID (FK → CounterAgent.AgentID)</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-primary">CounterAgent</h4>
                <ul className="list-disc list-inside pl-4 space-y-1">
                  <li>AgentID (PK)</li>
                  <li>Name</li>
                  <li>Contact</li>
                  <li>StationID</li>
                </ul>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </PageLayout>
  );
};

export default RelationalModel;
