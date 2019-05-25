import React from "react";
import { Box, Text } from "grommet";

/**
 * Stateless component that creates a QuestionBox for each question, that contain
 * id of question, a question, date published and number of choices.
 * @param props
 */
export default function QuestionBox(props) {
  return (
    <Box
      direction="column"
      border="all"
      width="medium"
      pad="small"
      margin="small"
      onClick={e => props.onQuestionBoxClick(e, props._id)}
    >
      <Text>
        <b>Question:</b> {props._question}
      </Text>
      <Text>
        <b>Published:</b> {props._publishedAt}
      </Text>
      <Text>
        <b>Choices:</b> {props._choices.length}
      </Text>
    </Box>
  );
}
