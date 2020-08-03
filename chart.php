<?php

header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once './dbclass.php';
include_once './journal.php';

$dbclass = new DBClass();
$connection = $dbclass->getConnection();
  $journal = new Journal($connection);
  $data = json_decode(file_get_contents("php://input"));
$journal->token = $data->token;
if($data->token!="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"){
  echo "You are not authorize";
}
else {
    $stmt = $journal->chartYearly();
  }
?>
