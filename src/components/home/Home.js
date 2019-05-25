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
              new QuestionModel(item.question, item.published_at, item.choices)
          )
        });
      })
      .catch(e => console.log(e));
  }

  /**
   * On QuestionBox click handler. Passed down as a prop to <QuestionBox /> to handle clicks
   * on the question box. Finds the question that was clicked based on id and sets
   * showDetail to true on the state, and the question instance.
   * @param {event} e
   * @param {number} qId - The question id is used to find which question was clicked
   */
  onQuestionBoxClick(e, qId) {
    // we know that a question exists with unique id for sure so find it.
    const selectedQuestion = this.state.questions.find(v => v._id === qId);

    this.setState({
      selectedQuestion,
      showDetail: true
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
                  {...question}
                  onQuestionBoxClick={this.onQuestionBoxClick.bind(this)}
                />
              ))}
            </Box>
          </Fragment>
        ) : (
          <QuestionDetailBox
            key={this.state.selectedQuestion.id}
            {...this.state.selectedQuestion}
          />
        )}
      </Grommet>
    );
  }
}
export default Home;
