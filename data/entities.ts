import { EntityMapping } from "@/types/device";

export const initialEntities: EntityMapping = {
  "sensor.atc_a901_temperature": {
    name: "Quarto principal",
    type: "sensor",
    icon: "thermometer",
    unitOfMeasurement: "ºC",
    state: {
      value: 0,
    },
  },
  "sensor.atc_c171_temperature": {
    name: "Quarto do Rúben",
    type: "sensor",
    icon: "thermometer",
    unitOfMeasurement: "ºC",
    state: {
      value: 0,
    },
  },
  "sensor.atc_512b_temperature": {
    name: "Quarto de hóspedes",
    type: "sensor",
    icon: "thermometer",
    unitOfMeasurement: "ºC",
    state: {
      value: 0,
    },
  },
  "sensor.atc_48d3_temperature": {
    name: "Mezzanine",
    type: "sensor",
    icon: "thermometer",
    unitOfMeasurement: "ºC",
    state: {
      value: 0,
    },
  },
  "sensor.solax_ac_power": {
    name: "AC Power",
    type: "sensor",
    icon: "solar-panel",
    unitOfMeasurement: "W",
    state: {
      value: 0,
    },
  },
  "switch.desumidificador": {
    name: "Desumidificador",
    type: "switch",
    icon: "air-humidifier",
    state: {
      value: 0,
    },
  },
  "script.open_the_blinds": {
    name: "Abrir os estores",
    type: "script",
    icon: "window-shutter-open",
    state: {
      value: "Off",
    },
    action: {
      service: "open_the_blinds",
      domain: "script",
      data: {},
    },
  },
  "script.fechar_todos_os_estores": {
    name: "Fechar os estores",
    type: "script",
    icon: "window-shutter",
    state: {
      value: "Off",
    },
    action: {
      service: "fechar_todos_os_estores",
      domain: "script",
      data: {},
    },
  },
  "cover.garagem_da_mii": {
    name: "Garagem da Mii",
    type: "cover",
    icon: "garage",
    state: {
      value: "Fechada",
    },
    action: {
      service: "garagem_da_mii",
      domain: "script",
      data: {},
    },
  },
  "cover.garagem_do_ruben": {
    name: "Garagem do Rúben",
    type: "cover",
    icon: "garage",
    state: {
      value: "Fechada",
    },
    action: {
      service: "garagem_do_ruben",
      domain: "script",
      data: {},
    },
  },
  "cover.portao_da_rua": {
    name: "Portão grande",
    type: "cover",
    icon: "gate",
    state: {
      value: "Fechado",
    },
    action: {
      service: "portao_da_rua",
      domain: "script",
      data: {},
    },
  },
  "binary_sensor.card_pin_lock": {
    name: "Portão pequeno",
    type: "binary_sensor",
    icon: "key",
    state: {
      value: "Fechado",
    },
    action: {
      service: "portao",
      domain: "script",
      data: {},
    },
  },
};
