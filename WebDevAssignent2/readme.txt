LIST OF FILES:

admin.html
admin.js
admin.php
booking.css
booking.html
booking.js
booking.php
readme.txt
taxi.jpg

HOW TO USE BOOKING.HTML:

First start go to the bookings page.
Here you can enter anything for pick up address and destination address.
These are just saved as strings. I really tried to get address validation using the Google API
but I couldn't get it working.

The Date might be on today already. I found there is a bug where sometimes it is
still on yesterdays date, I think it has something to do with the different timezones.

The web page does not check if the time input is after the current time.
This is a required feature that I did not get around to doing.
VERY IMPORTANT: it is up to the user to input times that are after the current time
AND not more than 2 hours from the current time. Otherwise no bookings will be shown
in the admin page.

When the user is finished with the first step, click the button "Next Step".

Here the user only needs to put in the required fields of first name, last name
and contact number. All inputs are just saved as strings.

Then click the "confirm" button.

A confirmation message should appear with the reference number of the booking.
This reference is generated by the database auto incrementing the reference field
when the new record is inserted.

From here you can click the link "Home" to return to the start of the page to make
another booking.

NOTE: It is a nice idea to go back and add at least 3 entries. This will make the
table look nice in the admin page.

From any point you can go to the admin page by clicking the link in the top right corner.

HOW TO USE ADMIN.HTML:

It is a good idea to start by clicking the "Show Bookings" button.
This will display a table of all bookings that have a pick up time between
the current time and in 2 hours.

TROUBLE SHOOTING IF NO TABLE APPEARS:
This is most likely caused by making bookings with the wrong date/time.
You will need to go back to bookings.html and try making some new ones.
Make sure:
    1. that the date is set to todays date.
    2. that the time is set within the current time and 2 hours later.
    3. that the am/pm is set appropriately.

If there was no troubles, then a table should appear with a list of bookings.

With this displaying it will be easier to know which reference numbers to use
when assigning a taxi.

To assign a taxi simply add a reference number to the text box that says
"reference number here" and click the "Assign" button.

A bit of text should appear to confirm if a taxi has been successfully assigned or not.
If the assignment was unsuccessful: e.g. "There is no unassigned taxi with the reference number: 66!"
then this can be caused by one of two things:
    1. The reference number does not exist in the database.
    2. The reference number exists but that record's status is already set to "Assigned".

The table should update automatically.