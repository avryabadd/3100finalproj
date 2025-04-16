// Current pages tracking
let strCurrentInstructorPage = "Instructor-page-dashboard";
let strCurrentStudentPage = "Student-page-dashboard";

// Check login status on page load
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
});

// Home page navigation - set up on document ready
$(document).ready(function() {
    // Home page role selection
    if (document.getElementById('btnSelectInstructor')) {
        $('#btnSelectInstructor').on('click', function() {
            window.location.href = "instructor.html";
        });
    }

    if (document.getElementById('btnSelectStudent')) {
        $('#btnSelectStudent').on('click', function() {
            window.location.href = "student.html";
        });
    }

    // Logout buttons
    $('.logout-btn').on('click', function() {
        localStorage.setItem('isLoggedIn', 'false');
        window.location.href = "index.html";
    });

    // Instructor page navigation
    if (document.getElementById('Btn_Instructor_dashboard')) {
        $('#Btn_Instructor_dashboard').on('click', function() {
            loadPage_instructor("Instructor-page-dashboard", strCurrentInstructorPage);
            $('#sidebar .btn').removeClass('active');
            $(this).addClass('active');
        });
    }

    if (document.getElementById('Btn_Instructor_courses')) {
        $('#Btn_Instructor_courses').on('click', function() {
            loadPage_instructor("Instructor-page-courses", strCurrentInstructorPage);
            $('#sidebar .btn').removeClass('active');
            $(this).addClass('active');
        });
    }

    if (document.getElementById('Btn_Instructor_students')) {
        $('#Btn_Instructor_students').on('click', function() {
            loadPage_instructor("Instructor-page-students", strCurrentInstructorPage);
            $('#sidebar .btn').removeClass('active');
            $(this).addClass('active');
        });
    }

    if (document.getElementById('Btn_Instructor_teams')) {
        $('#Btn_Instructor_teams').on('click', function() {
            loadPage_instructor("Instructor-page-teams", strCurrentInstructorPage);
            $('#sidebar .btn').removeClass('active');
            $(this).addClass('active');
        });
    }

    if (document.getElementById('Btn_Instructor_reviews')) {
        $('#Btn_Instructor_reviews').on('click', function() {
            loadPage_instructor("Instructor-page-reviews", strCurrentInstructorPage);
            $('#sidebar .btn').removeClass('active');
            $(this).addClass('active');
        });
    }

    if (document.getElementById('Btn_Instructor_reports')) {
        $('#Btn_Instructor_reports').on('click', function() {
            loadPage_instructor("Instructor-page-reports", strCurrentInstructorPage);
            $('#sidebar .btn').removeClass('active');
            $(this).addClass('active');
        });
    }

    if (document.getElementById('Btn_Instructor_review_reviews')) {
        $('#Btn_Instructor_review_reviews').on('click', function() {
            loadPage_instructor("Instructor-page-review-reviews", strCurrentInstructorPage);
            $('#sidebar .btn').removeClass('active');
            $(this).addClass('active');
        });
    }

    // Student page navigation
    if (document.getElementById('Btn_Student_dashboard')) {
        $('#Btn_Student_dashboard').on('click', function() {
            loadPage_student("Student-page-dashboard", strCurrentStudentPage);
            $('#Student_sidebar .btn').removeClass('active');
            $(this).addClass('active');
        });
    }
    
    if (document.getElementById('Btn_Student_complete')) {
        $('#Btn_Student_complete').on('click', function() {
            loadPage_student("Student-page-complete", strCurrentStudentPage);
            $('#Student_sidebar .btn').removeClass('active');
            $(this).addClass('active');
        });
    }
    
    if (document.getElementById('Btn_Student_scores')) {
        $('#Btn_Student_scores').on('click', function() {
            loadPage_student("Student-page-scores", strCurrentStudentPage);
            $('#Student_sidebar .btn').removeClass('active');
            $(this).addClass('active');
        });
    }
    
    if (document.getElementById('Btn_Student_feedback')) {
        $('#Btn_Student_feedback').on('click', function() {
            loadPage_student("Student-page-feedback", strCurrentStudentPage);
            $('#Student_sidebar .btn').removeClass('active');
            $(this).addClass('active');
        });
    }
    
    if (document.getElementById('Btn_Student_reports')) {
        $('#Btn_Student_reports').on('click', function() {
            loadPage_student("Student-page-reports", strCurrentStudentPage);
            $('#Student_sidebar .btn').removeClass('active');
            $(this).addClass('active');
        });
    }
});

// Instructor page navigation
function loadPage_instructor(strnewpage, stroldpage) {
    $(`#${stroldpage}`).slideUp('slow');
    $(`#${strnewpage}`).slideDown('fast');
    strCurrentInstructorPage = strnewpage;
}

// Student page navigation
function loadPage_student(strnewpage, stroldpage) {
    $(`#${stroldpage}`).slideUp('slow');
    $(`#${strnewpage}`).slideDown('fast');
    strCurrentStudentPage = strnewpage;
}