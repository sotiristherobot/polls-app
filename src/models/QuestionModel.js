import ChoiceModel from "./ChoiceModel";

export default class QuestionModel {
  constructor(url, question, publishedAt, choices) {
    this._question = question;
    this._publishedAt = this.convertDate(publishedAt);
    this._choices = choices.map(
      (choice, index) =>
        new ChoiceModel(choice.url, index, choice.choice, choice.votes)
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

  /**
   * Static method that takes an array of objects and returns back an array of QuestionModel instances
   * @param {Object[]} data - Array of Objects
   * @returns {QuestionModel[]} - Array of QuestionModels
   */
  static createModelInstances(data) {
    return data.map(
      item =>
        new QuestionModel(
          item.url,
          item.question,
          item.published_at,
          item.choices
        )
    );
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
  set choices(choices) {
    return this._choices = choices;
  }
}
// static property to count how many instances of this model we have created
QuestionModel.countInstances = 0;
