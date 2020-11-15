# Form Wizard Demo

## Introduction
This project showcases a couple React components I worked on for a different project. These components include a form wizard and a user availability table. 

To demo these components, I have put together a two-step wizard: the first step a signup form and the other the user availability table. 

### Live Demo
Check out a live demo [here](https://tsairinius.github.io/form-wizard/)!

## Details
### Form Wizard 
A form wizard is often used in web applications to guide a user through a sequence of steps. I implemented a wizard in React that includes the following features:

#### Built-in UI for navigation
The Wizard includes Cancel, Back, Next, and Submit buttons to navigate through each step. Logic is also in place to ensure that Submit only appears on the last step, and the Back and Next buttons are hidden on the first and last steps respectively. 

#### A convenient interface for developers
Developers who use the form wizard simply pass elements as children to the wizard. Each child is automatically interpreted as an individual step in the wizard. 

#### Arguments

| Prop         | Description |
| ------------ | ----------- |
| onStepChange | a callback that is invoked whenever the wizard changes steps. It is given the current step as an argument.
| canProgress  | a boolean that is used to determine whether the progress button (Next/Submit) should be disabled. Defaults to true. 
| onSubmit     | a callback that is invoked when the submit button is clicked.
| onCancel | a callback that is invoked when the Cancel button is clicked.
| stepLabels | labels for each step of the wizard that are displayed as breadcrumbs
| title | a title for the wizard

### User Availability Table
This table is being used in a private project to help users schedule times to meet with one another. The user simply clicks on individual time blocks to input their schedule. 

The component behaves similar to a controlled form input. Its state, the availability data, is managed outside of it. 

#### Arguments
| Prop         | Description | 
| ------------ | ----------- |
| availability | availability data to populate the table with. Defaults to an empty array. 
| readOnly     | Determines whether the table is modifiable. Defaults to false.
| title        | a title for the availability table.
| onChange     | a callback that is invoked when a time block in the table is clicked. Receives updated availability data as an argument.

## Running the app locally

```
git clone https://github.com/tsairinius/form-wizard.git
npm install
npm start
```
Open [http://localhost:3000](http://localhost:3000) to view the app in the browser.

## Next steps 
Potential improvements to this project include: 
- Using more sophisticated styling frameworks/libraries, such as SASS or styled components
- Making the app more responsive and user friendly for mobile devices. 
- The signup form itself was implemented simply to demonstrate the usage of the form wizard. However, it could use more robust form validation (eg. Require certain password lengths or characters, email should be in appropriate format)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

