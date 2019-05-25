import React, { Component } from "react";
import { Box, Text, RadioButton, Button, Form } from "grommet";
import axios from "axios";

class QuestionDetailBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedRadioButton: {
        url: '',
        name: ''
      }
    };
  }

  /**
   * onChange handler for each radio button. On each change
   * sets the state with the selectedRadioButton's name and value
   * @param {event} e
   */
  onRadioButtonChoiceChange(e) {
    this.setState({
      selectedRadioButton: {
        name: e.target.name,
        value: e.target.value
      }
    });
  }

  /**
   * onSubmit handler for <Form/>. When form is submitted a
   * POST request is made to the server. On success, it calls
   * resetActiveQuestion from props to reset state.
   */
  onFormSubmit() {
    axios
      .post(`https://polls.apiblueprint.org${this.state.selectedRadioButton.value}`)
      .then(response => {
        if (response.status === 201) {
          this.props.resetActiveQuestion();
        }
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <Box direction="column" border="all" width="medium" pad="medium">
        <Text>Question: {this.props.question.question}</Text>
        <Form onSubmit={this.onFormSubmit.bind(this)}>
          {this.props.question.choices.map(choice => (
            <Box key={choice.id} direction="row" pad="medium">
              <RadioButton
                checked={choice.choice === this.state.selectedRadioButton.name}
                label={choice.choice}
                name={choice.choice}
                value={choice.url}
                onChange={this.onRadioButtonChoiceChange.bind(this)}
              />
              <Text>{choice.votes}</Text>
            </Box>
          ))}
          <Button type="submit" primary label="Submit" />
        </Form>
      </Box>
    );
  }
}
export default QuestionDetailBox;
