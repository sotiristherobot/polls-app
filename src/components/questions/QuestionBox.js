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
      onClick={e => props.onQuestionBoxClick(e, props.question)}
    >
      <Text>
        <b>Question:</b> {props.question.question}
      </Text>
      <Text>
        <b>Published:</b> {props.question.publishedAt}
      </Text>
      <Text>
        <b>Choices:</b> {props.question.choices.length}
      </Text>
    </Box>
  );
}
