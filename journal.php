<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
class Journal{
    // table name
    public $table_name = "diary_journal_test";
    // Connection instance
    private $connection;
    public $id;
    public $submitdate;
    public $createddate;
    public $updateddate;
    public $textitem;
    public $location;

    public function __construct($connection){
        $this->connection = $connection;
    }
    public function read(){
        $query = "SELECT * FROM " . $this->table_name . " ORDER BY id DESC";
        $stmt = $this->connection->prepare($query);
        $stmt->execute();
        return $stmt;
    }
    public function create(){
        $query = "INSERT INTO " . $this->table_name . "(textitem, submitdate ,location ) VALUES ('" . $this->textitem . "','" . $this->submitdate . "','" . $this->location . "') ";
       $stmt = $this->connection->prepare($query);
        $stmt->execute();
        return $stmt;
    }
    public function update(){
        $query = "UPDATE " . $this->table_name . " SET textitem='" . $this->textitem . "' WHERE id =" . $this->id . " ";
        $stmt = $this->connection->prepare($query);
       $stmt->execute();
       return $stmt;
    }
    public function delete(){
        $query = "DELETE FROM " . $this->table_name . "  WHERE id =" . $this->id . " ";
        $stmt = $this->connection->prepare($query);
       $stmt->execute();
       return $stmt;
    }
    public function monthty(){
    $query = "SELECT * FROM " . $this->table_name . "  WHERE MONTH(createddate) = MONTH(CURRENT_DATE()) AND YEAR(createddate) = YEAR(CURRENT_DATE()) ";
        $stmt = $this->connection->prepare($query);
        $stmt->execute();
        return $stmt;
    }
    public function week(){
        $query = "SELECT * FROM " . $this->table_name . "  WHERE YEARWEEK(createddate) = YEARWEEK(NOW())";
        $stmt = $this->connection->prepare($query);
        $stmt->execute();
        return $stmt;
    }
  }

?>
