const fs = require("fs");
const path = require('path');
const inquirer = require("inquirer");
const generateMarkdown = require("./utils/generateMarkdown");

// array of questions for user
const questions = [
  {
    type: "input",
    name: "title",
    message: "Enter the title of your project:"
  },
  {
    type: "input",
    name: "description",
    message: "Enter a short description of your project:"
  },
  {
    type: "input",
    name: "installation",
    message: "Enter installation instructions:",
    default: "npm i"
  },
  {
    type: "input",
    name: "usage",
    message: "Enter usage information:"
  },
  {
    type: "list",
    name: "license",
    message: "Choose a License for your project:",
    choices: [
      "MIT",
      "GPL",
      "Apache",
      "BSD",
      "None"
    ]
  },
  {
    type: "input",
    name: "contributing",
    message: "Enter information about contributing:"
  },
  {
    type: "input",
    name: "tests",
    message: "Enter information about tests:",
    default: "npm test"
  },
  {
    type: "input",
    name: "githubUsername",
    message: "What is your GitHub username?"
  },
  {
    type: "input",
    name: "emailAddress",
    message: "What is your email address?"
  },
  {
    type: "input",
    name: "questions",
    message: "Info showing Github username and email address will be shown (if answer left blank) unless you wish to enter a manual message:",
    default: "If you have any questions about the repo, open an issue or contact me directly"
  }
];

// function to write README file
function writeToFile(fileName, data) {
  return fs.writeFileSync(fileName, data);
}

// function to initialize program
function init() {
  inquirer.prompt(questions)
    .then(answers => {
      // Remove githubUsername and emailAddress from answers
      const { githubUsername, emailAddress, ...filteredAnswers } = answers;

      let questionsMessage = '';

      if (emailAddress.trim() !== '') {
        questionsMessage += `If you have any questions about the repo, contact me at ${emailAddress}. `;
      }

      if (githubUsername.trim() !== '') {
        questionsMessage += `You can find more of my work at https://github.com/${githubUsername}.`;
      }

      if (answers.questions !== '') {
        questionsMessage = answers.questions;
      }

      filteredAnswers.questions = questionsMessage;

      // Generate license badge URL based on user's selection
      const licenseBadge = generateLicenseBadge(filteredAnswers.license);
      // Add license badge URL to answers object
      filteredAnswers.licenseBadge = licenseBadge;
      // Generate markdown content
      const markdownContent = generateMarkdown(filteredAnswers);
      // Write to README file
      const outputDirectory = path.resolve(__dirname, "output");
      if (!fs.existsSync(outputDirectory)) {
        fs.mkdirSync(outputDirectory);
      }
      const outputFile = path.join(outputDirectory, "README.md");
      writeToFile(outputFile, markdownContent);
      console.log("README.md file generated successfully.");
    })
    .catch(error => console.error("Error occurred:", error));
}

// Function to generate license badge URL based on license selection
function generateLicenseBadge(license) {
  switch (license) {
    case "MIT":
      return "https://img.shields.io/badge/license-MIT-blue.svg";
    case "GPL":
      return "https://img.shields.io/badge/license-GPL-green.svg";
    case "Apache":
      return "https://img.shields.io/badge/license-Apache-orange.svg";
    case "BSD":
      return "https://img.shields.io/badge/license-BSD-yellow.svg";
    default:
      return "";
  }
}

// function call to initialize program
init();
