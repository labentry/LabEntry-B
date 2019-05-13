var data;
$(document).ready(function(){
    $.get('/getStudentsData',function(result){
        data=result.student;
        console.log(result.student);
    });
    document.getElementById('txtFileUpload').addEventListener('change', upload, false);

    $("#myInput").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#myTable tr").filter(function() {
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

    // Method that reads and processes the selected file
    function upload(evt) {
    if (!browserSupportFileUpload()) {
        alert('The File APIs are not fully supported in this browser!');
        } else {
            var data = null;
            var file = evt.target.files[0];
            var reader = new FileReader();
            reader.readAsText(file);
            reader.onload = function(event) {
                var csvData = event.target.result;
                data = $.csv.toArrays(csvData);
                if (data && data.length > 0) {
                  alert('Imported -' + data.length + '- rows successfully!');
                  console.log(data);
                } else {
                    alert('No data to import!');
                }
            };
            reader.onerror = function() {
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
        
          for(var i = 0; i < len; i++ ) {
            
            elem[i].addEventListener("click",function() {
                output=screen.innerHTML;
                limit = output.length;
                if(limit<10){
                      
                num = this.value;
                         
                output = screen.innerHTML +=num;
                      
                }
             if(limit > 10 ) {
            
             alert("Sorry no more input is allowed");
                 
           }
           
         },false);
            
        } 
    
        document.querySelector(".zero").addEventListener("click",function() {
            
            zero = this.value;
            
            if(screen.innerHTML === "") {
                
               output = screen.innerHTML = zero;  
            }
            
            else if(screen.innerHTML === output) {
                
             output = screen.innerHTML +=zero;
                
            }
              
        },false);
        
        // document.querySelector(".period").addEventListener("click",function() {
            
        //     period = this.value;
            
        //     if(screen.innerHTML === "") {
                
        //      output = screen.innerHTML = screen.innerHTML.concat("0.");
                
        //      }
        
        //     else if(screen.innerHTML === output) {
            
        //       screen.innerHTML = screen.innerHTML.concat(".");
                
        //     }
            
        // },false);
        
        
        // document.querySelector("#eqn-bg").addEventListener("click",function() {
            
        //   if(screen.innerHTML === output) {
              
        //     screen.innerHTML = eval(output);
            
        //     output = screen.innerHTML;
            
        //   }
            
        //   else {
        //         screen.innerHTML = "";
        //   }
              
        // },false);
        
     document.querySelector("#delete").addEventListener("click",function() {
            
            screen.innerHTML = "";
            
        },false);
        
       
        //  var elem1 = document.querySelectorAll(".operator");
        
        //   var len1 = elem1.length;
        
        //   for(var i = 0; i < len1; i++ ) {
            
        //     elem1[i].addEventListener("click",function() {
             
        //     operator = this.value;
             
        //      if(screen.innerHTML === "") {
                
        //         screen.innerHTML = screen.innerHTML.concat("");
                
        //     }
            
        //     else if(output) {
            
        //         screen.innerHTML = output.concat(operator);
                
        //     }
               
        // },false);
              
        //   } 
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
    var  studentTable="<table id='datatable'><tr><td style='width: 80px; color: white; text-align: center'>STUDENT ID</td>";
    studentTable+= "<td style='width: 80px; color: white; text-align: center;'>STUDENT NAME</td>";
    studentTable+="<td style='width: 80px; color: white; text-align: center;'>UNIT ENROLLED</td>";
    studentTable+="<td style='width: 80px; color: white; text-align: center;'>PRE-REQUISITE\n(COMPLETED)</td></tr>";
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
    document.getElementById("viewTable").style.display="table-cell";
}
// check ID

// window.onload = function() {

      
//     }

function checkID()
{   console.log("CheckID");
    var unit=document.getElementById("Unit").value;
    var studentID=document.getElementById("result").innerText;
    console.log(document.getElementById("Unit").value);
    console.log(document.getElementById("result").innerText);
    if (unit!=""||studentID!="")
    {
        // AJAX call
        //if else 
        alert("Student has completed the pre-requisites for the unit:"+unit);
    }
    
}