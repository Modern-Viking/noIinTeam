  
function makeCards(teamMember) {
    let employeeData;
    switch(teamMember.getRole()) {
        case "Manager":
            employeeData = `Office Number: ${teamMember.getOfficeNumber()}`;
            break;
        case "Engineer":
            employeeData = `GitHub Username: ${teamMember.getGithub()}`;
            break;
        case "Intern":
            employeeData = `School: ${teamMember.getSchool()}`;
            break;
        default:
            console.log("No Role Found, Try Again");
    }
    return `
    <div class="column">   
    <div class="card">
    <div class="card-content">
        <p class="title">
            ${teamMember.getName()}
        </p>
        <p class="subtitle">
            ${teamMember.getRole()}
        </p>
    </div>
    <footer class="card-footer">
        <p class="card-footer-item">
            <span>
            Employee ID: ${teamMember.getId()}
            </span>
        </p>
        <p class="card-footer-item">
            <span>
            Email: ${teamMember.getEmail()}
            </span>
        </p>
        <p class="card-footer-item">
            <span>
            ${employeeData}
            </span>
        </p>
    </footer>
</div>
</div>`
}


function makeHtml(cards) {

return`<!doctype html>
<html lang="en">
  <head>
    <title>Team Viewer</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <!-- Bulma meta -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.8.0/css/bulma.min.css">
    <script defer src="https://use.fontawesome.com/releases/v5.3.1/js/all.js"></script>
  </head>
  <body>
  <section class="hero is-info has-text-centered">
  <div class="hero-body">
    <div class="container">
      <h1 class="title">
          There Is No I In Team
      </h1>
      <h2 class="subtitle">
        Here is your team
      </h2>
    </div>
  </div>
</section> 
      <div class="container">
          
      <div class="columns is-multiline is-centered">
      ${cards}
      </div>
  </body>
</html>`
}
module.exports = {
    makeHTML: makeHtml,
    makeCards: makeCards
};