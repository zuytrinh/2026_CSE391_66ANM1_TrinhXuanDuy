const form = document.getElementById("orderForm");
const productSelect = document.getElementById("product");
const quantityInput = document.getElementById("quantity");
const deliveryDateInput = document.getElementById("deliveryDate");
const addressInput = document.getElementById("address");
const noteInput = document.getElementById("note");
const paymentRadios = document.querySelectorAll("input[name='payment']");

const noteCounter = document.getElementById("noteCounter");
const totalPriceEl = document.getElementById("totalPrice");

const confirmPanel = document.getElementById("confirmPanel");
const cfProduct = document.getElementById("cfProduct");
const cfQuantity = document.getElementById("cfQuantity");
const cfTotal = document.getElementById("cfTotal");
const cfDate = document.getElementById("cfDate");
const confirmBtn = document.getElementById("confirmBtn");
const cancelBtn = document.getElementById("cancelBtn");
const confirmMsg = document.getElementById("confirmMsg");

const prices = {
  ao: 150000,
  quan: 200000,
  giay: 350000,
};

function formatMoney(value) {
  return Number(value).toLocaleString("vi-VN") + " đ";
}

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

function validateProduct() {
  if (!productSelect.value) {
    showError("product", "Vui lòng chọn sản phẩm.");
    return false;
  }
  showError("product", "");
  productSelect.classList.add("valid-border");
  return true;
}

function validateQuantity() {
  const valueStr = quantityInput.value.trim();
  const value = Number(valueStr);
  if (valueStr === "" || Number.isNaN(value) || !Number.isInteger(value)) {
    showError("quantity", "Số lượng phải là số nguyên.");
    return false;
  }
  if (value < 1 || value > 99) {
    showError("quantity", "Số lượng phải từ 1 đến 99.");
    return false;
  }
  showError("quantity", "");
  quantityInput.classList.add("valid-border");
  return true;
}

function validateDeliveryDate() {
  const value = deliveryDateInput.value;
  if (!value) {
    showError("deliveryDate", "Vui lòng chọn ngày giao hàng.");
    return false;
  }

  const selected = new Date(value);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const maxDate = new Date();
  maxDate.setDate(today.getDate() + 30);
  maxDate.setHours(0, 0, 0, 0);

  if (selected < today) {
    showError("deliveryDate", "Ngày giao không được trong quá khứ.");
    return false;
  }
  if (selected > maxDate) {
    showError("deliveryDate", "Ngày giao không quá 30 ngày từ hôm nay.");
    return false;
  }

  showError("deliveryDate", "");
  deliveryDateInput.classList.add("valid-border");
  return true;
}

function validateAddress() {
  const value = addressInput.value.trim();
  if (!value) {
    showError("address", "Địa chỉ không được để trống.");
    return false;
  }
  if (value.length < 10) {
    showError("address", "Địa chỉ phải có ít nhất 10 ký tự.");
    return false;
  }
  showError("address", "");
  addressInput.classList.add("valid-border");
  return true;
}

function validateNote() {
  const value = noteInput.value;
  if (value.length > 200) {
    showError("note", "Ghi chú không được quá 200 ký tự.");
    return false;
  }
  showError("note", "");
  noteInput.classList.add("valid-border");
  return true;
}

function validatePayment() {
  let selected = false;
  paymentRadios.forEach((radio) => {
    if (radio.checked) selected = true;
  });
  const errorSpan = document.getElementById("paymentError");
  if (!selected) {
    errorSpan.textContent = "Vui lòng chọn phương thức thanh toán.";
    return false;
  }
  errorSpan.textContent = "";
  return true;
}

function updateTotal() {
  const product = productSelect.value;
  const quantity = Number(quantityInput.value) || 0;
  if (!product || quantity <= 0) {
    totalPriceEl.textContent = "0 đ";
    return;
  }
  const price = prices[product] || 0;
  const total = price * quantity;
  totalPriceEl.textContent = formatMoney(total);
}

noteInput.addEventListener("input", () => {
  const length = noteInput.value.length;
  noteCounter.textContent = length + "/200";
  if (length > 200) {
    noteCounter.classList.add("over-limit");
  } else {
    noteCounter.classList.remove("over-limit");
  }
  clearError("note");
});

productSelect.addEventListener("change", () => {
  validateProduct();
  updateTotal();
});

quantityInput.addEventListener("input", () => {
  clearError("quantity");
  updateTotal();
});

deliveryDateInput.addEventListener("change", validateDeliveryDate);
addressInput.addEventListener("input", () => clearError("address"));
paymentRadios.forEach((radio) => {
  radio.addEventListener("change", validatePayment);
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let isValid = true;
  isValid = validateProduct() & isValid;
  isValid = validateQuantity() & isValid;
  isValid = validateDeliveryDate() & isValid;
  isValid = validateAddress() & isValid;
  isValid = validateNote() & isValid;
  isValid = validatePayment() & isValid;

  if (!isValid) {
    return;
  }

  const productText = productSelect.options[productSelect.selectedIndex].textContent;
  const quantity = Number(quantityInput.value);
  const totalText = totalPriceEl.textContent;
  const dateText = deliveryDateInput.value;

  cfProduct.textContent = productText;
  cfQuantity.textContent = quantity.toString();
  cfTotal.textContent = totalText;
  cfDate.textContent = dateText;

  confirmMsg.textContent = "";
  confirmPanel.style.display = "block";
});

confirmBtn.addEventListener("click", () => {
  confirmMsg.textContent = "Đặt hàng thành công!";
});

cancelBtn.addEventListener("click", () => {
  confirmPanel.style.display = "none";
});

window.addEventListener("DOMContentLoaded", () => {
  quantityInput.value = "1";
  updateTotal();
});

