
const students = [
    { id: 101, name: "Aman", marks: 82, course: "Java" },
    { id: 102, name: "Priya", marks: 95, course: "Python" },
    { id: 103, name: "Rahul", marks: 67, course: "Java" },
    { id: 104, name: "Neha", marks: 76, course: "Web" },
    { id: 105, name: "Rohan", marks: 88, course: "Python" }
];

// Backup of original data for Reset functionality during testing
const originalBackup = [
    { id: 101, name: "Aman", marks: 82, course: "Java" },
    { id: 102, name: "Priya", marks: 95, course: "Python" },
    { id: 103, name: "Rahul", marks: 67, course: "Java" },
    { id: 104, name: "Neha", marks: 76, course: "Web" },
    { id: 105, name: "Rohan", marks: 88, course: "Python" }
];

// Automatically display student data in the main table when page loads
window.onload = function() {
    renderTable();
};


// ============================================================================
// REUSABLE HELPER FUNCTIONS (To avoid repeating code)
// ============================================================================

// Helper: Displays the current array of students in the main web page table
function renderTable() {
    const tableBody = document.getElementById("student-table-body");
    tableBody.innerHTML = ""; // Clear existing rows
    
    for (let i = 0; i < students.length; i++) {
        let student = students[i];
        let row = document.createElement("tr");
        
        row.innerHTML = `
            <td>${student.id}</td>
            <td>${student.name}</td>
            <td>${student.marks}</td>
            <td>${student.course}</td>
        `;
        
        tableBody.appendChild(row);
    }
}

// Helper: Converts an array of student objects into an HTML table string for Output section
function formatAsTable(dataArray) {
    if (!dataArray || dataArray.length === 0) {
        return "<p>No student records to display.</p>";
    }
    
    let tableHtml = `
        <table class="output-table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Marks</th>
                    <th>Course</th>
                </tr>
            </thead>
            <tbody>
    `;
    
    for (let student of dataArray) {
        tableHtml += `
            <tr>
                <td>${student.id}</td>
                <td>${student.name}</td>
                <td>${student.marks}</td>
                <td>${student.course}</td>
            </tr>
        `;
    }
    
    tableHtml += "</tbody></table>";
    return tableHtml;
}

// Helper: Shows messages and results in the Output box at the bottom of the page
function showOutput(statusMessage, resultHtml) {
    const outputBox = document.getElementById("output-box");
    outputBox.innerHTML = `
        <span class="status-badge">${statusMessage}</span>
        <div class="result-content">${resultHtml}</div>
    `;
}

// Reset button handler to revert changes during testing
function resetData() {
    students.length = 0; // Clear array
    for (let student of originalBackup) {
        students.push({ ...student });
    }
    renderTable();
    showOutput("Data Reset", "<p>The student array has been reset to its initial 5 records.</p>");
}


// ============================================================================
// TASK FUNCTIONS (Each button executes one specific function)
// ============================================================================

// Task 1: Add a Student at the end of array using push()
function addStudent() {
    const newStudent = { id: 106, name: "Simran", marks: 91, course: "Java" };
    students.push(newStudent);
    
    renderTable(); // Automatically update table
    showOutput(
        "Student Added Successfully (push)", 
        `<p>Added student <strong>${newStudent.name} (ID: ${newStudent.id})</strong> to the end of the array.</p>` + formatAsTable(students)
    );
}

// Task 2: Remove the last student using pop()
function removeLastStudent() {
    if (students.length === 0) {
        showOutput("Notice", "<p>No students remaining in the array to remove.</p>");
        return;
    }
    
    const removedStudent = students.pop();
    
    renderTable(); // Automatically update table
    showOutput(
        "Student Removed Successfully (pop)", 
        `<p>Removed Last Student: <strong>${removedStudent.name} (ID: ${removedStudent.id})</strong> with ${removedStudent.marks} marks in ${removedStudent.course}.</p>`
    );
}

// Task 3: Add a Student at the beginning of array using unshift()
function addStudentBeginning() {
    const newStudent = { id: 100, name: "Ankit", marks: 80, course: "Web" };
    students.unshift(newStudent);
    
    renderTable(); // Automatically update table
    showOutput(
        "Student Added at Beginning Successfully (unshift)", 
        `<p>Inserted student <strong>${newStudent.name} (ID: ${newStudent.id})</strong> at index 0.</p>` + formatAsTable(students)
    );
}

// Task 4: Remove the first student using shift()
function removeFirstStudent() {
    if (students.length === 0) {
        showOutput("Notice", "<p>No students remaining in the array to remove.</p>");
        return;
    }
    
    const removedStudent = students.shift();
    
    renderTable(); // Automatically update table
    showOutput(
        "First Student Removed Successfully (shift)", 
        `<p>Removed First Student: <strong>${removedStudent.name} (ID: ${removedStudent.id})</strong> from index 0.</p>`
    );
}

// Task 5: Update Array using splice() - replace student with ID 103
function updateStudent() {
    const targetId = 103;
    const index = students.findIndex(student => student.id === targetId);
    
    const replacementStudent = { id: 107, name: "Karan", marks: 78, course: "Java" };
    
    if (index !== -1) {
        students.splice(index, 1, replacementStudent);
        renderTable(); // Automatically update table
        showOutput(
            "Array Updated Successfully (splice)", 
            `<p>Replaced student having ID 103 with new student <strong>${replacementStudent.name} (ID: 107)</strong>.</p>` + formatAsTable(students)
        );
    } else {
        showOutput(
            "Operation Failed", 
            `<p>Student with ID 103 was not found in the array (it may have been previously removed).</p>`
        );
    }
}

// Task 6: Create a new array containing only the first three students using slice()
function showFirstThree() {
    const firstThree = students.slice(0, 3);
    
    showOutput(
        "First Three Students Extracted (slice)", 
        `<p>Used <code>slice(0, 3)</code> to create a new sub-array without modifying the main table:</p>` + formatAsTable(firstThree)
    );
}

// Task 7: Display all students using a for...of loop
function displayStudents() {
    let listHtml = "<ul>";
    
    for (const student of students) {
        listHtml += `<li><strong>${student.name}</strong> - ${student.course} - ${student.marks}</li>`;
    }
    listHtml += "</ul>";
    
    showOutput(
        "Displayed Students (for...of Loop)", 
        `<p>Iterated over array using <code>for...of</code> loop in format <em>Name - Course - Marks</em>:</p>` + listHtml
    );
}

// Task 8: Print only student names using forEach()
function showNames() {
    let namesList = "<ol>";
    
    students.forEach(function(student) {
        namesList += `<li>${student.name}</li>`;
    });
    namesList += "</ol>";
    
    showOutput(
        "Printed Student Names (forEach)", 
        `<p>Used <code>forEach()</code> method to loop through and print student names:</p>` + namesList
    );
}

// Task 9: Create a new array containing only student names using map()
function getStudentNames() {
    const namesArray = students.map(student => student.name);
    
    showOutput(
        "Student Names Array Created (map)", 
        `<p>Used <code>map()</code> to transform student objects into an array of strings:</p>` + 
        `<p><strong>Result Array:</strong> <code>[ ${namesArray.map(name => `"${name}"`).join(", ")} ]</code></p>`
    );
}

// Task 10: Create a new array of students having marks >= 80 using filter()
function filterHighScorers() {
    const highScorers = students.filter(student => student.marks >= 80);
    
    showOutput(
        "Filtered High Scorers (filter)", 
        `<p>Used <code>filter()</code> to select students with marks greater than or equal to 80:</p>` + formatAsTable(highScorers)
    );
}

// Task 11: Find Total Marks & Average Marks using reduce()
function calculateTotalAverage() {
    if (students.length === 0) {
        showOutput("Notice", "<p>No students available to calculate total and average marks.</p>");
        return;
    }
    
    const totalMarks = students.reduce((sum, student) => sum + student.marks, 0);
    const averageMarks = (totalMarks / students.length).toFixed(1);
    
    showOutput(
        "Calculated Total & Average Marks (reduce)", 
        `<p><strong>Total Marks:</strong> ${totalMarks}</p>` +
        `<p><strong>Average Marks:</strong> ${averageMarks}</p>`
    );
}

// Task 12: Sort students by marks in Ascending order
function sortAscending() {
    students.sort((a, b) => a.marks - b.marks);
    
    renderTable(); // Automatically update table
    
    // Extract marks list for simple presentation
    let marksList = students.map(s => s.marks).join(" &rarr; ");
    
    showOutput(
        "Array Sorted Ascending by Marks (sort)", 
        `<p><strong>Sorted Marks Order:</strong> ${marksList}</p>` + formatAsTable(students)
    );
}

// Task 13: Sort students by marks in Descending order
function sortDescending() {
    students.sort((a, b) => b.marks - a.marks);
    
    renderTable(); // Automatically update table
    
    // Extract marks list for simple presentation
    let marksList = students.map(s => s.marks).join(" &rarr; ");
    
    showOutput(
        "Array Sorted Descending by Marks (sort)", 
        `<p><strong>Sorted Marks Order:</strong> ${marksList}</p>` + formatAsTable(students)
    );
}