document.getElementById('attendance-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('student-name').value;
    const date = document.getElementById('date').value;
    const status = document.getElementById('status').value;

    const table = document.getElementById('attendance-records').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();

    const nameCell = newRow.insertCell(0);
    const dateCell = newRow.insertCell(1);
    const statusCell = newRow.insertCell(2);

    nameCell.textContent = name;
    dateCell.textContent = date;
    statusCell.textContent = status;

    document.getElementById('attendance-form').reset();
    updateAttendanceStatistics();
});

document.getElementById('download-pdf').addEventListener('click', function() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    doc.autoTable({ html: '#attendance-records' });

    const totalPresent = document.getElementById('total-present').textContent;
    const totalAbsent = document.getElementById('total-absent').textContent;
    const totalStudents = parseInt(totalPresent) + parseInt(totalAbsent);

    doc.text("Attendance Statistics:", 14, doc.lastAutoTable.finalY + 10);
    doc.text(`Total Present: ${totalPresent}`, 14, doc.lastAutoTable.finalY + 20);
    doc.text(`Total Absent: ${totalAbsent}`, 14, doc.lastAutoTable.finalY + 30);
    doc.text(`Total Students: ${totalStudents}`, 14, doc.lastAutoTable.finalY + 50);

    doc.save('attendance-records.pdf');
});

function updateAttendanceStatistics() {
    const rows = document.getElementById('attendance-records').getElementsByTagName('tbody')[0].rows;
    let totalPresent = 0;
    let totalAbsent = 0;
    for (let row of rows) {
        const status = row.cells[2].textContent;
        if (status === 'Present') totalPresent++;
        if (status === 'Absent') totalAbsent++;   
    }
    document.getElementById('total-present').textContent = totalPresent;
    document.getElementById('total-absent').textContent = totalAbsent;
}
