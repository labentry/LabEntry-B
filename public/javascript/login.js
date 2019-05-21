var data;
$(document).ready(function () {
    // Brings the username and password from db
    $.get('/getLoginData', function (result) {
        data = result.users;
        console.log(data);
    });
    // Form to submit
    $("#login_form").submit(function(e){
        e.preventDefault();
        var username= document.getElementById("username").value;
        var password= document.getElementById("password").value;
        for (var i = 0; i < data.length; i++) {
            if (data[i].user == username) {
                if (data[i].password == password) {
                    console.log("Successfully Logged in");
                    window.location.href = '/unitsInfo';
                }
                else {
                    document.getElementById("error").style.display="Block";
                    console.log("Either Wrong username or password");
                }
            }
    
        }
    });

});

function callApi() {
    // $.ajax({
    //     url: 'https://anypoint.mulesoft.com/mocking/api/v1/links/8916e3ea-2e5d-4fdc-8a75-951ea62b9ef2/assessmentResults',
    //     type: 'GET',
    //     data: { "unitCode": "SIT740", "studentId": "56127843" },
    //     headers: { "Content-Type": "application/json", 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Content-Type' },
    //     beforeSend : function( xhr ) {
    //         xhr.setRequestHeader( "client_id","abc");
    //         xhr.setRequestHeader( "client_secret","abc");
    //     },
    //     success: function (response) {
    //         // response
    //         console.log("API response:")
    //         console.log(response);
    //     }
    // }); 
    var settings = {
        "async": true,
        "url": "https://anypoint.mulesoft.com/mocking/api/v1/links/8916e3ea-2e5d-4fdc-8a75-951ea62b9ef2/assessmentResults?unitCode=SIT740&studentId=56127843",
        "method": "GET",
        "headers": {
          "client_id": "abc",
          "client_secret": "abc"
        }
      }
      
      $.ajax(settings).done(function (response) {
        console.log(response);
      });
}
