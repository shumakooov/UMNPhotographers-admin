type Manufacturer = { id: number; name: string; type: string };

type Model = { id: number; name: string; type: string };

interface Device {
  id: number;
  manufacturer: Manufacturer;
  model: Model;
  rating: number | null;
  type: "camera" | "lens" | "battery" | "memory" | "flash";
}

export interface Camera extends Device {
  crop?: string;
}

export interface Lens extends Device {
  camera: Camera;
  focus: number;
}

export interface Battery extends Device {}

export interface Memory extends Device {
  size: number;
}

export interface Flash extends Device {}
