import { useState, useRef, useEffect } from "react";
import { ZoomIn, ZoomOut, RotateCw, Maximize2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

const FullscreenViewer = ({ src, alt }: { src: string; alt: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const minZoom = 0.5;
  const maxZoom = 5;
  const zoomStep = 0.25;

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + zoomStep, maxZoom));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - zoomStep, minZoom));
  };

  const handleReset = () => {
    setZoom(1);
    setPosition({ x: 0, y: 0 });
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      const delta = e.deltaY > 0 ? -zoomStep : zoomStep;
      setZoom((prev) => Math.max(minZoom, Math.min(prev + delta, maxZoom)));
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoom > 1) {
      setIsDragging(true);
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && zoom > 1) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (!isOpen) {
      setZoom(1);
      setPosition({ x: 0, y: 0 });
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          title="Fullscreen"
        >
          <Maximize2 className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[95vw] max-h-[95vh] w-full h-full p-0 bg-black/95 border-none">
        <div
          className="relative w-full h-full flex items-center justify-center overflow-hidden"
          onWheel={handleWheel}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          style={{ cursor: zoom > 1 ? (isDragging ? "grabbing" : "grab") : "default" }}
        >
          <div
            className="relative transition-transform duration-200"
            style={{
              transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`,
              transformOrigin: "center center",
            }}
          >
            <img
              src={src}
              alt={alt}
              className="max-w-[90vw] max-h-[90vh] w-auto h-auto object-contain select-none"
              draggable={false}
            />
          </div>

          {/* Fullscreen Controls */}
          <div className="absolute bottom-4 right-4 flex gap-2 bg-black/80 backdrop-blur-sm rounded-lg border border-white/20 p-2 shadow-lg">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleZoomOut}
              disabled={zoom <= minZoom}
              className="h-8 w-8 text-white hover:bg-white/20"
              title="Zoom Out"
            >
              <ZoomOut className="h-4 w-4" />
            </Button>
            <div className="flex items-center justify-center min-w-[60px] px-2 text-sm font-medium text-white">
              {Math.round(zoom * 100)}%
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleZoomIn}
              disabled={zoom >= maxZoom}
              className="h-8 w-8 text-white hover:bg-white/20"
              title="Zoom In"
            >
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleReset}
              disabled={zoom === 1 && position.x === 0 && position.y === 0}
              className="h-8 w-8 text-white hover:bg-white/20"
              title="Reset"
            >
              <RotateCw className="h-4 w-4" />
            </Button>
          </div>

          {/* Close button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 text-white hover:bg-white/20 h-10 w-10"
            title="Close"
          >
            <X className="h-5 w-5" />
          </Button>

          {/* Hint */}
          {zoom === 1 && (
            <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-sm rounded-lg border border-white/20 px-3 py-1.5 text-xs text-white/80">
              Use Ctrl/Cmd + Scroll to zoom • Click and drag when zoomed
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

interface ImageViewerProps {
  src: string;
  alt: string;
  className?: string;
}

const ImageViewer = ({ src, alt, className }: ImageViewerProps) => {
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const minZoom = 0.5;
  const maxZoom = 5;
  const zoomStep = 0.25;

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + zoomStep, maxZoom));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - zoomStep, minZoom));
  };

  const handleReset = () => {
    setZoom(1);
    setPosition({ x: 0, y: 0 });
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      const delta = e.deltaY > 0 ? -zoomStep : zoomStep;
      setZoom((prev) => Math.max(minZoom, Math.min(prev + delta, maxZoom)));
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoom > 1) {
      setIsDragging(true);
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && zoom > 1) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (zoom === 1) {
      setPosition({ x: 0, y: 0 });
    }
  }, [zoom]);

  return (
    <div className={cn("relative w-full", className)}>
      <div
        ref={containerRef}
        className="relative overflow-hidden rounded-lg border bg-muted/30 p-4"
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{ cursor: zoom > 1 ? (isDragging ? "grabbing" : "grab") : "default" }}
      >
        <div
          className="relative transition-transform duration-200"
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`,
            transformOrigin: "center center",
          }}
        >
          <img
            ref={imageRef}
            src={src}
            alt={alt}
            className="w-full h-auto select-none"
            draggable={false}
          />
        </div>

        {/* Zoom Controls */}
        <div className="absolute bottom-4 right-4 flex gap-2 bg-background/90 backdrop-blur-sm rounded-lg border p-2 shadow-lg">
          <Button
            variant="outline"
            size="icon"
            onClick={handleZoomOut}
            disabled={zoom <= minZoom}
            className="h-8 w-8"
            title="Zoom Out"
          >
            <ZoomOut className="h-4 w-4" />
          </Button>
          <div className="flex items-center justify-center min-w-[60px] px-2 text-sm font-medium">
            {Math.round(zoom * 100)}%
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={handleZoomIn}
            disabled={zoom >= maxZoom}
            className="h-8 w-8"
            title="Zoom In"
          >
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={handleReset}
            disabled={zoom === 1 && position.x === 0 && position.y === 0}
            className="h-8 w-8"
            title="Reset"
          >
            <RotateCw className="h-4 w-4" />
          </Button>
          <FullscreenViewer src={src} alt={alt} />
        </div>

        {/* Zoom hint */}
        {zoom === 1 && (
          <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm rounded-lg border px-3 py-1.5 text-xs text-muted-foreground">
            Use Ctrl/Cmd + Scroll to zoom • Click and drag when zoomed
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageViewer;

