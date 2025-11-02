import { PassagerTypeModel } from "@/models/PassagerTypeModel";
import { SavePassagerInTripModel } from "@/models/SavePassagerInTripModel";
import { SaveVehicleInTripModel } from "@/models/SaveVehicleInTripModel";
import { TripModel } from "@/models/TripModel";
import { VehicleModel } from "@/models/VehicleModel";
import { tripService } from "@/services/tripService";
import React, { createContext, useContext, useState } from "react";

interface PurchasePassagerContextProps {
  passagers: SavePassagerInTripModel[];
  vehicles: SaveVehicleInTripModel[];
  addPassager: (newPassager: SavePassagerInTripModel) => void;
  removePassager: (passagerCpf: string) => void;

  addVehicle: (newVehicle: SaveVehicleInTripModel) => void;
  removeVehicle: (plate: string) => void;
  
  passagerTypes: PassagerTypeModel[];
  vehicleModels: VehicleModel[];
  
  currentTrip: TripModel | null;
  loadDataForTrip: (tripId: number) => void;

  isLoading: boolean;
}

const PurchasePassagerContext = createContext({} as PurchasePassagerContextProps);

export function PurchasePassagerProvider({ children }: { children: React.ReactNode }) {
  const [passagers, setPassagers] = useState<SavePassagerInTripModel[]>([]);
  const [vehicles, setVehicles] = useState<SaveVehicleInTripModel[]>([]);

  const [currentTrip, setCurrentTrip] = useState<TripModel | null>(null);
  const [passagerTypes, setPassagerTypes] = useState<PassagerTypeModel[]>([]);
  const [vehicleModels, setVehicleModels] = useState<VehicleModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  function addPassager(newPassager: SavePassagerInTripModel) {
    setPassagers((prevPassagers) => [...prevPassagers, newPassager]);
  }

  function removePassager(passagerCpf: string) {
    setPassagers((prevPassagers) => prevPassagers.filter((passager) => passager.cpf !== passagerCpf));
  }

  function addVehicle(newVehicle: SaveVehicleInTripModel) {
    setVehicles((prevVehicles) => [...prevVehicles, newVehicle]);
  }

  function removeVehicle(plate: string) {
    setVehicles((prevVehicles) => prevVehicles.filter((vehicle) => vehicle.plate !== plate));
  }

  async function loadDataForTrip(tripId: number) {
    if (!tripId) return;

    try {
      setIsLoading(true);
      const [tripData, passagerTypesData, vehicleModelsData] = await Promise.all([
        tripService.get(tripId),
        tripService.getAllPassagerTypes(),
        tripService.getAllVehicleModels()
      ]);

      setCurrentTrip(tripData);
      setPassagerTypes(passagerTypesData);
      setVehicleModels(vehicleModelsData);
    } catch (error) {
      console.error("Failed to load trip data:", error);
      setCurrentTrip(null);
      setPassagerTypes([]);
      setVehicleModels([]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <PurchasePassagerContext.Provider value={{
      passagers,
      vehicles,
      addPassager,
      removePassager,
      addVehicle,
      removeVehicle,
      passagerTypes,
      vehicleModels,
      isLoading,
      currentTrip,
      loadDataForTrip
    }}>
      {children}
    </PurchasePassagerContext.Provider>
  );
} 

export const usePurchasePassager = () => {
  const ctx = useContext(PurchasePassagerContext);

  if (!ctx) {
    throw new Error("usePurchasePassager must be used with PurchasePassagerProvider");
  }

  return ctx;
}