var data;
$(document).ready(function(){
    $.get('/test','alice',function(result){
        data=result;
        console.log(result);
    });
});
   

function unitSelected(value)
{   
    if(value!="")
    {
        console.log("Unit Selected:",value);
        var students=data.Student_ID;
        var names= data.Student_Name;
        console.log(students);
        displayStudents(students,names,value);
    }
    else
    {
    console.log("Unit is not selected");
    }
}
function displayStudents(students, names,value)
{   
    var studentTable="<table><tr><td style='width: 80px; color: white; text-align: center'>Student ID</td>";
    studentTable+= "<td style='width: 80px; color: white; text-align: center;'>Student Name</td>";
    studentTable+="<td style='width: 80px; color: white; text-align: center;'>Unit Enrolled</td>";
    studentTable+="<td style='width: 80px; color: white; text-align: center;'>Pre-requisite\n(Completed)</td></tr>";

    

    if(students.length==0)
    {
        console.log("No Data");
    }

    
    else
    {
     
    for (var i=0; i<students.length; i++) {
        studentTable+="<tr><td style='width: 80px; text-align: center;'>"+students[i]+"</td>";
        studentTable+="<td     style='width: 80px; text-align: center;'>"+names[i]+"</td>";
        studentTable+="<td     style='width: 80px; text-align: center;'>"+value+"</td>";
        studentTable+="<td     style='width: 80px; text-align: center;'>---------------</td></tr>";
      } 
    
       
    }
    document.getElementById("studentTable").innerHTML=studentTable;
}

