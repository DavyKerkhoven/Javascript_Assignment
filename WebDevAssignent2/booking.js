/*
 * @author: Davy Kerkhoven
 * ID: 14882018
 * Web Development Assignment 2
 * 
 * These are the javascript functions for the booking.html webpage
 */

//Create the XMLHttpRequest object:
var xHRObject = false;
if (window.XMLHttpRequest)
{
    xHRObject = new XMLHttpRequest();
}
else if (window.ActiveXObject)
{
    xHRObject = new ActiveXObject("Microsoft.XMLHTTP");
}

/**
 * This function dynamically changes the web form area of the 
 * booking.html page to go to the next step of the booking process.
 * It saves the previous form inputs as hidden form inputs in this step.
 */
function step2()
{
    //the body of text that will be changed dynamically
    var innerbody = document.getElementById("innerbody");
    
    //form details that need to be passed on to the new body as hidden fields
    var address = document.getElementById("pickupAddr").value;
    var destination = document.getElementById("destinationAddr").value;
    var date = document.getElementById("date").value;
    var hour = document.getElementById("hour").value;
    var minute = document.getElementById("minute").value;
    var ampm = document.getElementById("ampm").value;
    
    innerbody.innerHTML = 
            "<form onsubmit=\"confirm()\">\n\
            <label>First Name</label>\n\
            <br><input type=\"text\"  id=\"fName\" required><br>\n\
            <br><label>Surname</label>\n\
            <br><input type=\"text\" id=\"lName\" required><br>\n\
            <br><label>Contact Phone Number</label>\n\
            <br><input type=\"text\" id=\"number\" required><br>\n\
            <input type =\"hidden\" id=\"address\" value=\""+address+"\">\n\
            <input type =\"hidden\" id=\"destination\" value=\""+destination+"\">\n\
            <input type =\"hidden\" id=\"date\" value=\""+date+"\">\n\
            <input type =\"hidden\" id=\"hour\" value=\""+hour+"\">\n\
            <input type =\"hidden\" id=\"minute\" value=\""+minute+"\">\n\
            <input type =\"hidden\" id=\"ampm\" value=\""+ampm+"\">\n\
            <br><input type=\"submit\" class=\"button\" value=\"Confirm\">\n\
            </form>";
}

/**
 * Gathers all the data input by the user and sends it tothe server
 * to be stored.
 */
function confirm()
{
    //the body of text that will be changed dynamically
    var innerbody = document.getElementById("innerbody");
    
    var fName = encodeURIComponent(document.getElementById("fName").value);
    var lName = encodeURIComponent(document.getElementById("lName").value);
    var number = encodeURIComponent(document.getElementById("number").value);
    var pickUpAdd = encodeURIComponent(document.getElementById("address").value);
    var destination = encodeURIComponent(document.getElementById("destination").value);
    var date = encodeURIComponent(document.getElementById("date").value);
    var hour = encodeURIComponent(document.getElementById("hour").value);
    var minute = encodeURIComponent(document.getElementById("minute").value);
    var ampm = encodeURIComponent(document.getElementById("ampm").value);
    
    innerbody.innerHTML = "Confirming...";
    
    var url = "booking.php?fName="+fName+"&lName="+lName+"&number="+number+"&pickUpAdd="+pickUpAdd+"&destination="+destination+"&date="+date+"&hour="+hour+"&minute="+minute+"&ampm="+ampm;
    xHRObject.open("GET", url, true);
    xHRObject.onreadystatechange = getData;
    xHRObject.send(null);
}

/**
 * This is the reply from the server for confirm().
 * It gives confirmation to the user that their booking has been
 * saved and lets them know what their reference number is.
 */
function getData()
{
    if((xHRObject.readyState === 4) && (xHRObject.status === 200))
    {
        var innerbody = document.getElementById("innerbody");
        var serverResponse = xHRObject.responseXML;
        innerbody.innerHTML = "Thank You!";
        
        if (serverResponse !== null)
        {
            var header = serverResponse.getElementsByTagName("booking");
            for (i=0; i<header.length; i++)
            {
                var reference = header[i].firstChild;
                var date = reference.nextSibling;
                var time = date.nextSibling;
                if (window.ActiveXObject)
                {
                    
                    innerbody.innerHTML += "<br> Your reference number is: " + reference.text;
                    innerbody.innerHTML += "<br> You will be picked up in front of your provided address at: " + time.text + " on " + date.text;                }
                else
                {
                    innerbody.innerHTML += "<br> Your reference number is: " + reference.textContent;
                    innerbody.innerHTML += "<br> You will be picked up in front of your provided address at: " + time.textContent + " on " + date.textContent;
                }
                innerbody.innerHTML += "<br><br><a href=\"booking.html\">Home</a>";
            }
        }
    }
}


/**
 * This function has one problem, it does not take into 
 * consideration different timezone. Therefore 'yesterday' swithces
 * over to 'today' at about noon of tody.
 * @returns {undefined}
 */
function setTodaysDate()
{
    var today = new Date().toISOString().split('T')[0];
  
    document.getElementById("date").setAttribute('min', today);
    document.getElementById("date").value = today;
}