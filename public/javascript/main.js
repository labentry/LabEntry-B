var data;
$(document).ready(function () {
    $.get('/getStudentsData', function (result) {
        data = result.students;
        console.log(result.students);
    });
    document.getElementById('txtFileUpload').addEventListener('change', upload, false);

    $("#myInput").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#myTable tr").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
    // Method that checks that the browser supports the HTML5 File API
    function browserSupportFileUpload() {
        var isCompatible = false;
        if (window.File && window.FileReader && window.FileList && window.Blob) {
            isCompatible = true;
        }
        return isCompatible;
    }
    $("#form1").submit(function (e) {
        e.preventDefault();
        var unit = document.getElementById("Unit1").value;
        var tri = document.getElementById("tri").value;
        var year = document.getElementById("year").value;
        if (unit != "" && tri != "" && year != "") {
            console.log("Unit Selected:", unit);
            displayStudents(unit, tri, year);
        }
        else {
            alert("Please select a unit");
            console.log("Unit is not selected");
        }
    })

    $("#eqn-bg").click(function (e) {
        e.preventDefault();
        console.log("CheckID");
        var unit = document.getElementById("Unit2").value;
        var studentID = document.getElementById("result").innerText;
        console.log(document.getElementById("Unit2").value);
        console.log(document.getElementById("result").innerText);
        if (unit != "" || studentID != "") {
            // AJAX call
            //if else 
            alert("Student has completed the pre-requisites for the unit:" + unit);
        }
    })
    // Method that reads and processes the selected file
    function upload(evt) {
        if (!browserSupportFileUpload()) {
            alert('The File APIs are not fully supported in this browser!');
        } else {
            var data = null;
            var file = evt.target.files[0];
            var reader = new FileReader();
            reader.readAsText(file);
            reader.onload = function (event) {
                var csv = event.target.result;
                console.log(csv);
                var lines = csv.split("\n");

                var result = [];

                var headers = lines[0].split(",");

                for (var i = 1; i < lines.length; i++) {

                    var obj = {};
                    var currentline = lines[i].split(",");

                    for (var j = 0; j < headers.length; j++) {
                        obj[headers[j]] = currentline[j];
                    }

                    result.push(obj);

                }

                //return result; //JavaScript object
                console.log(result); //JSON
                // data = $.csv.toArrays(csvData);
                // if (data && data.length > 0) {
                //   alert('Imported -' + data.length + '- rows successfully!');
                //   console.log(data);
                // } else {
                //     alert('No data to import!');
                // }
            };
            reader.onerror = function () {
                alert('Unable to read ' + file.fileName);
            };
        }
    }
    //checkID
    var current,
        screen,
        output,
        limit,
        zero,
        period,
        operator;

    screen = document.getElementById("result");

    var elem = document.querySelectorAll(".num");

    var len = elem.length;

    for (var i = 0; i < len; i++) {

        elem[i].addEventListener("click", function () {
            output = screen.innerHTML;
            limit = output.length;
            if (limit < 10) {

                num = this.value;

                output = screen.innerHTML += num;

            }
            if (limit > 10) {

                alert("Sorry no more input is allowed");

            }

        }, false);

    }

    document.querySelector(".zero").addEventListener("click", function () {

        zero = this.value;

        if (screen.innerHTML === "") {

            output = screen.innerHTML = zero;
        }

        else if (screen.innerHTML === output) {

            output = screen.innerHTML += zero;

        }

    }, false);


    document.querySelector("#delete").addEventListener("click", function () {
        var del = screen.innerHTML;
        del = del.substring(0, del.length - 1);
        screen.innerHTML = del;

    }, false);



});


function displayStudents(unit, tri, year) {
    var studentTable = "<table id='datatable'><tr><td style='width: 80px;background-color: #13554b; text-align: center'>STUDENT ID</td>";
    studentTable += "<td style='width: 80px; text-align: center;background-color: #13554b;'>STUDENT NAME</td>";
    studentTable += "<td style='width: 80px;  text-align: center;background-color: #13554b;'>UNIT ENROLLED</td>";
    studentTable += "<td style='width: 80px;  text-align: center;background-color: #13554b;'>YEAR</td>";
    studentTable += "<td style='width: 80px;  text-align: center;background-color: #13554b;'>TRIMESTER</td>";
    studentTable += "<td style='width: 80px;  text-align: center;background-color: #13554b;'>PRE REQUISITE COMPLETED</td></tr>";
    studentTable += "<tbody id='myTable'>";

    if (data.length == 0) {
        console.log("No Data");
    }


    else {

        for (var i = 0; i < data.length; i++) {
            if (data[i].unit_enrolled == unit && data[i].year == year && data[i].trimester == tri) {
                studentTable += "<tr><td style='width: 80px; text-align: center;'>" + data[i].id + "</td>";
                studentTable += "<td     style='width: 80px; text-align: center;'>" + data[i].name + "</td>";
                studentTable += "<td     style='width: 80px; text-align: center;'>" + data[i].unit_enrolled + "</td>";
                studentTable += "<td     style='width: 80px; text-align: center;'>" + data[i].year + "</td>";
                studentTable += "<td     style='width: 80px; text-align: center;'>" + data[i].trimester + "</td>";
                studentTable += "<td     style='width: 80px; text-align: center;'>" + data[i].preRequisite + "</td></tr>";
            }
        }

        studentTable += "</tbody></table>"

    }
    document.getElementById("studentTable").innerHTML = studentTable;
    document.getElementById("viewTable").style.display = "table-cell";
}


