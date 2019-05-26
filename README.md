This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `Description`
For this project, propTypes, and testing were ommited to reduce development time.
This application makes first a GET request to receive a list of the 
available questions to render. The user is able to then, click on each
of the questions and see the question detail page were he can provide
his own vote.

### `What I would have done differently`
1. In my opinion, a project cannot been guaranteed to work 100% unless
tested. This though was out of scope for this assignment. Given the chance, and more time my first option
would have been to integrate enzyme and write some test scenarios.
2. <QuestionBox/> primarily and <QuestionDetailBox/> could have been wrapped in a higher order component (HOC) to track when the question list is empty and display a message to a user. Users should be informed and never left in the dark.
3. Routing. When user clicks on question the url should have been changed to this form url/id_of_question, with all the benefits that this has. Again this was not ipmlemented because it was out of scope for this assignment.