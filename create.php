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

  $journal->textitem = $data->textitem;
  $journal->submitdate = $data->submitdate;
  $journal->location = $data->location;

  if($journal->create()){
    $stmt = $journal->read();
    $count = $stmt->rowCount();

    $stmt1 = $journal->monthty();
    $count1 = $stmt1->rowCount();
    $stmt2 = $journal->week();
    $count2 = $stmt2->rowCount();
        if($count > 0){
            $journals = array();
            $journals["data"] = array();
            $journals["count"] = $count;
            $journals["monthly"] = $count1;
              $journals["week"] = $count2;

            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
                extract($row);
                $p  = array(
                      "id" => $id,
                      "textitem" => $textitem,
                      "submitdate" => $submitdate,
                      "createddate" => $createddate,
                      "updateddate" => $updateddate,
                      "location" => $location,
                );
                array_push($journals["data"], $p);
            }
            echo json_encode($journals);
        }
  }
  else{
      echo '{';
          echo '"message": "Unable to create Journal."';
      echo '}';
  }
}


?>
