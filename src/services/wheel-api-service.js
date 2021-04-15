import config from "../config";

const WheelsApiService = {
  getAllWheels() {
    return fetch(`${config.API_ENDPOINT}/api/wheels/all`).then((res) =>
      res.json()
    );
  },
  searchInvoice(invoice) {
    return fetch(
      `${config.API_ENDPOINT}/api/wheelrepair/search?invoice=${invoice}`
    ).then((wRepair) => wRepair.json());
  },
  initRepair(newRepair) {
    return fetch(`${config.API_ENDPOINT}/api/wheelrepair/addwr`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newRepair),
    });
  },
  wRepairCompleted(number, textMessage) {
    return fetch(`${config.API_ENDPOINT}/api/wheelrepair/isready`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        number: number,
        textMessage: textMessage,
      }),
    });
  },
  getRepairsByDate(pickedDate) {
    return fetch(
      `${config.API_ENDPOINT}/api/wheelrepair/searchByDate?pickedDate=${pickedDate}`
    ).then((wRepair) => wRepair.json());
  },
  getRepairsByWeek(week) {
    return fetch(
      `${config.API_ENDPOINT}/api/wheelrepair/searchByWeek?week=${week}`
    ).then((wRepair) => wRepair.json());
  },
  updateRepairOnceReady(updatedRepair) {
    return fetch(`${config.API_ENDPOINT}/api/wheelrepair/complete`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedRepair),
    });
  },
  getNotReadyRepair(){
    return fetch(
      `${config.API_ENDPOINT}/api/wheelrepair/inProgress`
    ).then((wRepair) => wRepair.json());
  }
};

export default WheelsApiService;
