import './passwordChange.html';

Template.passwordChange.events({
  "submit .form-alterar-senha": function(event, template){
    event.preventDefault();

    let target = event.target;
    let password = target.confirmPassword1.value;
    if(password === target.confirmPassword2.value) {
      Accounts.changePassword(target.oldPassword.value, password, function(error){
        if(!error) {
          swal({
            title: "Sucesso!",
            text: "Senha alterada com sucesso.",
            type: "success",
          });
        } else if(error.error == 403) {
          swal({
            title: "Deu ruim!",
            text: "Senha incorreta!",
            type: "error",
          });
        } else {
          swal({
            title: "Deu ruim!",
            text: error.message,
            type: "error",
          });
        }
      });
    } else {
      swal({
        title: "Erro!",
        text: "Confirme sua senha!",
        type: "error",
      });
    }
  }
});
