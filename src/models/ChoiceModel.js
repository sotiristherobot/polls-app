export default class ChoiceModel {
  constructor(id, choice, votes) {
    this._id = id;
    this._choice = choice;
    this._votes = votes;
  }

  // getters - setters
  get id() {
    return this._id;
  }
  get choice() {
    return this._choice;
  }
  get votes() {
    return this._votes;
  }
}
