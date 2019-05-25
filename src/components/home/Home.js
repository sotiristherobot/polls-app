import React, { Component, Fragment } from "react";
import Header from "../header/Header";
import QuestionBox from "../questions/QuestionBox";
import QuestionDetailBox from "../questions/QuestionDetailBox";
import axios from "axios";

// ui-related
import { Grommet, Box } from "grommet";

// models
import QuestionModel from "../../models/QuestionModel";

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      questions: [],
      selectedQuestion: null,
      showDetail: false
    };
  }

  /**
   * Fetches questions from endpoint on componentDidMount lifecycle event
   * @returns {AxiosPromise<any>}
   */
  fetchQuestions() {
    return axios.get("https://polls.apiblueprint.org/questions");
  }

  /**
   * React lifecycle event. Fetches the questions from the api endpoint, creates
   * QuestionModel instances and sets them to state.
   */
  componentDidMount() {
    this.fetchQuestions()
      .then(response => {
        const { data } = response;
        this.setState({
          questions: data.map(
            item =>
              new QuestionModel(
                item.url,
                item.question,
                item.published_at,
                item.choices
              )
          )
        });
      })
      .catch(e => console.log(e));
  }

  /**
   * On QuestionBox click handler. Passed down as a prop to <QuestionBox /> to handle clicks
   * on the question box. sets showDetail to true on the state, and the question instance.
   * @param {event} e
   * @param {QuestionModel} selectedQuestion - The question model of selected question
   */
  onQuestionBoxClick(e, selectedQuestion) {
    this.setState({
      selectedQuestion,
      showDetail: true
    });
  }

  /**
   * Passed down as props to <QuestionDetailBox/>. Used to
   * reset state to selectedQuestion null and showDetail to false
   * in order to display <QuestionBox/> again.
   */
  resetActiveQuestion() {
    this.setState({
      selectedQuestion: null,
      showDetail: false
    });
  }

  //TODO create a HOC for this
  render() {
    return (
      <Grommet full={true}>
        {!this.state.showDetail ? (
          <Fragment>
            <Box direction="row" flex={true}>
              <Header>Questions</Header>
            </Box>
            <Box direction="row" flex={true} fill={true} wrap={true}>
              {this.state.questions.map(question => (
                <QuestionBox
                  key={question.id}
                  question={question}
                  onQuestionBoxClick={this.onQuestionBoxClick.bind(this)}
                />
              ))}
            </Box>
          </Fragment>
        ) : (
          <Fragment>
            <Box direction="row" flex={true}>
              <Header>Questions Detail</Header>
            </Box>
            <QuestionDetailBox
              key={this.state.selectedQuestion.id}
              question={this.state.selectedQuestion}
              resetActiveQuestion={this.resetActiveQuestion.bind(this)}
            />
            )
          </Fragment>
        )}
      </Grommet>
    );
  }
}
export default Home;
