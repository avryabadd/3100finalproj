$('#btnStudentLoginSwitch').on('click',function(){
    $('#frmRegister').slideUp('slow')
    $('#frmLogin').slideDown('fast')
})

$('#btnSwapRegister').on('click',function(){
    $('#frmLogin').slideUp('slow')
    $('#frmRegister').slideDown('fast')
})

document.querySelector("#togglePassword_Login").addEventListener("click", () => {
    const passwordInput = document.querySelector("#text-LoginPassword");
    const isPassword = passwordInput.type === "password";
    passwordInput.type = isPassword ? "text" : "password";
    document.querySelector("#togglePassword_Login").textContent = isPassword ? "Hide Password" : "Show Password";
  });

document.querySelector("#togglePassword_Register").addEventListener("click", () => {
    const passwordInput = document.querySelector("#txtPassword");
    const isPassword = passwordInput.type === "password";
    passwordInput.type = isPassword ? "text" : "password";
    document.querySelector("#togglePassword_Register").textContent = isPassword ? "Hide Password" : "Show Password";
    });

document.querySelector("#toggleConfirmPassword_Register").addEventListener("click", () => {
    const passwordInput = document.querySelector("#txtConfirmPassword");
    const isPassword = passwordInput.type === "password";
    passwordInput.type = isPassword ? "text" : "password";
    document.querySelector("#toggleConfirmPassword_Register").textContent = isPassword ? "Hide Password" : "Show Password";
    });
    
document.querySelector("#studentRegister").addEventListener("click", () => {
    const regEmail = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    const regPhone = /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/;
    let strEmail = $('#txtEmail').val()
    let strPassword = $('#txtPassword').val().trim()
    let strFirstName = $('#txtFirstName').val().trim()
    let strLastName = $('#txtLastName').val().trim()
    let strConfirmPassword = $('#txtConfirmPassword').val().trim()
    let phone = $('#telPhone').val().trim();
    let strDiscord = $('#inputDiscord').val().trim()
    let blnError = false
    let strMessage = ''
    if(!regEmail.test(strEmail)){
        blnError = true;
        $('#txtEmail').addClass('is-invalid');
        strMessage += '<p class="mb-0 mt-0">Email must be a proper email</p>';
    }  else {
        $('#txtEmail').removeClass('is-invalid');
    }

    if(strPassword.length < 1){
        blnError = true
        $('#txtPassword').addClass('is-invalid');
        strMessage += '<p class="mb-0 mt-0">Password Cannot Be Blank</p>'
    }
    else if((strPassword.length < 8) || (strPassword.length > 64) )
    {
        blnError = true
        $('#txtPassword').addClass('is-invalid');
        strMessage += '<p class="mb-0 mt-0">Password must be between 8 and 64 characters </p>'
    }
    else
    {
        if (!(strConfirmPassword == strPassword)) {
            blnError = true
            $('#txtConfirmPassword').addClass('is-invalid');
            strMessage += '<p class="mb-0 mt-0">Password and comfirm password must be equal</p>'
        } else {
            $('#txtConfirmPassword').removeClass('is-invalid');

        }
        $('#txtPassword').removeClass('is-invalid');
    }

    if(strFirstName.length < 1){
        blnError = true
        $('#txtFirstName').addClass('is-invalid');
        strMessage += '<p class="mb-0 mt-0">First name Cannot Be Blank</p>'
    } else {
        $('#txtFirstName').removeClass('is-invalid');
    }

    if(strLastName.length < 1){
        blnError = true
        $('#txtLastName').addClass('is-invalid');
        strMessage += '<p class="mb-0 mt-0">Last name Cannot Be Blank</p>'
    } else {
        $('#txtLastName').removeClass('is-invalid');
    }
  
    if(!regPhone.test(phone)){
        $('#telPhone').addClass('is-invalid');
        blnError = true;
        strMessage += '<p class="mb-0 mt-0">Phone number must be in format 123-456-7890</p>';
    } else {
        $('#telPhone').removeClass('is-invalid');
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
    else if((strPassword.length < 8) || (strPassword.length > 64) )
    {
        blnError = true
        strMessage += '<p class="mb-0 mt-0">Password must be between 8 and 64 characters </p>'
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