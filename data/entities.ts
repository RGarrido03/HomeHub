import { EntityMapping } from "@/types/device";

export const initialEntities: EntityMapping = {
  "sensor.solax_ac_power": {
    name: "AC Power",
    type: "sensor",
    icon: "search",
    unitOfMeasurement: "W",
    state: {
      value: 2500,
    },
  },
  "sensor.solax_ac_output_voltage": {
    name: "AC Voltage",
    type: "sensor",
    icon: "search",
    unitOfMeasurement: "V",
    state: {
      value: 240,
    },
  },
  "sensor.atc_a901_temperature": {
    name: "Quarto principal",
    type: "sensor",
    icon: "search",
    unitOfMeasurement: "ºC",
    state: {
      value: 21,
    },
  },
};
