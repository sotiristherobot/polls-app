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

  it("should render a <Form/>", () => {
    const form = shallowWrapper.children("Form");

    expect(form).toHaveLength(1);
  });

  it("should render a <Form/> with an <RadioButton/>[3] <Text/> and <Button/> ", () => {
    const form = shallowWrapper.children("Form").render(),
        radioButtons = form.find('input'),
        label = form.find('label'),
        submitButton = form.find('button[type="submit"]');

    expect(radioButtons).toHaveLength(3);
    expect(submitButton).toHaveLength(1);
    expect(label).toHaveLength(3);
    expect(label.first().text()).toBe('Objective-C');
    expect(label.last().text()).toBe('Ruby');
  });
});
