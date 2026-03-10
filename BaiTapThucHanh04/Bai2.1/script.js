const form = document.getElementById("registerForm");
const fullnameInput = document.getElementById("fullname");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirmPassword");
const genderRadios = document.querySelectorAll("input[name='gender']");
const termsCheckbox = document.getElementById("terms");

const successPanel = document.getElementById("successPanel");
const successName = document.getElementById("successName");

function showError(fieldId, message) {
  const errorSpan = document.getElementById(fieldId + "Error");
  if (errorSpan) {
    errorSpan.textContent = message;
  }
  const inputEl = document.getElementById(fieldId);
  if (inputEl) {
    inputEl.classList.remove("valid-border");
    if (message) {
      inputEl.classList.add("error-border");
    } else {
      inputEl.classList.remove("error-border");
    }
  }
}

function clearError(fieldId) {
  showError(fieldId, "");
}

function validateFullname() {
  const value = fullnameInput.value.trim();
  if (!value) {
    showError("fullname", "Họ và tên không được để trống.");
    return false;
  }
  if (value.length < 3) {
    showError("fullname", "Họ và tên phải có ít nhất 3 ký tự.");
    return false;
  }
  const onlyLetters = /^[a-zA-ZÀ-ỹ\s]+$/;
  if (!onlyLetters.test(value)) {
    showError("fullname", "Họ và tên chỉ chứa chữ cái và khoảng trắng.");
    return false;
  }
  showError("fullname", "");
  fullnameInput.classList.add("valid-border");
  return true;
}

function validateEmail() {
  const value = emailInput.value.trim();
  if (!value) {
    showError("email", "Email không được để trống.");
    return false;
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(value)) {
    showError("email", "Email không đúng định dạng.");
    return false;
  }
  showError("email", "");
  emailInput.classList.add("valid-border");
  return true;
}

function validatePhone() {
  const value = phoneInput.value.trim();
  if (!value) {
    showError("phone", "Số điện thoại không được để trống.");
    return false;
  }
  const phoneRegex = /^0[0-9]{9}$/;
  if (!phoneRegex.test(value)) {
    showError("phone", "Số điện thoại phải có 10 chữ số và bắt đầu bằng 0.");
    return false;
  }
  showError("phone", "");
  phoneInput.classList.add("valid-border");
  return true;
}

function validatePassword() {
  const value = passwordInput.value;
  if (!value) {
    showError("password", "Mật khẩu không được để trống.");
    return false;
  }
  if (value.length < 8) {
    showError("password", "Mật khẩu phải có ít nhất 8 ký tự.");
    return false;
  }
  const pwdRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  if (!pwdRegex.test(value)) {
    showError("password", "Mật khẩu phải có chữ hoa, chữ thường và số.");
    return false;
  }
  showError("password", "");
  passwordInput.classList.add("valid-border");
  return true;
}

function validateConfirmPassword() {
  const value = confirmPasswordInput.value;
  if (!value) {
    showError("confirmPassword", "Vui lòng nhập lại mật khẩu.");
    return false;
  }
  if (value !== passwordInput.value) {
    showError("confirmPassword", "Xác nhận mật khẩu không khớp.");
    return false;
  }
  showError("confirmPassword", "");
  confirmPasswordInput.classList.add("valid-border");
  return true;
}

function validateGender() {
  let selected = false;
  genderRadios.forEach((radio) => {
    if (radio.checked) selected = true;
  });
  const errorSpan = document.getElementById("genderError");
  if (!selected) {
    errorSpan.textContent = "Vui lòng chọn giới tính.";
    return false;
  }
  errorSpan.textContent = "";
  return true;
}

function validateTerms() {
  const errorSpan = document.getElementById("termsError");
  if (!termsCheckbox.checked) {
    errorSpan.textContent = "Bạn phải đồng ý với điều khoản.";
    return false;
  }
  errorSpan.textContent = "";
  return true;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let isValid = true;
  isValid = validateFullname() & isValid;
  isValid = validateEmail() & isValid;
  isValid = validatePhone() & isValid;
  isValid = validatePassword() & isValid;
  isValid = validateConfirmPassword() & isValid;
  isValid = validateGender() & isValid;
  isValid = validateTerms() & isValid;

  if (!isValid) {
    return;
  }

  form.style.display = "none";
  successName.textContent = fullnameInput.value.trim();
  successPanel.style.display = "block";
});

fullnameInput.addEventListener("blur", validateFullname);
emailInput.addEventListener("blur", validateEmail);
phoneInput.addEventListener("blur", validatePhone);
passwordInput.addEventListener("blur", validatePassword);
confirmPasswordInput.addEventListener("blur", validateConfirmPassword);
genderRadios.forEach((radio) => {
  radio.addEventListener("change", validateGender);
});
termsCheckbox.addEventListener("change", validateTerms);

fullnameInput.addEventListener("input", () => clearError("fullname"));
emailInput.addEventListener("input", () => clearError("email"));
phoneInput.addEventListener("input", () => clearError("phone"));
passwordInput.addEventListener("input", () => clearError("password"));
confirmPasswordInput.addEventListener("input", () => clearError("confirmPassword"));

window.addEventListener("DOMContentLoaded", () => {
  fullnameInput.focus();
});

