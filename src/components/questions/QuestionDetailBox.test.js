import React from "react";
import QuestionDetailBox from "./QuestionDetailBox";
import QuestionModel from "../../models/QuestionModel";
import { shallow, mount } from "enzyme";

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
    resetActiveQuestion: jest.fn(),
    onFormSubmit: jest.spyOn(QuestionDetailBox.prototype, "onFormSubmit")
  };

  return {
    props,
    actions
  };
};

describe("<QuestionDetailBox/>", () => {
  const { props, actions } = mockedProps();
  let shallowWrapper = shallow(
    <QuestionDetailBox
      question={props.question[0]}
      resetActiveQuestion={actions.resetActiveQuestion}
    />
  );

  it("renders <QuestionDetailBox/> without crashing", () => {
    expect(shallowWrapper).toHaveLength(1);
  });

  it("should render a <Text/> with the Question: question.question", () => {
    const inputField = shallowWrapper.children("Text").render();

    expect(inputField.text()).toBe(
      "Question: Favourite programming rocketman?"
    );
  });

  it("should render a <Form/>", () => {
    const form = shallowWrapper.children("Form");

    expect(form).toHaveLength(1);
  });

  it("should render a <Form/> with an <RadioButton/>[3] <Text/> and <Button/> ", () => {
    const form = shallowWrapper.children("Form").render(),
      radioButtons = form.find("input"),
      label = form.find("label"),
      submitButton = form.find('button[type="submit"]');

    expect(radioButtons).toHaveLength(3);
    expect(submitButton).toHaveLength(1);
    expect(label).toHaveLength(3);
    expect(label.first().text()).toBe("Objective-C");
    expect(label.last().text()).toBe("Ruby");
  });

  it("<Form/> should render a <Button/> with text = Submit and be initially disabled", () => {
    const form = shallowWrapper.children("Form").render(),
      button = form.find('button[type="submit"]');

    expect(button.text()).toBe("Submit");
    expect(button.prop("disabled")).toBe(true);
  });

  it("<Button/> should call onFormSubmit method onClick", () => {
    const { props, actions } = mockedProps(),
      fullMount = mount(
        <QuestionDetailBox
          question={props.question[0]}
          resetActiveQuestion={actions.resetActiveQuestion}
        />
      ),
      button = fullMount.find('button[type="submit"]');

    expect(actions.onFormSubmit.mock.calls.length).toBe(0);
    button.simulate("submit");
    expect(actions.onFormSubmit.mock.calls.length).toBe(1);
  });
  it("should have <Button/> initially disabled and enabled on choice", () => {
    const { props, actions } = mockedProps(),
      fullMount = mount(
        <QuestionDetailBox
          question={props.question[0]}
          resetActiveQuestion={actions.resetActiveQuestion}
        />
      ),
      button = fullMount.find('button[type="submit"]'),
      radioButton = fullMount.find(
        'input[value="/questions/12331/choices/50702"]'
      );

    expect(button.instance().disabled).toBe(true);
    expect(fullMount.state().disableSubmitButton).toBe(true);
    radioButton.simulate("change");
    expect(button.instance().disabled).toBe(false);
    expect(fullMount.state().disableSubmitButton).toBe(false);
  });
});
