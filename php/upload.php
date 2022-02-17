<?php
  $file_name = $_FILES['file']['name']; // getting file name
  $tmp_name = $_FILES['file']['tmp_name']; // getting temporary file name of the file
  $file_up_name = time() . $file_name; // rename the file and make it unique by adding time before the file name
  move_uploaded_file($tmp_name, 'uploads/' . $file_up_name); // move the file to the uploads folder