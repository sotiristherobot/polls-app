import React, { Component } from "react";
import Header from "../header/Header";
import QuestionBox from "../questions/QuestionBox";
import axios from "axios";

// ui-related
import { Grommet, Box } from "grommet";

// models
import QuestionModel from "../../models/QuestionModel";

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      questions: []
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
   * React lifecycle event.
   */
  componentDidMount() {
    this.fetchQuestions().then(response => {
      const { data } = response;
      this.setState({
        questions: data.map(
          item =>
            new QuestionModel(item.question, item.published_at, item.choices)
        )
      });
    }).catch(e => console.log(e));
  }

  /**
   * On QuestionBox click handler. Passed down as a prop to <QuestionBox /> to handle clicks
   * on the question box
   */
  onQuestionBoxClick() {}

  render() {
    return (
        <Grommet full={true}>
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
        </Grommet>
    );
  }
}
export default Home;
