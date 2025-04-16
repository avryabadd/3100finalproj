let strCurrentPage = "frmLogin"
let strCurrentInstructorPage="Instructor-page-dashboard"
let strCurrentStudentPage = "Student-page-dashboard";

$('#btnStudentLoginSwitch').on('click',function(){
    loadPage("frmLogin","frmRegister")
})

$('#btnSwapRegister').on('click',function(){
    loadPage("frmRegister","frmLogin")
})
$('#btnSelectInstructor').on('click',function(){
    loadPage("frmInstructorPage","frmHomePage")
})
$('#btnSelectStudent').on('click',function(){
    loadPage("frmStudentPage","frmHomePage")
})
$(document).on('click','.logout-btn',function(){
   loadPage("frmLogin",strCurrentPage)
   localStorage.setItem('isLoggedIn','false') 
})
function loadPage(strnewpage,stroldpage){
    $(`#${stroldpage}`).slideUp('slow')
    $(`#${strnewpage}`).slideDown('fast')
    strCurrentPage = strnewpage
    console.log(strCurrentPage)
}
window.addEventListener('load', () => {
    const strLoggedIn = localStorage.getItem('isLoggedIn')
    if (strLoggedIn == 'true') {
    loadPage("frmHomePage","frmLogin")
    }
})


function loadPage_instructor(strnewpage,stroldpage)
{
    $(`#${stroldpage}`).slideUp('slow')
    $(`#${strnewpage}`).slideDown('fast')
    strCurrentInstructorPage = strnewpage
}

$('#Btn_Instructor_dashboard').on('click',function(){
    loadPage_instructor("Instructor-page-dashboard",strCurrentInstructorPage)
    $('#sidebar .btn').removeClass('active');
    $(this).addClass('active');
})

$('#Btn_Instructor_courses').on('click',function(){
    loadPage_instructor("Instructor-page-courses",strCurrentInstructorPage)
    $('#sidebar .btn').removeClass('active');
    $(this).addClass('active');
})

$('#Btn_Instructor_students').on('click',function(){
    loadPage_instructor("Instructor-page-students",strCurrentInstructorPage)
    $('#sidebar .btn').removeClass('active');
    $(this).addClass('active');
})

$('#Btn_Instructor_teams').on('click',function(){
    loadPage_instructor("Instructor-page-teams",strCurrentInstructorPage)
    $('#sidebar .btn').removeClass('active');
    $(this).addClass('active');
})

$('#Btn_Instructor_reviews').on('click',function(){
    loadPage_instructor("Instructor-page-reviews",strCurrentInstructorPage)
    $('#sidebar .btn').removeClass('active');
    $(this).addClass('active');
})

$('#Btn_Instructor_reports').on('click',function(){
    loadPage_instructor("Instructor-page-reports",strCurrentInstructorPage)
    $('#sidebar .btn').removeClass('active');
    $(this).addClass('active');
})
$('#Btn_Instructor_review_reviews').on('click', function () {
    loadPage_instructor("Instructor-page-review-reviews", strCurrentInstructorPage);
    $('#sidebar .btn').removeClass('active');
    $(this).addClass('active');
  });


  function loadPage_student(strnewpage, stroldpage) {
    $(`#${stroldpage}`).slideUp('slow')
    $(`#${strnewpage}`).slideDown('fast')
    strCurrentStudentPage = strnewpage;
  }
  document.querySelector('#Btn_Student_dashboard').addEventListener('click', () => {
    loadPage_student("Student-page-dashboard", strCurrentStudentPage);
  });
  
  document.querySelector('#Btn_Student_complete').addEventListener('click', () => {
    loadPage_student("Student-page-complete", strCurrentStudentPage);
  });
  
  document.querySelector('#Btn_Student_scores').addEventListener('click', () => {
    loadPage_student("Student-page-scores", strCurrentStudentPage);
  });
  
  document.querySelector('#Btn_Student_feedback').addEventListener('click', () => {
    loadPage_student("Student-page-feedback", strCurrentStudentPage);
  });
  
  document.querySelector('#Btn_Student_reports').addEventListener('click', () => {
    loadPage_student("Student-page-reports", strCurrentStudentPage);
  });
  