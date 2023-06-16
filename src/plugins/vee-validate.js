import Vue from "vue";
import { ValidationObserver, ValidationProvider, extend } from "vee-validate";
import { required, confirmed, min } from "vee-validate/dist/rules";

Vue.component("ValidationObserver", ValidationObserver);
Vue.component("ValidationProvider", ValidationProvider);

extend("required", {
  ...required,
  message: "{_field_} is required",
});

extend(
  "email",
  (value) =>
  /^(?!.*_[^@]*$)(?!.*\.\.)[A-Za-z0-9+_.-]+@[A-Za-z0-9-]+\.[A-Za-z]{1,63}$/.test(value) || "Email must be valid"
);

extend("confirmed", {
  ...confirmed,
  message: "Passwords does not match.",
});

extend("min", {
  ...min,
  message: "Password must be at least 6 characters.",
});
