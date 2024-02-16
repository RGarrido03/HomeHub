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
    name: "Inversor",
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
      value: "off",
      mapping: {
        on: "Ligado",
        off: "Desligado",
      },
    },
    action: {
      serviceMapping: {
        on: "turn_off",
        off: "turn_on",
      },
      domain: "switch",
      data: { entity_id: "switch.desumidificador" },
    },
  },
  "cover.garagem_da_mii": {
    name: "Garagem da Mii",
    type: "cover",
    icon: "garage",
    state: {
      value: "closed",
      mapping: {
        open: "Aberta",
        closed: "Fechada",
      },
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
      value: "closed",
      mapping: {
        open: "Aberta",
        closed: "Fechada",
      },
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
      value: "closed",
      hidden: true,
      mapping: {
        open: "Aberto",
        closed: "Fechado",
      },
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
      value: "off",
      hidden: true,
    },
    action: {
      service: "portao",
      domain: "script",
      data: {},
    },
  },
  "script.open_the_blinds": {
    name: "Abrir os estores",
    type: "script",
    icon: "window-shutter-open",
    state: {
      value: "off",
      hidden: true,
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
      value: "off",
      hidden: true,
    },
    action: {
      service: "fechar_todos_os_estores",
      domain: "script",
      data: {},
    },
  },
  "binary_sensor.reolink_video_doorbell_wifi_person": {
    name: "Pessoa detetada",
    type: "binary_sensor",
    icon: "motion-sensor",
    state: {
      value: "off",
    },
    hidden: true,
  },
  "binary_sensor.reolink_video_doorbell_wifi_visitor": {
    name: "Visitante",
    type: "binary_sensor",
    icon: "motion-sensor",
    state: {
      value: "off",
    },
    hidden: true,
  },
};
