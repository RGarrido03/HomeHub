import { EntityMapping } from "@/types/device";

export const initialEntities: EntityMapping = {
  "sensor.solax_ac_power": {
    name: "AC Power",
    type: "sensor",
    icon: "solar-panel",
    unitOfMeasurement: "W",
    state: {
      value: 0,
    },
  },
  "sensor.solax_ac_output_voltage": {
    name: "AC Voltage",
    type: "sensor",
    icon: "sine-wave",
    unitOfMeasurement: "V",
    state: {
      value: 0,
    },
  },
  "sensor.atc_a901_temperature": {
    name: "Quarto principal",
    type: "sensor",
    icon: "thermometer",
    unitOfMeasurement: "ºC",
    state: {
      value: 0,
    },
  },
};
