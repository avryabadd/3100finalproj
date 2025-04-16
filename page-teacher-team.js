// Email validation regex
const regEmail = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/i;

let currentTeam = { name: "", members: [] };
let allTeams = [];

// Render the list of all saved teams
function renderTeamList() {
  const container = document.querySelector('#listDisplayTeams');
  if (!container) return;
  
  container.innerHTML = '';

  if (allTeams.length === 0) {
    container.innerHTML = '<div class="text-muted">No teams created yet.</div>';
    return;
  }

  allTeams.forEach((team, index) => {
    const card = document.createElement('div');
    card.className = 'list-group-item';

    card.innerHTML = `
    <div class="d-flex justify-content-between align-items-center">
        <div>
        <strong>${team.name}</strong>
        <ul class="mb-2">
            ${team.members.map(member => `<li>${member}</li>`).join('')}
        </ul>
        </div>
        <div class="text-end">
        <button class="btn btn-sm btn-outline-primary me-2" type="button" onclick="editTeam(${index})">Edit</button>
        <button class="btn btn-sm btn-outline-danger" type="button" onclick="deleteTeam(${index})">Delete</button>
        </div>
    </div>
    `;
    container.appendChild(card);
  });
}

document.addEventListener('DOMContentLoaded', function() {
  // Only run this code if we're on the instructor teams page
  if (document.querySelector('#btnAddToTeam')) {
    // Add student to current team
    document.querySelector('#btnAddToTeam').addEventListener('click', () => {
      const strstudentEmail = document.querySelector('#txt_student_team').value.trim();

      let blnError = false;
      let strMessage = '';

      if (strstudentEmail.length < 1) {
        blnError = true;
        strMessage += "Student email must not be empty.<br>";
      }

      if (!regEmail.test(strstudentEmail)) {
        blnError = true;
        strMessage += "Please enter a valid student email.<br>";
      }

      if (currentTeam.members.includes(strstudentEmail)) {
        blnError = true;
        strMessage += "Student email is already in the team.<br>";
      }

      if (blnError) {
        Swal.fire({
          title: "Oh no, you have an error!",
          html: strMessage,
          icon: "error"
        });
        return;
      }

      currentTeam.members.push(strstudentEmail);
      document.querySelector('#txt_student_team').value = '';
      
      // Show current team members being added
      Swal.fire({
        title: "Student Added to Team",
        html: `<p>Current team members:</p><ul>${currentTeam.members.map(email => `<li>${email}</li>`).join('')}</ul>`,
        icon: "success"
      });
    });

    // Save the current team
    document.querySelector('#btnSaveTeam').addEventListener('click', () => {
      const strteamName = document.querySelector('#txt_teamName').value.trim();
      let blnError = false;
      let strMessage = '';

      if (strteamName.length < 1) {
        blnError = true;
        strMessage += "Team name must not be empty.<br>";
      }

      if (currentTeam.members.length === 0) {
        blnError = true;
        strMessage += "You must add at least one student to the team.<br>";
      }

      if (allTeams.some(t => t.name.toLowerCase() === strteamName.toLowerCase())) {
        blnError = true;
        strMessage += "A team with that name already exists.<br>";
      }

      if (blnError) {
        Swal.fire({
          title: "Error creating team!",
          html: strMessage,
          icon: "error"
        });
        return;
      }

      currentTeam.name = strteamName;
      allTeams.push({ ...currentTeam }); // Save a copy
      currentTeam = { name: "", members: [] }; // Reset form state

      document.querySelector('#txt_teamName').value = '';
      document.querySelector('#txt_student_team').value = '';

      renderTeamList();
      
      Swal.fire({
        title: "Team Saved!",
        text: `Team "${strteamName}" has been created successfully.`,
        icon: "success"
      });
    });
    
    // Initial render of the team list
    renderTeamList();
  }
});

// Edit a team - this is a global function since it's called from onclick
window.editTeam = function(index) {
  if (!document.querySelector('#txt_teamName')) return;
  
  const team = allTeams[index];

  // Set the form fields with current team data
  document.querySelector('#txt_teamName').value = team.name;
  currentTeam = {
    name: team.name,
    members: [...team.members]
  };

  // Remove the team so it can be overwritten on Save
  allTeams.splice(index, 1);
  renderTeamList();

  Swal.fire("Edit Mode", "You can now edit the team details in the form.", "info");
};

// Delete a team - this is a global function since it's called from onclick
window.deleteTeam = function(index) {
  const teamName = allTeams[index].name;

  Swal.fire({
    title: "Are you sure?",
    text: `Delete the team "${teamName}"?`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "Cancel"
  }).then((result) => {
    if (result.isConfirmed) {
      allTeams.splice(index, 1);
      renderTeamList();
      Swal.fire("Deleted!", `Team "${teamName}" has been removed.`, "success");
    }
  });
};