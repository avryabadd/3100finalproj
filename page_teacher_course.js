const regEmail = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/i;

document.querySelector("#btnAddStudent").addEventListener("click", () => {
  const strStudentEmail = document.querySelector("#txtStudentEmail").value.trim();

  if (!regEmail.test(strStudentEmail)) {
    Swal.fire({
      title: "Invalid Email",
      html: "<p>Please enter a valid student email address.</p>",
      icon: "error"
    });
    return;
  }

  // ✅ Email is valid
  Swal.fire({
    title: "Student Added",
    text: `${strStudentEmail} has been added successfully.`,
    icon: "success"
  });

});

document.querySelector("#BtnCreateCourse").addEventListener("click", () => {
  const strCourseName = document.querySelector("#txtCourseName").value.trim();
  const strCourseCode = document.querySelector("#txtCourseCode").value.trim();
  const strTerm = document.querySelector("#txtselectTerm").value;
  const strStartDate = document.querySelector("#startDate").value;
  const strEndDate = document.querySelector("#endDate").value;
  const strCourseDesc = document.querySelector("#txtCourseDesc").value.trim();

  let blnError = false;
  let strMessage = "";

  if (strCourseName.length < 1) {
    blnError = true;
    strMessage += "<p>Course name must not be empty.</p>";
  }

  if (strCourseCode.length < 1) {
    blnError = true;
    strMessage += "<p>Course code must not be empty.</p>";
  }

  if (!strTerm || strTerm === "Choose...") {
    blnError = true;
    strMessage += "<p>Please select a term or semester.</p>";
  }

  if (!strStartDate) {
    blnError = true;
    strMessage += "<p>Start date must not be empty.</p>";
  }

  if (!strEndDate) {
    blnError = true;
    strMessage += "<p>End date must not be empty.</p>";
  }

  if (strCourseDesc.length < 1) {
    blnError = true;
    strMessage += "<p>Course description must not be empty.</p>";
  }

  if (blnError) {
    Swal.fire({
      title: "Create Course Error",
      html: strMessage,
      icon: "error"
    });
    return;
  }

  Swal.fire({
    title: "Course Created",
    text: "Your course has been created successfully!",
    icon: "success"
  });
});
