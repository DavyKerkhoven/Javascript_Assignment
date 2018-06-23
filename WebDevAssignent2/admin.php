
<?php 
//header('Content-Type: text/xml');
?>

<?php
    //get connecion to the database
    include("../../conf/settings.php");
    $connection = mysqli_connect($host, $user, $pswd, $dbnm);

    if(!$connection)
    {
            echo "connection error";
    }
    
    //get type of action
    $action = $_GET["action"];
    $currentDate = date('Y-m-j');
    $currentTime = date('H:i:s');
    $newTime = strtotime('+2 hour', strtotime($currentTime));
    $newTime = date('H:i:s', $newTime);
    
    if ($action == "showBookings")
    {
        //form the query
        $sqlString = "SELECT * FROM `Bookings` WHERE PickupTime <= '$newTime' AND PickupTime >= '$currentTime' AND PickupDate = '$currentDate'";

        //get the result of the query
        $result = mysqli_query($connection, $sqlString);
        
        //create an array
        $emparray = array();
        while($row =mysqli_fetch_assoc($result))
        {
            $emparray[] = $row;
        }
        echo json_encode($emparray);

        //close the db connection
        mysqli_close($connection);
    }
    else if ($action == "assignTaxi")
    {
        //get the reference number
        $reference = $_GET["reference"];

        $reply = array();

        $sqlString = "UPDATE Bookings SET Status = \"Assigned\" WHERE Reference = '$reference';";
        $result = mysqli_query($connection, $sqlString);
        if (mysqli_affected_rows($connection) > 0)
        {
            $reply[0] = "A taxi has been assigned to: " . $reference;
        }
        else 
        {
            $reply[0] = "There is no unassigned taxi with the reference number: " . $reference;
        }
        echo json_encode($reply);
        //close the db connection
        mysqli_close($connection);
   }
    
?>