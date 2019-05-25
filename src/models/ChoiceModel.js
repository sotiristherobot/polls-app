export default class ChoiceModel {
  constructor(id, choice, vote) {
    this._id = id;
    this._choice = choice;
    this._vote = vote;
  }

  // getters - setters
  get id() {
    return this._id;
  }
  get choice() {
    return this._question;
  }
  get vote() {
    return this._vote;
  }
}
