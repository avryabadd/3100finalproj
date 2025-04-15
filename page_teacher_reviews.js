let arrquestions = [];
let editingIndex = null;

// Render the list of questions
function renderQuestions() {
    const arrlist = document.querySelector('#questionList');
    arrlist.innerHTML = '';
  
    arrquestions.forEach((question, index) => {
      const li = document.createElement('li');
      li.className = 'list-group-item d-flex justify-content-between align-items-center';
  
      // Create inner content without event handlers
      li.innerHTML = `
        <div>
          <strong>Q${index + 1}:</strong> ${question.text} <em>(${question.type.replace('_', ' ')})</em>
        </div>
        <div>
          <button class="btn btn-sm btn-outline-primary me-2 edit-btn" type="button">Edit</button>
          <button class="btn btn-sm btn-outline-danger delete-btn" type="button">Delete</button>
        </div>
      `;
  
      // Append the list item to the DOM first
      arrlist.appendChild(li);
  
      // Then attach event listeners
      const editBtn = li.querySelector('.edit-btn');
      const deleteBtn = li.querySelector('.delete-btn');
  
      editBtn.addEventListener('click', () => editQuestion(index));
      deleteBtn.addEventListener('click', () => deleteQuestion(index));
    });
  }
  
// Add a new question
document.querySelector('#btn_add_Question').addEventListener('click', () => {
  const text = document.querySelector('#txtquestion_text').value.trim();
  const type = document.querySelector('#select_question_type').value;

  let blnError = false;
  let strMessage = '';

  if (text.length < 1) {
    strMessage += "Question must not be empty";
    blnError = true;
  }

  if (blnError) {
    Swal.fire({
      title: "Oh no, you have an error!",
      html: strMessage,
      icon: "error"
    });
    return;
  }

  arrquestions.push({ text, type });
  renderQuestions();

  // Clear input
  document.querySelector('#txtquestion_text').value = '';
});

// Edit a question
window.editQuestion = function (index) {
  editingIndex = index;
  const { text, type } = arrquestions[index];

  document.querySelector('#txtquestion_text').value = text;
  document.querySelector('#select_question_type').value = type;

  document.querySelector('#btn_add_Question').classList.add('d-none');
  document.querySelector('#btn_update_Question').classList.remove('d-none');
};

// Update the question
document.querySelector('#btn_update_Question').addEventListener('click', () => {
  const text = document.querySelector('#txtquestion_text').value.trim();
  const type = document.querySelector('#select_question_type').value;

  if (!text) {
    Swal.fire({
      title: "Oh no!",
      text: "Question text cannot be empty.",
      icon: "error"
    });
    return;
  }

  arrquestions[editingIndex] = { text, type };
  editingIndex = null;
  renderQuestions();

  // Reset form
  document.querySelector('#txtquestion_text').value = '';
  document.querySelector('#btn_add_Question').classList.remove('d-none');
  document.querySelector('#btn_update_Question').classList.add('d-none');
});

// Delete a question
window.deleteQuestion = function (index) {
    Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete the question.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel"
    }).then((result) => {
      if (result.isConfirmed) {
        arrquestions.splice(index, 1);
        renderQuestions();
        Swal.fire("Deleted!", "The question has been removed.", "success");
      }
    });
  };
  
