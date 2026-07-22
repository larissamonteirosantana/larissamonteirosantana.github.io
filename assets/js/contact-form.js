(function () {
  var WEB3FORMS_ACCESS_KEY = "f47460b9-60ff-4e38-a27b-4575bdd6998b";
  var FORM_ID = "email-form-2";

  document.addEventListener(
    "submit",
    function (e) {
      var form = e.target;
      if (!form || form.id !== FORM_ID) return;

      e.preventDefault();
      e.stopPropagation();

      var wrapper = form.closest(".w-form") || form.parentElement;
      var doneEl = wrapper && wrapper.querySelector(".w-form-done");
      var failEl = wrapper && wrapper.querySelector(".w-form-fail");
      var submitBtn = form.querySelector('input[type="submit"], button[type="submit"]');

      var getValue = function (name) {
        var field = form.querySelector('[name="' + name + '"]');
        return field ? field.value : "";
      };

      var payload = {
        access_key: WEB3FORMS_ACCESS_KEY,
        subject: "Novo contato pelo portfólio",
        name: getValue("name-2"),
        email: getValue("Email-3"),
        message: getValue("Project-4")
      };

      if (submitBtn) submitBtn.disabled = true;
      if (failEl) failEl.style.display = "none";

      fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(payload)
      })
        .then(function (res) {
          return res.json();
        })
        .then(function (data) {
          if (data.success) {
            form.style.display = "none";
            if (doneEl) doneEl.style.display = "block";
          } else if (failEl) {
            failEl.style.display = "block";
          }
        })
        .catch(function () {
          if (failEl) failEl.style.display = "block";
        })
        .finally(function () {
          if (submitBtn) submitBtn.disabled = false;
        });
    },
    true
  );
})();
