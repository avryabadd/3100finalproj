strCurrentPage = "frmLogin"
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
})
function loadPage(strnewpage,stroldpage){
    $(`#${stroldpage}`).slideUp('slow')
    $(`#${strnewpage}`).slideDown('fast')
    strCurrentPage = strnewpage
    console.log(strCurrentPage)
}
window.addEventListener('load', () => {
    const strLoggedIn = localStorage.getItem('isLoggedIn')
    // if (strLoggedIn == 'true') {
    // loadPage("frmHomePage","frmLogin")
    // }
})