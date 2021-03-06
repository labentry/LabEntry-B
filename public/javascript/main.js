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

    })

    $("#eqn-bg").click(function (e) {
        // $('#checkID').submit(function (e) {
        e.preventDefault();

        var unit = document.getElementById("Unit2").value;
        var studentID = document.getElementById("result").innerText;
        var year=document.getElementById("year2").value;;
        var trimester=document.getElementById("tri2").value;;
        var comp = 0;
        var pre = 0;
        document.getElementById("alert").style.display = "block";
        document.getElementById("completed").style.display = "none";
        document.getElementById("notCompleted").style.display = "none";
        document.getElementById("noMatch").style.display = "none";

        if(unit=="")
        {   
            document.getElementById("msgHead").innerHTML = "ERROR";
            document.getElementById("msg").innerHTML = "Please select a unit";
            document.getElementById("noMatch").style.display = "block";
        }
        else if(year=="")
        {
            document.getElementById("msgHead").innerHTML = "ERROR";
            document.getElementById("msg").innerHTML = "Please select a year";
            document.getElementById("noMatch").style.display = "block";   
        }
        else if(trimester=="")
        {
            document.getElementById("msgHead").innerHTML = "ERROR";
            document.getElementById("msg").innerHTML = "Please select a trimester";
            document.getElementById("noMatch").style.display = "block";   
        }
        else if(studentID.length<9)
        {
            document.getElementById("msgHead").innerHTML = "ERROR";
            document.getElementById("msg").innerHTML = "Enter a student ID of 9 digits";
            document.getElementById("noMatch").style.display = "block";
        }
        
        

        if (studentID.length == 9 && unit!="" && studentID!=""&& year!=""&& trimester!="")  {
        


            for (var i = 0; i < data.length; i++) {
                if (data[i].id == studentID && data[i].unit_enrolled == unit) {

                    if (data[i].preRequisite == "Yes") {
                        comp = +1;
                        pre = 1;
                    }
                    else {
                        pre = 2;
                    }

                }

            }
            if (pre == 1) {
                document.getElementById("completed").style.display = "block";
            }
            else if (pre == 2) {
                document.getElementById("notCompleted").style.display = "block";
            }
            else if (comp < 1) {
                document.getElementById("msgHead").innerHTML = "No Match";
                document.getElementById("msg").innerHTML = "No Record found in database";
                document.getElementById("noMatch").style.display = "block";
            }



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
                var lines = csv.split("\r\n");

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
                result = result;
                viewData(result);
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
            if (limit < 9) {

                num = this.value;

                output = screen.innerHTML += num;

            }

        }, false);

    }


    document.querySelector("#delete").addEventListener("click", function () {
        var del = screen.innerHTML;
        del = del.substring(0, del.length - 1);
        screen.innerHTML = del;

    }, false);



});

function viewData(result) {
    var viewTable = "<table ><tr><td style='width: 80px;background-color: #13554b; text-align: center'>STUDENT ID</td>";
    viewTable += "<td style='width: 80px; text-align: center;background-color: #13554b;'>STUDENT NAME</td>";
    viewTable += "<td style='width: 80px;  text-align: center;background-color: #13554b;'>UNIT ENROLLED</td>";
    viewTable += "<td style='width: 80px;  text-align: center;background-color: #13554b;'>YEAR</td>";
    viewTable += "<td style='width: 80px;  text-align: center;background-color: #13554b;'>TRIMESTER</td>";
    viewTable += "<td style='width: 80px;  text-align: center;background-color: #13554b;'>PRE REQUISITE COMPLETED</td></tr>";
    viewTable += "<tbody id='myTable'>";

    for (var i = 0; i < result.length - 1; i++) {

        viewTable += "<tr><td style='width: 80px; text-align: center;'>" + result[i].id + "</td>";
        viewTable += "<td     style='width: 80px; text-align: center;'>" + result[i].name + "</td>";
        viewTable += "<td     style='width: 80px; text-align: center;'>" + result[i].unit_enrolled + "</td>";
        viewTable += "<td     style='width: 80px; text-align: center;'>" + result[i].year + "</td>";
        viewTable += "<td     style='width: 80px; text-align: center;'>" + result[i].trimester + "</td>";
        viewTable += "<td     style='width: 80px; text-align: center;'>" + result[i].preRequisite + "</td></tr>";

    }

    viewTable += "</tbody></table>"
    document.getElementById("studentTable").innerHTML = viewTable;
    document.getElementById("viewTable").style.display = "table-cell";

}


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

function closeAlert() {
    document.getElementById("alert").style.display = "none";
}
