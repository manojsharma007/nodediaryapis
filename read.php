<?php

header("Content-Type: application/json; charset=UTF-8");

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
  $stmt = $journal->read();
  $count = $stmt->rowCount();
  if($count > 0){
    $stmt1 = $journal->monthty();
    $count1 = $stmt1->rowCount();
    $stmt2 = $journal->week();
    $count2 = $stmt2->rowCount();
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

?>
