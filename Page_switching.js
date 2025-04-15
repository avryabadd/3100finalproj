let strCurrentPage = "frmLogin"
let strCurrentInstructorPage="Instructor-page-dashboard"

$('#btnStudentLoginSwitch').on('click',function(){
    loadPage("frmLogin","frmRegister")
})

$('#btnSwapRegister').on('click',function(){
    loadPage("frmRegister","frmLogin")
})

$('#btnSelectInstructor').on('click',function(){
    // Changed to use window.location.href
    window.location.href = "instructor.html"
})

$('#btnSelectStudent').on('click',function(){
    // Changed to use window.location.href
    window.location.href = "student.html"
})

$(document).on('click','.logout-btn',function(){
   // Changed to use window.location.href
   localStorage.setItem('isLoggedIn','false') 
   window.location.href = "index.html"
})

// This function stays the same for login/register forms in index.html
function loadPage(strnewpage,stroldpage){
    $(`#${stroldpage}`).slideUp('slow')
    $(`#${strnewpage}`).slideDown('fast')
    strCurrentPage = strnewpage
    console.log(strCurrentPage)
}

window.addEventListener('load', () => {
    // Check which page we're on
    const currentPath = window.location.pathname;
    const strLoggedIn = localStorage.getItem('isLoggedIn');
    
    // Index page: redirect to home if logged in
    if (currentPath.includes('index.html') || currentPath.endsWith('/')) {
        if (strLoggedIn == 'true') {
            window.location.href = "home.html";
        }
    } 
    // Other pages: redirect to index if not logged in
    else if (strLoggedIn != 'true') {
        window.location.href = "index.html";
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