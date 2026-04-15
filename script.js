let data = [];
let editIndex = -1;

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
                <button class="btn btn-primary btn-sm" onclick="edit(${index})">Sửa</button>
                <button class="btn btn-danger btn-sm" onclick="remove(${index})">Xóa</button>
            </td>
        </tr>`;
    });

    document.getElementById("tableBody").innerHTML = html;
}

function openForm() {
    editIndex = -1;
    document.getElementById("name").value = "";
    document.getElementById("qty").value = "";
    document.getElementById("unit").value = "";

    new bootstrap.Modal(document.getElementById('myModal')).show();
}

function save() {
    let name = document.getElementById("name").value;
    let qty = document.getElementById("qty").value;
    let unit = document.getElementById("unit").value;

    if (editIndex === -1) {
        data.push({ name, qty, unit });
    } else {
        data[editIndex] = { name, qty, unit };
    }

    render();
    bootstrap.Modal.getInstance(document.getElementById('myModal')).hide();
}

function edit(index) {
    editIndex = index;
    let item = data[index];

    document.getElementById("name").value = item.name;
    document.getElementById("qty").value = item.qty;
    document.getElementById("unit").value = item.unit;

    new bootstrap.Modal(document.getElementById('myModal')).show();
}

function remove(index) {
    if (confirm("Xóa?")) {
        data.splice(index, 1);
        render();
    }
}

// tìm kiếm
document.getElementById("search").addEventListener("keyup", function() {
    let keyword = this.value.toLowerCase();
    let rows = document.querySelectorAll("#tableBody tr");

    rows.forEach(row => {
        let text = row.innerText.toLowerCase();
        row.style.display = text.includes(keyword) ? "" : "none";
    });
});

render();