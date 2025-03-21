$('#btnStudentLoginSwitch').on('click',function(){
    $('#frmRegister').slideUp('slow')
    $('#frmLogin').slideDown('fast')
})

$('#btnSwapRegister').on('click',function(){
    $('#frmLogin').slideUp('slow')
    $('#frmRegister').slideDown('fast')
})
document.querySelector("#studentRegister").addEventListener("click", () => {
    const regEmail = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    const regDiscord = /^(?:[a-z0-9](?:[a-z0-9_]{1,31})|.{2,32}#[0-9]{4})$/
    let strEmail = $('#txtEmail').val()
    let strPassword = $('#txtPassword').val().trim()
    let strFirstName = $('#txtFirstName').val().trim()
    let strLastName = $('#txtLastName').val().trim()
    let strConfirmPassword = $('#txtConfirmPassword').val().trim()
    let strDiscord = $('#inputDiscord').val().trim()
    let blnError = false
    let strMessage = ''
    if(!regEmail.test(strEmail)){
        blnError = true
        strMessage += '<p  class="mb-0 mt-0">Email must be a proper email</p>'
    }
    if(strPassword.length < 1){
        blnError = true
        strMessage += '<p class="mb-0 mt-0">Password Cannot Be Blank</p>'
    }
    else
    {
        if (!(strConfirmPassword == strPassword)) {
            blnError = true
            strMessage += '<p class="mb-0 mt-0">Password and comfirm password must be equal</p>'
        }
    }
    if(strFirstName.length < 1){
        blnError = true
        strMessage += '<p class="mb-0 mt-0">First name Cannot Be Blank</p>'
    }
    if(strLastName.length < 1){
        blnError = true
        strMessage += '<p class="mb-0 mt-0">Last name Cannot Be Blank</p>'
    }
    if (!(strDiscord === '')) {
        if (!regDiscord.test(strDiscord)) {
            blnError = true
            strMessage += '<p  class="mb-0 mt-0">Discord info must be a proper Discord</p>'
        }
    }
    if(blnError){
        Swal.fire({
            title: "Oh no, you have an error!",
            html: strMessage,
            icon: "error"
        });
    }
    else{
        Swal.fire({
            title: "All credentials have be validated",
            icon: "success"
        })
    }
})
document.querySelector("#btnLogin").addEventListener("click", () => {
    const regEmail = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    let strEmail = $('#text-LoginUsername').val()
    let strPassword = $('#text-LoginPassword').val().trim()
    let blnError = false
    let strMessage = ''
    if(!regEmail.test(strEmail)){
        blnError = true
        strMessage += '<p  class="mb-0 mt-0">Email must be a proper email</p>'
    }
    if(strPassword.length < 1){
        blnError = true
        strMessage += '<p class="mb-0 mt-0">Password Cannot Be Blank</p>'
    }
    if(blnError){
        Swal.fire({
            title: "Oh no, you have an error!",
            html: strMessage,
            icon: "error"
        });
    }
    else{
        Swal.fire({
            title: "All credentials have be validated",
            icon: "success"
        })
    }
})