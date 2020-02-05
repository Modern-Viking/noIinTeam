const inquirer = require("inquirer");
const Manager = require("./lib/Manager.js");
const Engineer = require("./lib/Engineer.js");
const Intern = require("./lib/Intern.js");
const fs = require("fs");

init();

async function init() {
  try {
    let empSpecificData;
    let { name } = await promptName();
    name = capWords(name);
    let { id } = await promptId();
    let { email } = await promptEmail();
    let { role } = await promptRole();
    switch (role) {
      case "Manager":
        empSpecificData = await promptOfficeNum();
        let manager = new Manager(name, id, email, empSpecificData);
        return manager;
      case "Engineer":
        empSpecificData = await promptGithub();
        let engineer = new Engineer(name, id, email, empSpecificData);
        return engineer;
      case "Intern":
        empSpecificData = await promptSchool();
        let intern = new Intern(name, id, email, empSpecificData);
        return intern;
    }