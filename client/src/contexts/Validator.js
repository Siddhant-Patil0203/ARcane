const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$%#^&*])(?=.*[0-9]).{8,}$/;
// eslint-disable-next-line no-useless-escape
const emailRegex = /^\w+([\.-]?\w+)*@(gmail\.com|yahoo\.com|hotmail\.com|aol\.com|outlook\.com)$/;

const Validator = (form) => {
  const errors = {};

  if(form.name && form.name.length < 6){
    errors.name = "Name must be at least 6 characters long"
  }

  if (form.email && !emailRegex.test(form.email)) {
    errors.email = "Please enter a valid email address";
  }

  if (form.password && !passwordRegex.test(form.password)) {
    errors.password =
      "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number and one special character";
  }

  if (form.confirmPassword && form.password !== form.confirmPassword) {
    errors.confirmPassword = "Please make sure your passwords match";
  }

  return errors;
};

export default Validator;
