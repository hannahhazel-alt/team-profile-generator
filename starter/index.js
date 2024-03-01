const Manager = require("./lib/Manager.js");
const Engineer = require("./lib/Engineer.js");
const Intern = require("./lib/Intern.js");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR);
}
const outputPath = path.join(OUTPUT_DIR, "teamProfile.html");
const render = require("./src/page-template.js");

const teamMembers = [];

function promptManager() {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "Enter the manager's name:",
        },
        {
            type: "input",
            name: "id",
            message: "Enter the manager's employee ID:",
        },
        {
            type: "input",
            name: "email",
            message: "Enter the manager's email address:",
        },
        {
            type: "input",
            name: "officeNumber",
            message: "Enter the manager's office number:",
        }
    ])
        .then((answers) => {
            const manager = new Manager(answers.name, answers.id, answers.email, answers.officeNumber);
            teamMembers.push(manager);
            promptMenu();
        });
}

// Function to prompt user for next action
function promptMenu() {
    inquirer
        .prompt([
            {
                type: "list",
                name: "menuOption",
                message: "What would you like to do next?",
                choices: ["Add an engineer", "Add an intern", "Finish building the team"],
            },
        ])
        .then((answers) => {
            switch (answers.menuOption) {
                case "Add an engineer":
                    promptEngineer();
                    break;
                case "Add an intern":
                    promptIntern();
                    break;
                case "Finish building the team":
                    generateHTML();
                    break;
            }
        });
}

// Function to prompt user for engineer's details
function promptEngineer() {
    inquirer
        .prompt([
            {
                type: "input",
                name: "name",
                message: "Enter the engineer's name:",
            },
            {
                type: "input",
                name: "id",
                message: "Enter the engineer's employee ID:",
            },
            {
                type: "input",
                name: "email",
                message: "Enter the engineer's email address:",
            },
            {
                type: "input",
                name: "github",
                message: "Enter the engineer's GitHub username:",
            },
        ])
        .then((answers) => {
            const engineer = new Engineer(answers.name, answers.id, answers.email, answers.github);
            teamMembers.push(engineer);
            promptMenu();
        });
}

// Function to prompt user for intern's details
function promptIntern() {
    inquirer
        .prompt([
            {
                type: "input",
                name: "name",
                message: "Enter the intern's name:",
            },
            {
                type: "input",
                name: "id",
                message: "Enter the intern's employee ID:",
            },
            {
                type: "input",
                name: "email",
                message: "Enter the intern's email address:",
            },
            {
                type: "input",
                name: "school",
                message: "Enter the intern's school:",
            },
        ])
        .then((answers) => {
            const intern = new Intern(answers.name, answers.id, answers.email, answers.school);
            teamMembers.push(intern);
            promptMenu();
        });
}
// Function to generate HTML using the render function 
function generateHTML() {
    const htmlContent = render(teamMembers);
    fs.writeFileSync(outputPath, htmlContent);
    console.log(`Team HTML generated successfully at ${outputPath}`);
}

promptManager();


// TODO: Write Code to gather information about the development team members, and render the HTML file.

