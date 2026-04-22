let data = [];
let editId = null;

// ================== LOAD DATA ==================
async function fetchData() {
    const res = await fetch("http://localhost:3000/items");
    data = await res.json();
    render();
}

// ================== RENDER ==================
function render() {
    let html = "";

    data.forEach((item, index) => {
        let status = item.qty <= 5
            ? '<span class="badge bg-warning">Sắp hết</span>'
            : '<span class="badge bg-success">Còn</span>';

        html += `
        <tr>
            <td>${index + 1}</td>
            <td>${item.name}</td>
            <td>${item.qty}</td>
            <td>${item.unit}</td>
            <td>${status}</td>
            <td>
                <button class="btn btn-primary btn-sm" onclick="edit(${item.id})">Sửa</button>
                <button class="btn btn-danger btn-sm" onclick="removeItem(${item.id})">Xóa</button>
            </td>
        </tr>`;
    });

    document.getElementById("tableBody").innerHTML = html;
}

// ================== FORM ==================
function openForm() {
    editId = null;

    document.getElementById("name").value = "";
    document.getElementById("qty").value = "";
    document.getElementById("unit").value = "";

    new bootstrap.Modal(document.getElementById('myModal')).show();
}

// ================== SAVE ==================
async function save() {
    let name = document.getElementById("name").value;
    let qty = document.getElementById("qty").value;
    let unit = document.getElementById("unit").value;

    if (editId === null) {
        // CREATE
        await fetch("http://localhost:3000/items", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, qty, unit })
        });
    } else {
        // UPDATE
        await fetch(`http://localhost:3000/items/${editId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, qty, unit })
        });
    }

    bootstrap.Modal.getInstance(document.getElementById('myModal')).hide();
    fetchData();
}

// ================== EDIT ==================
function edit(id) {
    editId = id;

    let item = data.find(x => x.id === id);

    document.getElementById("name").value = item.name;
    document.getElementById("qty").value = item.qty;
    document.getElementById("unit").value = item.unit;

    new bootstrap.Modal(document.getElementById('myModal')).show();
}

// ================== DELETE ==================
async function removeItem(id) {
    if (confirm("Xóa?")) {
        await fetch(`http://localhost:3000/items/${id}`, {
            method: "DELETE"
        });
        fetchData();
    }
}

// ================== SEARCH ==================
document.getElementById("search").addEventListener("keyup", function () {
    let keyword = this.value.toLowerCase();
    let rows = document.querySelectorAll("#tableBody tr");

    rows.forEach(row => {
        let text = row.innerText.toLowerCase();
        row.style.display = text.includes(keyword) ? "" : "none";
    });
});

// ================== INIT ==================
fetchData();