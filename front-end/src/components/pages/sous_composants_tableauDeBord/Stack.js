const moment = require("moment");
// const private = new WeakMap()

class Stack {
  constructor() {
    this.courantDay = moment().format("YYYY-MM-DD");
    this.daysStackData = [];
    this.monthlyDaysStack = [];
    this.yearStack = [];
    this.daysCount = 0;
  }
  // pushing data to onto the stack
  push(data, TheDate) {
    data.forEach((obj) => {
      if (
        moment(TheDate).format("YYYY-MM-DD") ===
        moment(obj.createdAt).format("YYYY-MM-DD")
      ) {
        this.daysStackData.push(obj);
        this.daysCount++;
      }
    });
    // this.monthlyDaysStack.push(this.daysStackData);
    // return this.monthlyDaysStack.length;
    // return this.daysStackData;
  }
  // Retrieving all the packed trucks
  getPackedTrucks() {
    let TrucksTable = [];
    for (let i in this.daysStackData) {
      if (
        this.daysStackData[i].vehicule.heure_charge !== null &&
        this.daysStackData[i].vehicule.heure_chargement !== null &&
        this.daysStackData[i].vehicule.heure_parking !== null
      ) {
        TrucksTable.push(this.daysStackData[i].vehicule.heure_charge);
      }
    }
    return TrucksTable.length;
  }
  // Retrieving all the trucks with a "parking" status
  getTrucksFromParking() {
    let TrucksOnParking = [];
    for (let i in this.daysStackData) {
      if (
        this.daysStackData[i].vehicule.heure_parking !== null &&
        this.daysStackData[i].vehicule.heure_chargement === null &&
        this.daysStackData[i].vehicule.heure_charge === null
      ) {
        TrucksOnParking.push(this.daysStackData[i].vehicule.heure_parking);
      }
    }
    return TrucksOnParking.length;
  }
  // Retrieving all the unpacking trucks
  getUnpacking() {
    let unpackingTable = [];
    for (let i in this.daysStackData) {
      if (
        this.daysStackData[i].vehicule.heure_chargement !== null &&
        this.daysStackData[i].vehicule.heure_charge === null
      ) {
        unpackingTable.push(this.daysStackData[i].vehicule.heure_chargement);
      }
    }
    return unpackingTable.length;
  }
  // Retrieve all the clients from the stack by "heure_parking"
  getClients() {
    let clients = [];
    for (let i in this.daysStackData) {
      clients.push(this.daysStackData[i].client);
    }
    return clients.length;
  }
  // rendering the sum of any given array
  sum(list) {
    if (!list.length) {
      return 0;
    }
    return list[0] + this.sum(list.slice(1));
  }
  // Retrieve the total amount of sales in therms weight
  getQuantity() {
    const quantityTable = [];
    for (let i of this.daysStackData) {
      const client = i.clients;
      for (let j of client) {
        const produit = j.produits;
        for (let x of produit) {
          quantityTable.push(x.quantite);
        }
      }
    }
    return this.sum(quantityTable);
  }
  nombreDeBon() {
    return this.daysStackData.length;
  }
}

export default Stack;
