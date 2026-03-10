const fullnameInput = document.getElementById("fullname");
const scoreInput = document.getElementById("score");
const addBtn = document.getElementById("addBtn");
const tbody = document.getElementById("studentBody");
const totalCountEl = document.getElementById("totalCount");
const averageScoreEl = document.getElementById("averageScore");

/** @type {{name: string; score: number}[]} */
let students = [];

function classify(score) {
  if (score >= 8.5) return "Giỏi";
  if (score >= 7.0) return "Khá";
  if (score >= 5.0) return "Trung bình";
  return "Yếu";
}

function renderStats() {
  const total = students.length;
  const sum = students.reduce((acc, s) => acc + s.score, 0);
  const avg = total ? (sum / total).toFixed(2) : 0;

  totalCountEl.textContent = `Tổng số sinh viên: ${total}`;
  averageScoreEl.textContent = `Điểm trung bình: ${avg}`;
}

function renderTable() {
  tbody.innerHTML = "";

  students.forEach((s, index) => {
    const tr = document.createElement("tr");
    if (s.score < 5) {
      tr.classList.add("weak-score");
    }

    const type = classify(s.score);

    tr.innerHTML = `
      <td>${index + 1}</td>
      <td>${s.name}</td>
      <td>${s.score}</td>
      <td>${type}</td>
      <td>
        <button class="btn-delete" data-index="${index}">Xóa</button>
      </td>
    `;

    tbody.appendChild(tr);
  });

  renderStats();
}

function addStudent() {
  const name = fullnameInput.value.trim();
  const scoreStr = scoreInput.value.trim();
  const score = Number(scoreStr);

  if (!name) {
    alert("Họ tên không được để trống.");
    fullnameInput.focus();
    return;
  }

  if (scoreStr === "" || Number.isNaN(score) || score < 0 || score > 10) {
    alert("Điểm phải là số từ 0 đến 10.");
    scoreInput.focus();
    return;
  }

  students.push({ name, score });
  renderTable();

  fullnameInput.value = "";
  scoreInput.value = "";
  fullnameInput.focus();
}

addBtn.addEventListener("click", addStudent);

scoreInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    addStudent();
  }
});

tbody.addEventListener("click", (e) => {
  const target = e.target;
  if (target.matches(".btn-delete")) {
    const index = Number(target.getAttribute("data-index"));
    if (!Number.isNaN(index)) {
      students.splice(index, 1);
      renderTable();
    }
  }
});

// Đưa focus mặc định vào ô họ tên khi load
window.addEventListener("DOMContentLoaded", () => {
  fullnameInput.focus();
});

