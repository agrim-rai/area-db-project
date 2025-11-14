import { useRef, useEffect, useState } from "react";
import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Plus, Database, Trash2, Eye, Terminal, Play, Info, Code, Shield } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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

type DatabaseRecord = Record<string, string | number>;

const Visualize = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [database, setDatabase] = useState<Record<string, DatabaseRecord[]>>({});
  const [selectedEntity, setSelectedEntity] = useState<Entity | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [viewingTable, setViewingTable] = useState<string | null>(null);
  const [sqlQuery, setSqlQuery] = useState("");
  const [sqlResult, setSqlResult] = useState<{ columns: string[]; rows: any[]; error?: string } | null>(null);
  const [queryHistory, setQueryHistory] = useState<string[]>([]);
  const { toast } = useToast();

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

  const getPrimaryKey = (entity: Entity): string => {
    const pkAttr = entity.attributes.find((attr) => attr.type === "PK");
    return pkAttr?.name || "";
  };

  const getForeignKeyOptions = (attr: Attribute): string[] => {
    if (attr.type !== "FK" || !attr.reference) return [];
    const [refTable] = attr.reference.split(".");
    const refEntity = entities.find((e) => e.name === refTable);
    if (!refEntity) return [];
    const pkName = getPrimaryKey(refEntity);
    const records = database[refTable] || [];
    return records.map((record) => String(record[pkName])).filter(Boolean);
  };

  const validateConstraints = (entity: Entity, data: Record<string, string>): Record<string, string> => {
    const errors: Record<string, string> = {};
    const pkName = getPrimaryKey(entity);
    const tableData = database[entity.name] || [];

    entity.attributes.forEach((attr) => {
      const value = data[attr.name]?.trim() || "";

      if (attr.type === "PK") {
        if (!value) {
          errors[attr.name] = `${attr.name} is required (Primary Key)`;
        } else if (tableData.some((record) => String(record[attr.name]) === value)) {
          errors[attr.name] = `${attr.name} already exists (Primary Key must be unique)`;
        }
      } else if (attr.type === "FK") {
        if (!value) {
          errors[attr.name] = `${attr.name} is required (Foreign Key)`;
        } else if (attr.reference) {
          const [refTable] = attr.reference.split(".");
          const refEntity = entities.find((e) => e.name === refTable);
          if (refEntity) {
            const refPkName = getPrimaryKey(refEntity);
            const refRecords = database[refTable] || [];
            const exists = refRecords.some((record) => String(record[refPkName]) === value);
            if (!exists) {
              errors[attr.name] = `Referenced ${refTable}.${refPkName} does not exist`;
            }
          }
        }
      }
    });

    return errors;
  };

  const handleAddData = (entity: Entity) => {
    setSelectedEntity(entity);
    setFormData({});
    setFormErrors({});
    setIsDialogOpen(true);
  };

  const handleSubmit = () => {
    if (!selectedEntity) return;

    const errors = validateConstraints(selectedEntity, formData);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      toast({
        title: "Validation Error",
        description: "Please fix the errors before submitting.",
        variant: "destructive",
      });
      return;
    }

    setDatabase((prev) => {
      const tableData = prev[selectedEntity.name] || [];
      return {
        ...prev,
        [selectedEntity.name]: [...tableData, { ...formData }],
      };
    });

    toast({
      title: "Success",
      description: `Record added to ${selectedEntity.name} successfully!`,
    });

    setIsDialogOpen(false);
    setFormData({});
    setFormErrors({});
  };

  const handleDeleteRecord = (tableName: string, pkName: string, pkValue: string) => {
    const entity = entities.find((e) => e.name === tableName);
    if (!entity) return;

    const hasDependencies = entities.some((e) =>
      e.attributes.some(
        (attr) =>
          attr.type === "FK" &&
          attr.reference === `${tableName}.${pkName}` &&
          (database[e.name] || []).some((record) => String(record[attr.name]) === pkValue)
      )
    );

    if (hasDependencies) {
      toast({
        title: "Cannot Delete",
        description: "This record is referenced by other tables. Delete dependent records first.",
        variant: "destructive",
      });
      return;
    }

    setDatabase((prev) => ({
      ...prev,
      [tableName]: (prev[tableName] || []).filter((record) => String(record[pkName]) !== pkValue),
    }));

    toast({
      title: "Deleted",
      description: `Record deleted from ${tableName}`,
    });
  };

  const executeSQL = (query: string) => {
    const trimmedQuery = query.trim().toUpperCase();
    if (!trimmedQuery) {
      setSqlResult({ columns: [], rows: [], error: "Empty query" });
      return;
    }

    try {
      if (trimmedQuery.startsWith("SELECT")) {
        const match = trimmedQuery.match(/SELECT\s+(.+?)\s+FROM\s+(\w+)(?:\s+WHERE\s+(.+))?/i);
        if (!match) {
          throw new Error("Invalid SELECT syntax. Use: SELECT * FROM TableName [WHERE condition]");
        }

        const columns = match[1].trim() === "*" ? null : match[1].split(",").map((c) => c.trim());
        const tableName = match[2].trim();
        const whereClause = match[3]?.trim();

        if (!database[tableName]) {
          throw new Error(`Table '${tableName}' does not exist`);
        }

        let results = [...database[tableName]];

        if (whereClause) {
          const [field, operator, value] = whereClause.split(/\s+/);
          if (field && operator && value) {
            const cleanValue = value.replace(/['"]/g, "");
            results = results.filter((row) => {
              const rowValue = String(row[field]);
              switch (operator.toUpperCase()) {
                case "=":
                  return rowValue === cleanValue;
                case "!=":
                case "<>":
                  return rowValue !== cleanValue;
                case "LIKE":
                  return rowValue.toLowerCase().includes(cleanValue.toLowerCase());
                default:
                  return true;
              }
            });
          }
        }

        const entity = entities.find((e) => e.name === tableName);
        const allColumns = entity?.attributes.map((a) => a.name) || Object.keys(results[0] || {});
        const selectedColumns = columns || allColumns;

        setSqlResult({
          columns: selectedColumns,
          rows: results.map((row) => {
            const obj: Record<string, any> = {};
            selectedColumns.forEach((col) => {
              obj[col] = row[col] || null;
            });
            return obj;
          }),
        });

        setQueryHistory((prev) => [query, ...prev.slice(0, 9)]);
        toast({
          title: "Query Executed",
          description: `Returned ${results.length} row(s)`,
        });
      } else if (trimmedQuery.startsWith("INSERT")) {
        const match = trimmedQuery.match(/INSERT\s+INTO\s+(\w+)\s*\(([^)]+)\)\s*VALUES\s*\(([^)]+)\)/i);
        if (!match) {
          throw new Error("Invalid INSERT syntax. Use: INSERT INTO TableName (col1, col2) VALUES ('val1', 'val2')");
        }

        const tableName = match[1].trim();
        const columns = match[2].split(",").map((c) => c.trim());
        const values = match[3].split(",").map((v) => v.trim().replace(/^['"]|['"]$/g, ""));

        if (columns.length !== values.length) {
          throw new Error("Column count doesn't match value count");
        }

        const entity = entities.find((e) => e.name === tableName);
        if (!entity) {
          throw new Error(`Table '${tableName}' does not exist`);
        }

        const newRecord: Record<string, string> = {};
        columns.forEach((col, idx) => {
          newRecord[col] = values[idx];
        });

        const errors = validateConstraints(entity, newRecord);
        if (Object.keys(errors).length > 0) {
          throw new Error(Object.values(errors)[0]);
        }

        setDatabase((prev) => ({
          ...prev,
          [tableName]: [...(prev[tableName] || []), newRecord],
        }));

        setSqlResult({
          columns: ["Status"],
          rows: [{ Status: `1 row inserted into ${tableName}` }],
        });

        setQueryHistory((prev) => [query, ...prev.slice(0, 9)]);
        toast({
          title: "Insert Successful",
          description: `Record inserted into ${tableName}`,
        });
      } else if (trimmedQuery.startsWith("DELETE")) {
        const match = trimmedQuery.match(/DELETE\s+FROM\s+(\w+)(?:\s+WHERE\s+(.+))?/i);
        if (!match) {
          throw new Error("Invalid DELETE syntax. Use: DELETE FROM TableName [WHERE condition]");
        }

        const tableName = match[1].trim();
        const whereClause = match[2]?.trim();

        if (!database[tableName]) {
          throw new Error(`Table '${tableName}' does not exist`);
        }

        let deletedCount = 0;
        if (whereClause) {
          const [field, operator, value] = whereClause.split(/\s+/);
          if (field && operator && value) {
            const cleanValue = value.replace(/['"]/g, "");
            const entity = entities.find((e) => e.name === tableName);
            const pkName = getPrimaryKey(entity!);

            setDatabase((prev) => {
              const tableData = prev[tableName] || [];
              const toDelete = tableData.filter((row) => {
                const rowValue = String(row[field]);
                let matches = false;
                switch (operator.toUpperCase()) {
                  case "=":
                    matches = rowValue === cleanValue;
                    break;
                  case "!=":
                  case "<>":
                    matches = rowValue !== cleanValue;
                    break;
                }
                return matches;
              });

              deletedCount = toDelete.length;

              const hasDependencies = toDelete.some((record) => {
                const pkValue = String(record[pkName]);
                return entities.some((e) =>
                  e.attributes.some(
                    (attr) =>
                      attr.type === "FK" &&
                      attr.reference === `${tableName}.${pkName}` &&
                      (database[e.name] || []).some((r) => String(r[attr.name]) === pkValue)
                  )
                );
              });

              if (hasDependencies) {
                throw new Error("Cannot delete: Record is referenced by other tables");
              }

              return {
                ...prev,
                [tableName]: tableData.filter((row) => {
                  const rowValue = String(row[field]);
                  let matches = false;
                  switch (operator.toUpperCase()) {
                    case "=":
                      matches = rowValue === cleanValue;
                      break;
                    case "!=":
                    case "<>":
                      matches = rowValue !== cleanValue;
                      break;
                  }
                  return !matches;
                }),
              };
            });
          }
        } else {
          throw new Error("DELETE without WHERE clause is not allowed for safety");
        }

        setSqlResult({
          columns: ["Status"],
          rows: [{ Status: `${deletedCount} row(s) deleted from ${tableName}` }],
        });

        setQueryHistory((prev) => [query, ...prev.slice(0, 9)]);
        toast({
          title: "Delete Successful",
          description: `${deletedCount} record(s) deleted`,
        });
      } else {
        throw new Error("Unsupported SQL command. Supported: SELECT, INSERT, DELETE");
      }
    } catch (error: any) {
      setSqlResult({
        columns: [],
        rows: [],
        error: error.message || "SQL execution error",
      });
      toast({
        title: "SQL Error",
        description: error.message || "Failed to execute query",
        variant: "destructive",
      });
    }
  };

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
  }, [dimensions, entities, database]);

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

  const totalRecords = Object.values(database).reduce((sum, records) => sum + records.length, 0);

  const getAllConstraints = () => {
    const constraints: Array<{ table: string; type: string; constraint: string; description: string }> = [];
    
    entities.forEach((entity) => {
      const pkAttr = entity.attributes.find((a) => a.type === "PK");
      if (pkAttr) {
        constraints.push({
          table: entity.name,
          type: "Primary Key",
          constraint: pkAttr.name,
          description: `Unique identifier for ${entity.name}. Must be unique and not null.`,
        });
      }

      entity.attributes
        .filter((a) => a.type === "FK")
        .forEach((fkAttr) => {
          constraints.push({
            table: entity.name,
            type: "Foreign Key",
            constraint: `${fkAttr.name} → ${fkAttr.reference}`,
            description: `References ${fkAttr.reference}. Must exist in referenced table.`,
          });
        });
    });

    return constraints;
  };

  return (
    <PageLayout title="ER Model Visualizer & Database Interface">
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-foreground leading-relaxed">
              Interactive visualization of all entities and their relationships in the Airport and Airline Management System.
              Tables are color-coded by domain, and foreign key relationships are shown with connecting lines.
            </p>
            <div className="mt-4 flex items-center gap-4">
              <Badge variant="outline" className="text-sm">
                <Database className="h-3 w-3 mr-1" />
                Total Records: {totalRecords}
              </Badge>
              <Badge variant="outline" className="text-sm">
                <Shield className="h-3 w-3 mr-1" />
                Supabase PostgreSQL
              </Badge>
            </div>
          </div>
        </div>

        <Tabs defaultValue="visualization" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="visualization">Visualization</TabsTrigger>
            <TabsTrigger value="sql">
              <Terminal className="h-4 w-4 mr-2" />
              SQL Query
            </TabsTrigger>
            <TabsTrigger value="constraints">
              <Shield className="h-4 w-4 mr-2" />
              Constraints
            </TabsTrigger>
            <TabsTrigger value="documentation">
              <Code className="h-4 w-4 mr-2" />
              How It's Made
            </TabsTrigger>
          </TabsList>

          <TabsContent value="visualization" className="space-y-6">

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
              domainEntities.map((entity) => {
                const recordCount = (database[entity.name] || []).length;
                return (
                  <div
                    key={entity.name}
                    data-table-name={entity.name}
                    className="bg-card border-2 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                    style={{ borderColor: entity.color }}
                  >
                    <div
                      className="px-4 py-3 font-bold text-white text-center flex items-center justify-between"
                      style={{ backgroundColor: entity.color }}
                    >
                      <span>{entity.name}</span>
                      <div className="flex items-center gap-2">
                        {recordCount > 0 && (
                          <Badge variant="secondary" className="text-xs">
                            {recordCount}
                          </Badge>
                        )}
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-6 w-6 text-white hover:bg-white/20"
                          onClick={() => handleAddData(entity)}
                          title={`Add data to ${entity.name}`}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                        {recordCount > 0 && (
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-6 w-6 text-white hover:bg-white/20"
                            onClick={() => setViewingTable(viewingTable === entity.name ? null : entity.name)}
                            title={`View data in ${entity.name}`}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
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
                      {viewingTable === entity.name && recordCount > 0 && (
                        <div className="mt-2 pt-2 border-t border-border/50">
                          <div className="max-h-60 overflow-y-auto space-y-2">
                            {(database[entity.name] || []).map((record, idx) => {
                              const pkName = getPrimaryKey(entity);
                              const pkValue = String(record[pkName]);
                              return (
                                <div
                                  key={idx}
                                  className="px-2 py-2 text-xs bg-background rounded border border-border/50 group hover:border-primary/50 transition-colors"
                                >
                                  <div className="flex items-start justify-between mb-1">
                                    <span className="font-semibold text-primary">{pkName}: {pkValue}</span>
                                    <Button
                                      size="icon"
                                      variant="ghost"
                                      className="h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity"
                                      onClick={() => handleDeleteRecord(entity.name, pkName, pkValue)}
                                    >
                                      <Trash2 className="h-3 w-3 text-destructive" />
                                    </Button>
                                  </div>
                                  <div className="space-y-0.5 text-muted-foreground">
                                    {entity.attributes
                                      .filter((attr) => attr.name !== pkName)
                                      .map((attr) => (
                                        <div key={attr.name} className="flex gap-2">
                                          <span className="font-medium">{attr.name}:</span>
                                          <span>{String(record[attr.name] || "-")}</span>
                                        </div>
                                      ))}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
          </TabsContent>
        </Tabs>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add Record to {selectedEntity?.name}</DialogTitle>
              <DialogDescription>
                Fill in the form below. Primary keys are required and must be unique. Foreign keys must reference existing records.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              {selectedEntity?.attributes.map((attr) => {
                const isFK = attr.type === "FK";
                const fkOptions = isFK ? getForeignKeyOptions(attr) : [];
                return (
                  <div key={attr.name} className="space-y-2">
                    <Label htmlFor={attr.name} className="flex items-center gap-2">
                      {attr.name}
                      {attr.type === "PK" && (
                        <Badge variant="outline" className="text-xs">
                          PK
                        </Badge>
                      )}
                      {attr.type === "FK" && (
                        <Badge variant="outline" className="text-xs">
                          FK
                        </Badge>
                      )}
                    </Label>
                    {isFK && fkOptions.length > 0 ? (
                      <Select
                        value={formData[attr.name] || ""}
                        onValueChange={(value) =>
                          setFormData((prev) => ({ ...prev, [attr.name]: value }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder={`Select ${attr.reference}`} />
                        </SelectTrigger>
                        <SelectContent>
                          {fkOptions.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      <Input
                        id={attr.name}
                        type={attr.name.toLowerCase().includes("date") || attr.name.toLowerCase().includes("time") ? "datetime-local" : "text"}
                        value={formData[attr.name] || ""}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, [attr.name]: e.target.value }))
                        }
                        placeholder={`Enter ${attr.name}`}
                        className={formErrors[attr.name] ? "border-destructive" : ""}
                      />
                    )}
                    {formErrors[attr.name] && (
                      <p className="text-sm text-destructive">{formErrors[attr.name]}</p>
                    )}
                    {isFK && fkOptions.length === 0 && (
                      <p className="text-sm text-muted-foreground">
                        No records available in {attr.reference?.split(".")[0]}. Add records there first.
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSubmit}>Add Record</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </PageLayout>
  );
};

export default Visualize;
