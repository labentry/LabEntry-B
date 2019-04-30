var data;
$(document).ready(function(){
    $.get('/getLoginData',function(result){
        data=result.users;
        console.log(data);
    });
});
function checkLoginDetails(username, password)
{   
    console.log(data.length);
    for (var i = 0; i<data.length; i++) 
    {   
        if(data[i].user==username.value)
        {
            if(data[i].password==password.value)
            {   
                console.log("Successfully Logged in");
                window.location.href='/unitsInfo';
                
            }
            else
            {
                console.log("Either Wrong username or password");
            }
        }
        
    }
}