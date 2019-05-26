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
      },
      disableSubmitButton: true
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
      },
      disableSubmitButton: false
    });
  }

  /**
   * onSubmit handler for <Form/>. When form is submitted a
   * POST request is made to the server. On success, updates
   * the choices with the response from POST request.
   */
  onFormSubmit() {
    axios
      .post(
        `https://polls.apiblueprint.org${this.state.selectedRadioButton.value}`
      )
      .then(response => {
        if (response.status === 201) {
          const { data } = response;

          this.props.question.choices = this.props.question.choices.map(
            choice => {
              if (choice.choice === data.choice) {
                choice.votes = data.votes;
                return choice;
              }
              return choice;
            }
          );
          this.props.resetActiveQuestion();
        }
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <Box direction="column" border="all" width="medium" margin="medium" pad="medium">
        <Text>Question: {this.props.question.question}</Text>
        <Form onSubmit={this.onFormSubmit.bind(this)}>
          {this.props.question.choices.map(choice => (
            <Box key={choice.id} direction="row" pad="medium" justify="between">
              <RadioButton
                checked={choice.choice === this.state.selectedRadioButton.name}
                label={choice.choice}
                name={choice.choice}
                value={choice.url}
                onChange={this.onRadioButtonChoiceChange.bind(this)}
              />
              <Text><b>Votes: </b>{choice.votes}</Text>
            </Box>
          ))}
          <Button disabled={this.state.disableSubmitButton} type="submit" primary label="Submit" />
        </Form>
      </Box>
    );
  }
}
export default QuestionDetailBox;
