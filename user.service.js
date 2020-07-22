// get the client
 const mysql = require('mysql2/promise');
 // create the connection
 

module.exports = {
  allJournal,
  addJournal,
  updateJournal,
  deleteJournal
};
// Need to change in live serve
const hostname="localhost";
const dbUsername="root";
const databaseName = "manojksh"
const tableName = "diary_journal_test";


async function allJournal() {
  const connection = await mysql.createConnection({host:hostname, user: dbUsername, database: databaseName});
  let result={
    "totalsrecords":0,
    "weekly":0,
    "monthly":0,
    "data":[]
  };
 
  const totalsrecords = await connection.execute("select Count(*) as Total from " + tableName + " ORDER BY createddate DESC");
  const monthlyrecords = await connection.execute("select Count(*) as Total from " + tableName + "  WHERE MONTH(createddate) = MONTH(CURRENT_DATE()) AND YEAR(createddate) = YEAR(CURRENT_DATE())");
  const weeklyrecords = await connection.execute("select Count(*) as Total from " + tableName + "  WHERE YEARWEEK(createddate) = YEARWEEK(NOW())");
  const[rowsData] = await connection.execute("select * from " + tableName + " ORDER BY id DESC");
   result.totalsrecords= totalsrecords[0][0].Total;
   result.weekly= weeklyrecords[0][0].Total;
   result.monthly= monthlyrecords[0][0].Total;
   result.data=rowsData;
   return result;
};

async function addJournal(req, res) {
  const connection = await mysql.createConnection({host:hostname, user: dbUsername, database: databaseName});
   // query database
   let query1 = "INSERT INTO " + tableName + " (textitem, submitdate ) VALUES ('" + req.body.textitem + "','" + req.body.date + "')";
    await connection.execute(query1);

      let result={
        "totalsrecords":0,
        "weekly":0,
        "monthly":0,
        "data":[]
      };     
      const totalsrecords = await connection.execute("select Count(*) as Total from " + tableName + " ORDER BY createddate DESC");
      const monthlyrecords = await connection.execute("select Count(*) as Total from " + tableName + "  WHERE MONTH(createddate) = MONTH(CURRENT_DATE()) AND YEAR(createddate) = YEAR(CURRENT_DATE())");
      const weeklyrecords = await connection.execute("select Count(*) as Total from " + tableName + "  WHERE YEARWEEK(createddate) = YEARWEEK(NOW())");
      const[rowsData] = await connection.execute("select * from " + tableName + " ORDER BY id DESC");
       result.totalsrecords= totalsrecords[0][0].Total;
       result.weekly= weeklyrecords[0][0].Total;
       result.monthly= monthlyrecords[0][0].Total;
       result.data=rowsData;
       return result;  
};
async function updateJournal(req, res) {
  const connection = await mysql.createConnection({host:hostname, user: dbUsername, database: databaseName});
   // query database
   const submitDate = new Date();
   const dateTimeFormat = new Intl.DateTimeFormat("en", {
     year: "numeric",
     month: "numeric",
     day: "2-digit"
   });
   const [
     { value: month },
     ,
     { value: day },
     ,
     { value: year }
   ] = dateTimeFormat.formatToParts(submitDate);
   const timeUpdated = `${year}-${month}-${day}`;
   let query1= "UPDATE " + tableName + " SET textitem = " + "'"+ req.body.textitem + "'"+ " , updateddate = " + "'"+ timeUpdated + "'"+ "   WHERE id =  " + req.body.id ;
    await connection.execute(query1);

      let result={
        "totalsrecords":0,
        "weekly":0,
        "monthly":0,
        "data":[]
      };     
      const totalsrecords = await connection.execute("select Count(*) as Total from " + tableName + " ORDER BY createddate DESC");
      const monthlyrecords = await connection.execute("select Count(*) as Total from " + tableName + "  WHERE MONTH(createddate) = MONTH(CURRENT_DATE()) AND YEAR(createddate) = YEAR(CURRENT_DATE())");
      const weeklyrecords = await connection.execute("select Count(*) as Total from " + tableName + "  WHERE YEARWEEK(createddate) = YEARWEEK(NOW())");
      const[rowsData] = await connection.execute("select * from " + tableName + " ORDER BY id DESC");
       result.totalsrecords= totalsrecords[0][0].Total;
       result.weekly= weeklyrecords[0][0].Total;
       result.monthly= monthlyrecords[0][0].Total;
       result.data=rowsData;
       return result;  
};
async function deleteJournal(req, res) {
  const connection = await mysql.createConnection({host:hostname, user: dbUsername, database: databaseName});
   // query database
   let query1 =  "DELETE FROM " + tableName + "  WHERE id =  " + req.body.id ;
    await connection.execute(query1);
      let result={
        "totalsrecords":0,
        "weekly":0,
        "monthly":0,
        "data":[]
      };     
      const totalsrecords = await connection.execute("select Count(*) as Total from " + tableName + " ORDER BY createddate DESC");
      const monthlyrecords = await connection.execute("select Count(*) as Total from " + tableName + "  WHERE MONTH(createddate) = MONTH(CURRENT_DATE()) AND YEAR(createddate) = YEAR(CURRENT_DATE())");
      const weeklyrecords = await connection.execute("select Count(*) as Total from " + tableName + "  WHERE YEARWEEK(createddate) = YEARWEEK(NOW())");
      const[rowsData] = await connection.execute("select * from " + tableName + " ORDER BY id DESC");
       result.totalsrecords= totalsrecords[0][0].Total;
       result.weekly= weeklyrecords[0][0].Total;
       result.monthly= monthlyrecords[0][0].Total;
       result.data=rowsData;
       return result;  
};