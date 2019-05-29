import React from "react";
import QuestionDetailBox from "./QuestionDetailBox";
import QuestionModel from "../../models/QuestionModel";
import { shallow } from "enzyme";

const mockedProps = () => {
  const props = {
    question: QuestionModel.createModelInstances([
      {
        url: "/questions/12331",
        published_at: "2019-05-27T11:50:56.522266+00:00",
        question: "Favourite programming rocketman?",
        choices: [
          {
            url: "/questions/12331/choices/50702",
            votes: 0,
            choice: "Objective-C"
          },
          {
            url: "/questions/12331/choices/50701",
            votes: 0,
            choice: "Python"
          },
          { url: "/questions/12331/choices/50703", votes: 0, choice: "Ruby" }
        ]
      }
    ])
  };

  const actions = {
    resetActiveQuestion: jest.fn()
  };

  return {
    props,
    actions
  };
};

describe("<QuestionDetailBox/>", () => {
  const { props, actions } = mockedProps();
  const shallowWrapper = shallow(
    <QuestionDetailBox
      question={props.question[0]}
      resetActiveQuestion={actions.resetActiveQuestion}
    />
  );

  it("renders <QuestionDetailBox/> without crashing", () => {
    expect(shallowWrapper).toHaveLength(1);
  });

  it("should render a <Text/> with the Question: question.question", () => {
    const inputField = shallowWrapper.children('Text').render();

    expect(inputField.text()).toBe("Question: Favourite programming rocketman?");
  });

});
