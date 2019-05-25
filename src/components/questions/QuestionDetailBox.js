import React, { Component } from "react";
import { Box, Text, RadioButton, Button, Form } from "grommet";

class QuestionDetailBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedRadioButton: {
        id: '',
        name: ''
      }
    };
  }

  onRadioButtonChoiceChange(e) {}

  onFormSubmit() {}

  render() {
    return (
      <Box direction="column" border="all" width="medium" pad="medium">
        <Text>Question: {this.props._question}</Text>
        <Form onSubmit={this.onFormSubmit.bind(this)}>
          {this.props._choices.map(choice => (
            <Box key={choice.id} direction="row" pad="medium">
              <RadioButton
                checked={choice.choice === this.state.selectedRadioButton.name}
                label={choice.choice}
                name={choice.choice}
                value={choice.id}
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
