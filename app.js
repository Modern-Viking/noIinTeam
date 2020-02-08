const inquirer = require("inquirer");
const Manager = require("./lib/manager.js");
const Engineer = require("./lib/engineer.js");
const Intern = require("./lib/intern.js");
const makeHTML = require("./templates/mainHTML.js");
const fs = require("fs");
const teamArray = [];
let teamCardsHtml = "";

init();

async function init() {
  let addAnother = "Yes.";
  do{
    try {
      let empSpecificData;
      let { name } = await namePrompt();
      name = capitalizeName(name);
      let { id } = await idPrompt();
      let { email } = await emailPrompt();
      let { role } = await rolePrompt();
      switch (role) {
        case "Manager":
          empSpecificData = await getOfficeNumber();
          let manager = new Manager(name, id, email, empSpecificData.officeNumber);
          teamArray.push(manager);
          break;
        case "Engineer":
          empSpecificData = await getGithubUser();
          let engineer = new Engineer(name, id, email, empSpecificData.username);
          teamArray.push(engineer);
          break;
        case "Intern":
          empSpecificData = await getSchool();
          let intern = new Intern(name, id, email, empSpecificData.school);
          teamArray.push(intern);
          break;
      }
      addAnother = await addEmployees();
    } 
    catch (err) {
      console.log(err);
    }
  } 
  while(addAnother.result === "Yes.");
  // HTML GEN
    for (var i=0; i<teamArray.length; i++) {
      let card = makeHTML.makeCards(teamArray[i]);
      teamCardsHtml += card;
      let HTML = makeHTML.makeHTML(teamCardsHtml);

      fs.writeFile('./output/index.html', HTML, function(err) {
        if (err) console.log('failed');
        console.log('Success');
    })}
};


function namePrompt() {
  const name = inquirer.prompt({
    type: "input",
    message: "What is the new Employee's first and last name?",
    name: "name"
  });
  return name;
}

function idPrompt() {
  const id = inquirer.prompt({
    type: "input",
    message: "What is the new Employee's designated ID number?",
    name: "id"
  });
  return id;
}

function emailPrompt() {
  const email = inquirer.prompt({
    type: "input",
    message: "What is the new Employee's company email?",
    name: "email"
  });
  return email;
}

function rolePrompt() {
  const role = inquirer.prompt({
    type: "list",
    message: "What is the Employee's role?",
    name: "role",
    choices: ["Manager", "Engineer", "Intern"]
  });
  return role;
}

function getOfficeNumber() {
  const officeNumber = inquirer.prompt({
    type: "input",
    message: "What is the Manager's office number?",
    name: "officeNumber"
  });
  return officeNumber;
}

function getGithubUser() {
    const username = inquirer.prompt({
        type: "input",
        message: "What is the Engineer's GitHub username?",
        name: "username"
      });
      return username;
    }

function getSchool() {
    const school = inquirer.prompt({
        type: "input",
        message: "What is the Intern's school?",
        name: "school"
      });
      return school;
}

function addEmployees() {
  const result = inquirer.prompt({
    type: 'list',
    name: 'result',
    message: 'Add another Employee?',
    choices: ["Yes.", "No."]
  });
  return result;
}

function capitalizeName(str) {
  var splitStr = str.toLowerCase().split(" ");
  for (var i = 0; i < splitStr.length; i++) {
    splitStr[i] =
      splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  return splitStr.join(" ");
};