/*
 * @author: Davy Kerkhoven
 * ID: 14882018
 * Web Development Assignment 2
 * 
 * These are the javascript functions for the admin.html webpage
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
 * Requests the server to get all bookings that are unassigned
 * and are due to be picked up within 2 hours.
 */
function showBookings()
{
    var leftBody = document.getElementById("leftBody");
    leftBody.innerHTML = "Processing...";
    
    var url = "admin.php?action=showBookings";
    xHRObject.open("GET", url, true);
    xHRObject.onreadystatechange = getData;
    xHRObject.send(null);
}

/**
 * Sends the reference number to the server so that the
 * server can search for that booking and change the status
 * from unassigned to assigned
 */
function assignTaxi()
{
    var rightBody = document.getElementById("rightBody");
    var ref = document.getElementById("assign");
    rightBody.innerHTML = "Assigning...";
    
    var value = ref.value;
    var reference = encodeURIComponent(value);
    
    
    var url = "admin.php?action=assignTaxi&reference="+reference;
    xHRObject.open("GET", url, true);
    xHRObject.onreadystatechange = getData2;
    xHRObject.send(null);
    
}

/**
 * This is the reply from the server when it has got
 * the data for showBookings(). The data is returned as a JSON
 * and put into a table which is then passed back to the admin.html page.
 */
function getData()
{
    if((xHRObject.readyState === 4) && (xHRObject.status === 200))
    {
        var leftBody = document.getElementById("leftBody");
        leftBody.innerHTML = "<button onclick=\"showBookings()\">Show Bookings</button>";
        
        var serverResponse = JSON.parse(xHRObject.responseText);
        
        //get the table headings:
        var col = [];
        for (var key in serverResponse[0])
        {
            if (col.indexOf(key) === -1)
            {
                col.push(key);
            }
        }
        
        //create table
        var table = document.createElement("table");
        
        //create table headings
        var tr = table.insertRow(-1);
        
        for (var i = 0; i < col.length; i++)
        {
            var th = document.createElement("th");
            th.innerHTML  = col[i];
            tr.appendChild(th);
        }
        
        //add JSON data to the table rows
        for (var i = 0; i < serverResponse.length; i++)
        {
            tr = table.insertRow(-1);
            
            for (var j = 0; j < col.length; j++)
            {
                var tabcell = tr.insertCell(-1);
                tabcell.innerHTML = serverResponse[i][col[j]];
            }
        }
        
        //put the table on the webpage
        if (serverResponse !== null)
        {               
            if (window.ActiveXObject)
            {
                leftBody.appendChild(table);
            }
            else
            {
                leftBody.appendChild(table);
            }           
        }
        else
        {
            leftBody.innerHTML += "The serverResponse was null!!";
        }
        
    }
}

/**
 * This is the reply from the server for the assignTaxi() function.
 * Its purpose is to let the webpage know if the assignment of a Taxi
 * to a booking has been successful or not.
 */
function getData2()
{
    if((xHRObject.readyState === 4) && (xHRObject.status === 200))
    {
        var rightBody = document.getElementById("rightBody");
        
        var serverResponse = JSON.parse(xHRObject.responseText);
        
        if (serverResponse !== null)
        {                
            if (window.ActiveXObject)
            {
                rightBody.innerHTML = "<br> " + serverResponse[0] + "!<br>";
            }
            else
            {
                rightBody.innerHTML = "<br> " +serverResponse[0] + "!<br>";
            }            
        }
        else
        {
            rightBody.innerHTML = "The serverResponse was null!!<br>";
        }
        
        rightBody.innerHTML += "<form onsubmit=\"assignTaxi()\" ><br>"
                                 +"<label>Assign Taxi to:</label><input type=\"text\" value=\"reference number here\" id=\"assign\" style=\"margin-left: 50px;\" ><input type=\"submit\" value=\"Assign\" />"
                                +"</form>";
        
        //update the table:
        showBookings();
    }
}