//Script for tooltip
$(document).ready(function () {
  $('[data-toggle="tooltip"]').tooltip();
});

//Script for form search
function showSearchForm() {
  document.getElementById("nav-bar-menu").style.display = "none";
  document.getElementById("form-search-nav").style.display = "block";
}

function closeSearchForm() {
  document.getElementById("nav-bar-menu").style.display = "flex";
  document.getElementById("form-search-nav").style.display = "none";
}

//Script for Valid Message
// Disable form submissions if there are invalid fields
(function () {
  "use strict";
  window.addEventListener(
    "load",
    function () {
      // Get the forms we want to add validation styles to
      var forms = document.getElementsByClassName("needs-validation");
      // Loop over them and prevent submission
      var validation = Array.prototype.filter.call(forms, function (form) {
        form.addEventListener(
          "submit",
          function (event) {
            if (form.checkValidity() === false) {
              event.preventDefault();
              event.stopPropagation();
            }
            form.classList.add("was-validated");
          },
          false
        );
      });
    },
    false
  );
})();

//Script For changeValue -> showRange
function changeValueHeight(elementRange) {
  document.getElementById("value-height").innerHTML = elementRange.value;
}
function changeValueWeight(elementRange) {
  document.getElementById("value-weight").innerHTML = elementRange.value;
}

//Show Option changePwd
function clickChangePwdHandler(checkBtn) {
  if (checkBtn.checked == 1) {
    document.getElementById("change-pwd-group").style.display = "block";
  } else document.getElementById("change-pwd-group").style.display = "none";
}
