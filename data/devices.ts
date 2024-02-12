import { Device } from "@/types/device";

export const devices: Device[] = [
  {
    name: "SolaX Solar Panel",
    icon: "solar-panel",
    primaryEntity: "sensor.solax_ac_power",
    secondaryEntities: ["sensor.solax_ac_output_voltage"],
  },
  {
    name: "Thermometer (Quarto principal)",
    icon: "thermometer",
    primaryEntity: "sensor.atc_a901_temperature",
  },
];
