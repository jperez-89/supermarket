// Login Page Flipbox control
$('.login-content [data-toggle="flip"]').click(function () {
  $(".login-box").toggleClass("flipped");
  return false;
});

document.addEventListener(
  "DOMContentLoaded",
  function () {
    if (document.querySelector("#frmLogin")) {
      let frmLogin = document.querySelector("#frmLogin");

      frmLogin.onsubmit = function (e) {
        e.preventDefault();

        let usuario = document.getElementById("txtUsername").value;
        let password = document.getElementById("txtPassword").value;

        if (usuario == "") {
          txtUsername.focus();
          swal("Por favor", "Ingrese su usuario", "error");
          return false;

        } else if (password == "") {
          txtPassword.focus();
          swal("Por favor", "Ingrese su contraseña", "error");
          return false;

        } else {
          const url = `${base_url}login/LoginUser`;
          frmDatos = new FormData(frmLogin);

          const res = fnt_Fetch(url, 'post', frmDatos);
          res.then(data => {
            if (data.status) {
              window.location = `${base_url}dashboard`;
            } else {
              swal("Error", data.msg, "error");
            }
          })
        }
      };
    }
  },
  false
);
