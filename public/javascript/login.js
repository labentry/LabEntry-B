var data;
$(document).ready(function () {
    $.get('/getLoginData', function (result) {
        data = result.users;
        console.log(data);
    });
    
});
function checkLoginDetails(username, password) {
    console.log(data.length);
    for (var i = 0; i < data.length; i++) {
        if (data[i].user == username.value) {
            if (data[i].password == password.value) {
                console.log("Successfully Logged in");
                window.location.href = '/unitsInfo';

            }
            else {
                console.log("Either Wrong username or password");
            }
        }

    }
}
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
        "crossDomain": true,
        "url": "https://anypoint.mulesoft.com/mocking/api/v1/links/8916e3ea-2e5d-4fdc-8a75-951ea62b9ef2/assessmentResults?unitCode=SIT740&studentId=56127843",
        "method": "GET",
        "headers": {
          "client_id": "abc",
          "client_secret": "abc",
          "cache-control": "no-cache",
          "postman-token": "d8adc39e-8b04-ee20-517a-d4cee198fb51",
          "Access-Control-Allow-Origin":"*"
        }
      }
      
      $.ajax(settings).done(function (response) {
        console.log(response);
      });
}
