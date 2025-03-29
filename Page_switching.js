$('#btnStudentLoginSwitch').on('click',function(){
    $('#frmRegister').slideUp('slow')
    $('#frmLogin').slideDown('fast')
})

$('#btnSwapRegister').on('click',function(){
    $('#frmLogin').slideUp('slow')
    $('#frmRegister').slideDown('fast')
})

function loadPage(newpage,oldpage){
    $(`#${oldpage}`).slideUp('slow')
    $(`#${newpage}`).slideDown('fast')
}
