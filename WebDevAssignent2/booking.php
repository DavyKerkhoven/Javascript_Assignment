<?php
header('Content-Type: text/xml');
?>
<?php
    //get all the form data:
    $fName = $_GET["fName"];
    $lName = $_GET["lName"];
    $number = $_GET["number"];
    $pickUpAdd = $_GET["pickUpAdd"];
    $destination = $_GET["destination"];
    $date = $_GET["date"];
    $hour = $_GET["hour"];
    $minute = $_GET["minute"];
    $ampm = $_GET["ampm"];
    
    //format time:
    if ($ampm == "pm")
    {
        if($hour < 12)
        {
            $hour = $hour + 12;
        } 
    }
    $time = "".$hour.":".$minute.":00";
    
    //get connecion to the database
    include("../../conf/settings.php");
    $connection = mysqli_connect($host, $user, $pswd, $dbnm);

    if(!$connection)
    {
            echo "connection error";
    }
    
    //todays date:
    $todaysDate = date("d-m-Y h:i:sa");
    
    //insert new record into the DB:
    $sqlString = "INSERT INTO Bookings (FName, LName, BookingTime, Status, ContactNum, PickupAddr, DestinationAddr, PickupDate, PickupTime)"
            . " VALUES ('$fName', '$lName', '$todaysDate', \"unassigned\", '$number', '$pickUpAdd', '$destination', '$date', '$time') ";
    $result = mysqli_query($connection, $sqlString);
    
    if ($result)
    {
            //echo("Record inserted successfully!");
    } else 
    {
            echo("Something went wrong, the record was not inserted!");
    }
    
    $sqlString = "SELECT * FROM Bookings WHERE Reference = (SELECT MAX(Reference) FROM Bookings)";
    $result = mysqli_query($connection, $sqlString);
    
    if ($result->num_rows > 0)
    {
        //get data of latest entry
        while($row = $result->fetch_assoc())
        {
            //get all the form data:
            $reference = $row["Reference"];
            $date = $row["PickupDate"];
            $time = $row["PickupTime"];
            
            $doc = new DomDocument('1.0');
            $booking = $doc->createElement('booking');
            $doc->appendChild($booking);
            
            $XML_ref = $doc->createElement('reference');
            $XML_ref = $booking->appendChild($XML_ref);
            $value_ref = $doc->createTextNode($reference);
            $value_ref = $XML_ref->appendChild($value_ref);

            $XML_date = $doc->createElement('date');
            $XML_date = $booking->appendChild($XML_date);
            $value_date = $doc->createTextNode($date);
            $value_date = $XML_date->appendChild($value_date);
            
            $XML_time = $doc->createElement('time');
            $XML_time = $booking->appendChild($XML_time);
            $value_time = $doc->createTextNode($time);
            $value_time = $XML_time->appendChild($value_time);
           
            
            $strXml = $doc->saveXML();
            ECHO $strXml;
        }
    }
?>