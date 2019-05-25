
        if(!check) {
            document.getElementById("error").style.display="Block";
            
        }
    });

});

function callApi() {
    
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
