// Team Profile Generator
// Include packages needed for this application
const inquirer = require("inquirer");
const fs = require("fs");

const arr = require("./src/QuestionArrays");
const gen = require("./src/GenerateHTML");
const Engineer = require("./lib/Engineer");
const Manager = require("./lib/Manager");
const Intern = require("./lib/Intern");

// Define new employee arrays;
let newEngineerArray = [];
let newInternArray = [];

// Function call to start application and prompt user for manager information
promptManagerInfo();

// Prompt for manager information
function promptManagerInfo() {
  // Prompt user with questions array
  inquirer.prompt(arr.managerQuestionArray).then((data) => {
    // Create new manager
    const manager = new Manager(data.name, data.id, data.email, data.number, data.teamName);
    manager.getRole();
    console.log(`\n${manager.teamName}`);
    console.log(`Manager: ${manager.getName()}`);

    // Display menu to add team members
    displayMenu(manager);
  });
}

// Display menu
function displayMenu(manager) {
  console.log("-----------------\n");

  // Display menu
  inquirer.prompt(arr.menuArray).then((response) => {
    buildTeam(response, manager);
  });
}

// Build team by prompting for new engineers and interns.
// Write to html file as each new instance is created.
function buildTeam(response, manager) {
  if (response.add === "Engineer") {
    // Prompt with engineer questions
    inquirer.prompt(arr.engineerArray).then((data) => {
      const engineer = new Engineer(data.name, data.id, data.email, data.githubName);
      engineer.getRole();
      newEngineerArray.push(engineer);
      displayMenu(manager);
    });
  } else if (response.add === "Intern") {
    // Prompt with intern questions
    inquirer.prompt(arr.internArray).then((data) => {
      const intern = new Intern(data.name, data.id, data.email, data.school);
      intern.getRole();
      newInternArray.push(intern);
      displayMenu(manager);
    });
  } else {
    // Stop prompting for team members and write index.html file
    let fileString = gen.generateHTML(manager, newEngineerArray, newInternArray);
    writeToFile(fileString);
  }
}

// Write file
function writeToFile(fileString) {
  const fileName = "./dist/index.html";

  fs.writeFile(fileName, fileString, (err) =>
    err ? console.log(err) : console.log("Generating index.html ...")
  );
}

// prompt manager data
  // display menu
    // if engineer
      // prompt for engineer with github details (engineerArray - questions)
      // create new engineer
      // engineer.getRole() to set role
      // push new engineer onto newEngineerArray
      // display menu
    // if intern
      // prompt for intern details (internArray - questions)
      // create new intern
      // intern.getRole() to set role
      // push new intern onto newInternArray
      // display menu
    // if finished building team
      // call function to build html string with (manager, newEngineerArray, newInternArray)
