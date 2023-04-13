import Vue from "vue";
import { ValidationObserver, ValidationProvider, extend } from "vee-validate";
import { required, email, confirmed, min } from "vee-validate/dist/rules";

Vue.component("ValidationObserver", ValidationObserver);
Vue.component("ValidationProvider", ValidationProvider);

extend("required", {
  ...required,
  message: "{_field_} is required",
});

extend("email", {
  ...email,
  message: "Email is not valid",
});

extend("confirmed", {
  ...confirmed,
  message: "Passwords does not match.",
});

extend("min", {
  ...min,
  message: "Password must be at least 6 characters.",
});
