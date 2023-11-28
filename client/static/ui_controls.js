function generateAlert(alertType, message) {
  var alertDiv = document.createElement("div");
  alertDiv.classList.add("alert", "alert-" + alertType, "alert-dismissible", "fade", "show");
  alertDiv.setAttribute("role", "alert");
  alertDiv.innerHTML = "<strong>" + alertType.charAt(0).toUpperCase() + alertType.slice(1) + "!</strong> " + message + "<button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button>";
  document.querySelector("#notifications").appendChild(alertDiv);
  setTimeout(function(){
    $(alertDiv).alert('close');
  }, 2000);
}
