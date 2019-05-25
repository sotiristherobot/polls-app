import ChoiceModel from "./ChoiceModel";

export default class QuestionModel {
  constructor(url, question, publishedAt, choices) {
    this._question = question;
    this._publishedAt = this.convertDate(publishedAt);
    this._choices = choices.map(
      (choice, index) => new ChoiceModel(choice.url, index, choice.choice, choice.votes)
    );
    this._id = QuestionModel.countInstances;
    this._url = url;
    QuestionModel.countInstances++;
  }

  /**
   * @param date
   * @returns {string} - Date
   */
  convertDate(date) {
    return new Date(date).toDateString();
  }

  // getters - setters
  get url() {
    return this._url;
  }
  get id() {
    return this._id;
  }
  get question() {
    return this._question;
  }
  get publishedAt() {
    return this._publishedAt;
  }
  get choices() {
    return this._choices;
  }
}
// static property to count how many instances of this model we have created
QuestionModel.countInstances = 0;
