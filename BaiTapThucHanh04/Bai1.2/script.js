const fullnameInput = document.getElementById("fullname");
const scoreInput = document.getElementById("score");
const addBtn = document.getElementById("addBtn");
const searchInput = document.getElementById("searchInput");
const typeFilter = document.getElementById("typeFilter");
const scoreHeader = document.getElementById("scoreHeader");
const scoreArrow = document.getElementById("scoreArrow");
const tbody = document.getElementById("studentBody");
const noResultEl = document.getElementById("noResult");
const totalCountEl = document.getElementById("totalCount");
const averageScoreEl = document.getElementById("averageScore");
const visibleCountEl = document.getElementById("visibleCount");

/** @type {{name: string; score: number}[]} */
let students = [];
/** @type {{name: string; score: number}[]} */
let filteredStudents = [];

let sortDirection = "asc"; // 'asc' | 'desc'

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

  totalCountEl.textContent = `Tổng số sinh viên (gốc): ${total}`;
  averageScoreEl.textContent = `Điểm trung bình (gốc): ${avg}`;

  visibleCountEl.textContent = `Số sinh viên đang hiển thị: ${filteredStudents.length}`;
}

function renderTable() {
  tbody.innerHTML = "";

  if (filteredStudents.length === 0) {
    noResultEl.style.display = "block";
  } else {
    noResultEl.style.display = "none";
  }

  filteredStudents.forEach((s, index) => {
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
        <button class="btn-delete" data-name="${s.name}" data-score="${s.score}">Xóa</button>
      </td>
    `;

    tbody.appendChild(tr);
  });

  renderStats();
}

function applyFilters() {
  const keyword = searchInput.value.trim().toLowerCase();
  const typeValue = typeFilter.value;

  filteredStudents = students.filter((s) => {
    const matchName = s.name.toLowerCase().includes(keyword);
    const type = classify(s.score);
    const matchType = typeValue === "all" ? true : type === typeValue;
    return matchName && matchType;
  });

  filteredStudents.sort((a, b) => {
    if (sortDirection === "asc") {
      return a.score - b.score;
    }
    return b.score - a.score;
  });

  scoreArrow.textContent = sortDirection === "asc" ? "▲" : "▼";

  renderTable();
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
  fullnameInput.value = "";
  scoreInput.value = "";
  fullnameInput.focus();

  applyFilters();
}

addBtn.addEventListener("click", addStudent);

scoreInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    addStudent();
  }
});

searchInput.addEventListener("input", applyFilters);
typeFilter.addEventListener("change", applyFilters);

scoreHeader.addEventListener("click", () => {
  sortDirection = sortDirection === "asc" ? "desc" : "asc";
  applyFilters();
});

tbody.addEventListener("click", (e) => {
  const target = e.target;
  if (target.matches(".btn-delete")) {
    const name = target.getAttribute("data-name");
    const score = Number(target.getAttribute("data-score"));

    const index = students.findIndex((s) => s.name === name && s.score === score);
    if (index !== -1) {
      students.splice(index, 1);
      applyFilters();
    }
  }
});

window.addEventListener("DOMContentLoaded", () => {
  // Khởi tạo sẵn một vài dữ liệu mẫu
  students = [
    { name: "Nguyễn Văn A", score: 9.0 },
    { name: "Trần Thị B", score: 7.5 },
    { name: "Lê Văn C", score: 5.2 },
    { name: "Phạm Thị D", score: 4.5 },
  ];
  applyFilters();
  fullnameInput.focus();
});

