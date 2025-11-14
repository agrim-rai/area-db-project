import { useRef, useEffect, useState } from "react";
import PageLayout from "@/components/PageLayout";

interface Attribute {
  name: string;
  type: "PK" | "FK" | "normal";
  reference?: string;
}

interface Entity {
  name: string;
  attributes: Attribute[];
  domain: string;
  color: string;
}

const Visualize = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const entities: Entity[] = [
    {
      name: "Passenger",
      domain: "Booking & Passenger Flow",
      color: "#3b82f6",
      attributes: [
        { name: "PassengerID", type: "PK" },
        { name: "Name", type: "normal" },
        { name: "Contact", type: "normal" },
        { name: "PassportNumber", type: "normal" },
        { name: "DateOfBirth", type: "normal" },
      ],
    },
    {
      name: "Booking",
      domain: "Booking & Passenger Flow",
      color: "#3b82f6",
      attributes: [
        { name: "BookingID", type: "PK" },
        { name: "PassengerID", type: "FK", reference: "Passenger.PassengerID" },
        { name: "BookingRef", type: "normal" },
        { name: "BookingDate", type: "normal" },
        { name: "Status", type: "normal" },
      ],
    },
    {
      name: "Payment",
      domain: "Booking & Passenger Flow",
      color: "#3b82f6",
      attributes: [
        { name: "PaymentID", type: "PK" },
        { name: "BookingID", type: "FK", reference: "Booking.BookingID" },
        { name: "Amount", type: "normal" },
        { name: "PaymentDate", type: "normal" },
        { name: "Method", type: "normal" },
      ],
    },
    {
      name: "Ticket",
      domain: "Booking & Passenger Flow",
      color: "#3b82f6",
      attributes: [
        { name: "TicketID", type: "PK" },
        { name: "BookingID", type: "FK", reference: "Booking.BookingID" },
        { name: "FlightID", type: "FK", reference: "Flight.FlightID" },
        { name: "SeatNumber", type: "normal" },
        { name: "Class", type: "normal" },
      ],
    },
    {
      name: "Baggage",
      domain: "Booking & Passenger Flow",
      color: "#3b82f6",
      attributes: [
        { name: "BaggageID", type: "PK" },
        { name: "TicketID", type: "FK", reference: "Ticket.TicketID" },
        { name: "Weight", type: "normal" },
        { name: "TagNumber", type: "normal" },
      ],
    },
    {
      name: "CheckIn",
      domain: "Booking & Passenger Flow",
      color: "#3b82f6",
      attributes: [
        { name: "CheckInID", type: "PK" },
        { name: "TicketID", type: "FK", reference: "Ticket.TicketID" },
        { name: "CheckInTime", type: "normal" },
        { name: "GateNumber", type: "normal" },
      ],
    },
    {
      name: "BoardingPass",
      domain: "Booking & Passenger Flow",
      color: "#3b82f6",
      attributes: [
        { name: "BoardingPassID", type: "PK" },
        { name: "CheckInID", type: "FK", reference: "CheckIn.CheckInID" },
        { name: "BoardingTime", type: "normal" },
        { name: "Gate", type: "normal" },
        { name: "Zone", type: "normal" },
      ],
    },
    {
      name: "Flight",
      domain: "Flight Operations & Scheduling",
      color: "#10b981",
      attributes: [
        { name: "FlightID", type: "PK" },
        { name: "FlightNumber", type: "normal" },
        { name: "AircraftID", type: "FK", reference: "Aircraft.AircraftID" },
        { name: "RouteID", type: "FK", reference: "Route.RouteID" },
        { name: "DepartureTime", type: "normal" },
        { name: "ArrivalTime", type: "normal" },
        { name: "Status", type: "normal" },
      ],
    },
    {
      name: "Schedule",
      domain: "Flight Operations & Scheduling",
      color: "#10b981",
      attributes: [
        { name: "ScheduleID", type: "PK" },
        { name: "FlightID", type: "FK", reference: "Flight.FlightID" },
        { name: "ScheduledDeparture", type: "normal" },
        { name: "ScheduledArrival", type: "normal" },
      ],
    },
    {
      name: "DelayCancellation",
      domain: "Flight Operations & Scheduling",
      color: "#10b981",
      attributes: [
        { name: "EventID", type: "PK" },
        { name: "FlightID", type: "FK", reference: "Flight.FlightID" },
        { name: "EventType", type: "normal" },
        { name: "Reason", type: "normal" },
        { name: "Timestamp", type: "normal" },
      ],
    },
    {
      name: "Route",
      domain: "Flight Operations & Scheduling",
      color: "#10b981",
      attributes: [
        { name: "RouteID", type: "PK" },
        { name: "OriginAirportID", type: "FK", reference: "Airport.AirportID" },
        { name: "DestinationAirportID", type: "FK", reference: "Airport.AirportID" },
        { name: "Distance", type: "normal" },
      ],
    },
    {
      name: "Airport",
      domain: "Flight Operations & Scheduling",
      color: "#10b981",
      attributes: [
        { name: "AirportID", type: "PK" },
        { name: "Name", type: "normal" },
        { name: "City", type: "normal" },
        { name: "Country", type: "normal" },
        { name: "Code", type: "normal" },
      ],
    },
    {
      name: "Gate",
      domain: "Flight Operations & Scheduling",
      color: "#10b981",
      attributes: [
        { name: "GateID", type: "PK" },
        { name: "AirportID", type: "FK", reference: "Airport.AirportID" },
        { name: "GateNumber", type: "normal" },
      ],
    },
    {
      name: "Aircraft",
      domain: "Flight Operations & Scheduling",
      color: "#10b981",
      attributes: [
        { name: "AircraftID", type: "PK" },
        { name: "TailNumber", type: "normal" },
        { name: "Model", type: "normal" },
        { name: "Capacity", type: "normal" },
      ],
    },
    {
      name: "Seat",
      domain: "Flight Operations & Scheduling",
      color: "#10b981",
      attributes: [
        { name: "SeatID", type: "PK" },
        { name: "AircraftID", type: "FK", reference: "Aircraft.AircraftID" },
        { name: "SeatNumber", type: "normal" },
        { name: "Class", type: "normal" },
      ],
    },
    {
      name: "CrewMember",
      domain: "Crew Management",
      color: "#f59e0b",
      attributes: [
        { name: "CrewID", type: "PK" },
        { name: "Name", type: "normal" },
        { name: "Role", type: "normal" },
        { name: "Contact", type: "normal" },
      ],
    },
    {
      name: "CrewAssignment",
      domain: "Crew Management",
      color: "#f59e0b",
      attributes: [
        { name: "AssignmentID", type: "PK" },
        { name: "FlightID", type: "FK", reference: "Flight.FlightID" },
        { name: "CrewID", type: "FK", reference: "CrewMember.CrewID" },
      ],
    },
    {
      name: "PilotLicense",
      domain: "Crew Management",
      color: "#f59e0b",
      attributes: [
        { name: "LicenseID", type: "PK" },
        { name: "CrewID", type: "FK", reference: "CrewMember.CrewID" },
        { name: "LicenseType", type: "normal" },
        { name: "IssueDate", type: "normal" },
        { name: "ExpiryDate", type: "normal" },
      ],
    },
    {
      name: "FARating",
      domain: "Crew Management",
      color: "#f59e0b",
      attributes: [
        { name: "RatingID", type: "PK" },
        { name: "CrewID", type: "FK", reference: "CrewMember.CrewID" },
        { name: "RatingType", type: "normal" },
        { name: "ValidTill", type: "normal" },
      ],
    },
    {
      name: "MaintenanceRecord",
      domain: "Maintenance & Inventory",
      color: "#8b5cf6",
      attributes: [
        { name: "RecordID", type: "PK" },
        { name: "AircraftID", type: "FK", reference: "Aircraft.AircraftID" },
        { name: "Date", type: "normal" },
        { name: "Description", type: "normal" },
      ],
    },
    {
      name: "MaintenanceTask",
      domain: "Maintenance & Inventory",
      color: "#8b5cf6",
      attributes: [
        { name: "TaskID", type: "PK" },
        { name: "RecordID", type: "FK", reference: "MaintenanceRecord.RecordID" },
        { name: "TaskDescription", type: "normal" },
        { name: "Status", type: "normal" },
      ],
    },
    {
      name: "PartInventory",
      domain: "Maintenance & Inventory",
      color: "#8b5cf6",
      attributes: [
        { name: "PartID", type: "PK" },
        { name: "PartName", type: "normal" },
        { name: "QuantityAvailable", type: "normal" },
        { name: "SupplierID", type: "FK", reference: "Supplier.SupplierID" },
      ],
    },
    {
      name: "Supplier",
      domain: "Maintenance & Inventory",
      color: "#8b5cf6",
      attributes: [
        { name: "SupplierID", type: "PK" },
        { name: "Name", type: "normal" },
        { name: "Contact", type: "normal" },
        { name: "Address", type: "normal" },
      ],
    },
    {
      name: "FareBasis",
      domain: "Rules & Fares",
      color: "#ec4899",
      attributes: [
        { name: "FareBasisID", type: "PK" },
        { name: "Code", type: "normal" },
        { name: "Description", type: "normal" },
      ],
    },
    {
      name: "FareRule",
      domain: "Rules & Fares",
      color: "#ec4899",
      attributes: [
        { name: "RuleID", type: "PK" },
        { name: "FareBasisID", type: "FK", reference: "FareBasis.FareBasisID" },
        { name: "RuleDescription", type: "normal" },
      ],
    },
    {
      name: "LoyaltyProgram",
      domain: "Rules & Fares",
      color: "#ec4899",
      attributes: [
        { name: "ProgramID", type: "PK" },
        { name: "PassengerID", type: "FK", reference: "Passenger.PassengerID" },
        { name: "FareBasisID", type: "FK", reference: "FareBasis.FareBasisID" },
        { name: "Points", type: "normal" },
      ],
    },
    {
      name: "FeedbackComplaint",
      domain: "Customer & Ground Service",
      color: "#14b8a6",
      attributes: [
        { name: "FeedbackID", type: "PK" },
        { name: "PassengerID", type: "FK", reference: "Passenger.PassengerID" },
        { name: "Description", type: "normal" },
        { name: "Date", type: "normal" },
      ],
    },
    {
      name: "ServiceRequest",
      domain: "Customer & Ground Service",
      color: "#14b8a6",
      attributes: [
        { name: "RequestID", type: "PK" },
        { name: "PassengerID", type: "FK", reference: "Passenger.PassengerID" },
        { name: "RequestType", type: "normal" },
        { name: "Status", type: "normal" },
        { name: "AssignedAgentID", type: "FK", reference: "CounterAgent.AgentID" },
      ],
    },
    {
      name: "LostFound",
      domain: "Customer & Ground Service",
      color: "#14b8a6",
      attributes: [
        { name: "LostFoundID", type: "PK" },
        { name: "PassengerID", type: "FK", reference: "Passenger.PassengerID" },
        { name: "Description", type: "normal" },
        { name: "Status", type: "normal" },
        { name: "AgentID", type: "FK", reference: "CounterAgent.AgentID" },
      ],
    },
    {
      name: "CounterAgent",
      domain: "Customer & Ground Service",
      color: "#14b8a6",
      attributes: [
        { name: "AgentID", type: "PK" },
        { name: "Name", type: "normal" },
        { name: "Contact", type: "normal" },
        { name: "StationID", type: "normal" },
      ],
    },
  ];

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setDimensions({ width: rect.width, height: rect.height });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  useEffect(() => {
    if (!svgRef.current || dimensions.width === 0) return;

    const drawLines = () => {
      const svg = svgRef.current;
      if (!svg) return;

      const tables = document.querySelectorAll("[data-table-name]");
      svg.innerHTML = "";

      const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
      const marker = document.createElementNS("http://www.w3.org/2000/svg", "marker");
      marker.setAttribute("id", "arrowhead");
      marker.setAttribute("markerWidth", "10");
      marker.setAttribute("markerHeight", "10");
      marker.setAttribute("refX", "9");
      marker.setAttribute("refY", "3");
      marker.setAttribute("orient", "auto");
      const polygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
      polygon.setAttribute("points", "0 0, 10 3, 0 6");
      polygon.setAttribute("fill", "#666");
      marker.appendChild(polygon);
      defs.appendChild(marker);
      svg.appendChild(defs);

      tables.forEach((table) => {
        const tableName = table.getAttribute("data-table-name");
        if (!tableName) return;

        const tableRect = table.getBoundingClientRect();
        const containerRect = containerRef.current?.getBoundingClientRect();
        if (!containerRect) return;

        const tableX = tableRect.left - containerRect.left + tableRect.width / 2;
        const tableY = tableRect.top - containerRect.top;

        const entity = entities.find((e) => e.name === tableName);
        if (!entity) return;

        entity.attributes.forEach((attr) => {
          if (attr.type === "FK" && attr.reference) {
            const [refTable] = attr.reference.split(".");
            const refTableElement = document.querySelector(`[data-table-name="${refTable}"]`);
            
            if (refTableElement) {
              const refRect = refTableElement.getBoundingClientRect();
              const refX = refRect.left - containerRect.left + refRect.width / 2;
              const refY = refRect.top - containerRect.top;

              const attrIndex = entity.attributes.findIndex((a) => a.name === attr.name);
              const attrY = tableY + 60 + (attrIndex + 1) * 28;

              const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
              line.setAttribute("x1", String(tableX));
              line.setAttribute("y1", String(attrY));
              line.setAttribute("x2", String(refX));
              line.setAttribute("y2", String(refY + 30));
              line.setAttribute("stroke", entity.color);
              line.setAttribute("stroke-width", "2");
              line.setAttribute("stroke-dasharray", "5,5");
              line.setAttribute("opacity", "0.6");
              line.setAttribute("marker-end", "url(#arrowhead)");

              svg.appendChild(line);
            }
          }
        });
      });
    };

    const timeoutId = setTimeout(drawLines, 100);
    return () => clearTimeout(timeoutId);
  }, [dimensions, entities]);

  const domainColors: Record<string, string> = {
    "Booking & Passenger Flow": "#3b82f6",
    "Flight Operations & Scheduling": "#10b981",
    "Crew Management": "#f59e0b",
    "Maintenance & Inventory": "#8b5cf6",
    "Rules & Fares": "#ec4899",
    "Customer & Ground Service": "#14b8a6",
  };

  const groupedEntities = entities.reduce((acc, entity) => {
    if (!acc[entity.domain]) {
      acc[entity.domain] = [];
    }
    acc[entity.domain].push(entity);
    return acc;
  }, {} as Record<string, Entity[]>);

  return (
    <PageLayout title="ER Model Visualizer">
      <div className="space-y-8">
        <p className="text-foreground leading-relaxed">
          Interactive visualization of all entities and their relationships in the Airport and Airline Management System.
          Tables are color-coded by domain, and foreign key relationships are shown with connecting lines.
        </p>

        <div className="flex flex-wrap gap-4 mb-6">
          {Object.entries(domainColors).map(([domain, color]) => (
            <div key={domain} className="flex items-center gap-2">
              <div className="w-4 h-4 rounded" style={{ backgroundColor: color }}></div>
              <span className="text-sm text-foreground">{domain}</span>
            </div>
          ))}
        </div>

        <div
          ref={containerRef}
          className="relative w-full min-h-screen bg-background p-8"
          style={{ overflow: "visible" }}
        >
          <svg
            ref={svgRef}
            className="absolute top-0 left-0 pointer-events-none"
            width={dimensions.width || "100%"}
            height={dimensions.height || "100%"}
            style={{ zIndex: 1 }}
          ></svg>

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Object.entries(groupedEntities).map(([domain, domainEntities]) =>
              domainEntities.map((entity) => (
                <div
                  key={entity.name}
                  data-table-name={entity.name}
                  className="bg-card border-2 rounded-lg shadow-lg overflow-hidden"
                  style={{ borderColor: entity.color }}
                >
                  <div
                    className="px-4 py-3 font-bold text-white text-center"
                    style={{ backgroundColor: entity.color }}
                  >
                    {entity.name}
                  </div>
                  <div className="p-2 bg-muted/30">
                    {entity.attributes.map((attr, idx) => (
                      <div
                        key={idx}
                        className="px-3 py-1.5 text-sm border-b border-border/50 last:border-b-0"
                      >
                        <span
                          className={
                            attr.type === "PK"
                              ? "font-bold text-primary"
                              : attr.type === "FK"
                              ? "font-semibold italic text-blue-600"
                              : "text-foreground"
                          }
                        >
                          {attr.name}
                        </span>
                        {attr.type === "PK" && (
                          <span className="ml-2 text-xs text-primary font-semibold">(PK)</span>
                        )}
                        {attr.type === "FK" && attr.reference && (
                          <span className="ml-2 text-xs text-blue-600">→ {attr.reference}</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Visualize;

