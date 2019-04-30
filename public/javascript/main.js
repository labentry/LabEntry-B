var data;
$(document).ready(function(){
    $.get('/getStudentsData',function(result){
        data=result.student;
        console.log(result.student);
    });
});

$(document).ready(function(){
    $("#myInput").on("keyup", function() {
      var value = $(this).val().toLowerCase();
      $("#myTable tr").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
      });
    });
  });

function unitSelected(unit)
{   
    if(unit!="")
    {
        console.log("Unit Selected:",unit);
        displayStudents(unit);
    }
    else
    {
    alert("Please select a unit");
    console.log("Unit is not selected");
    }
}
function displayStudents(unit)
{   
    var  studentTable="<table id='datatable'><tr><td style='width: 80px; color: white; text-align: center'>Student ID</td>";
    studentTable+= "<td style='width: 80px; color: white; text-align: center;'>Student Name</td>";
    studentTable+="<td style='width: 80px; color: white; text-align: center;'>Unit Enrolled</td>";
    studentTable+="<td style='width: 80px; color: white; text-align: center;'>Pre-requisite\n(Completed)</td></tr>";
    studentTable+="<tbody id='myTable'>";

    if(data.length==0)
    {
        console.log("No Data");
    }

    
    else
    {
     
    for (var i=0; i<data.length; i++) 
    {
        if(data[i].unit_enrolled==unit)
        {
            studentTable+="<tr><td style='width: 80px; text-align: center;'>"+data[i].id+"</td>";
            studentTable+="<td     style='width: 80px; text-align: center;'>"+data[i].name+"</td>";
            studentTable+="<td     style='width: 80px; text-align: center;'>"+data[i].unit_enrolled+"</td>";
            studentTable+="<td     style='width: 80px; text-align: center;'>"+data[i].preRequisite+"</td></tr>";
        }
    } 
    
    studentTable+="</tbody></table>"
    
    }
    document.getElementById("studentTable").innerHTML=studentTable;
}

