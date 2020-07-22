const mysql = require('mysql2');

// create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'manojksh'
});
var journalArray = [];
connection.query(
  'SELECT * FROM diary_journal_test ORDER BY id DESC',
  function (err, results, fields) {
    journalArray = results;
  }
);
module.exports = {
  allJournal,
  addJournal,
  updateJournal,
  deleteJournal,
  getJournal,
  records
};
async function getJournal(req, res) {
  let queryabc="select * from diary_journal_test ORDER BY id DESC LIMIT "+ req.body.limitStartPageNo +","+req.body.limitEndPageNo;
  const promisePool = connection.promise();
  const[rows , fields] = await promisePool.query(queryabc);
  return rows
};
async function allJournal(req, res) {
  const promisePool = connection.promise();
  let result={
    "totalsrecords":0,
    "weekly":0,
    "monthly":0,
    "data":[]
  };
  const totalsrecords = await promisePool.query("select Count(*) as Total from diary_journal_test ORDER BY createddate DESC");
    const monthlyrecords = await promisePool.query("select Count(*) as Total from diary_journal_test  WHERE MONTH(createddate) = MONTH(CURRENT_DATE()) AND YEAR(createddate) = YEAR(CURRENT_DATE())");
    const weeklyrecords = await promisePool.query("select Count(*) as Total from diary_journal_test  WHERE YEARWEEK(createddate) = YEARWEEK(NOW())");
  const[rowsData] = await promisePool.query("select * from diary_journal_test ORDER BY id DESC");
   result.totalsrecords= totalsrecords[0][0].Total;
   result.weekly= weeklyrecords[0][0].Total;
   result.monthly= monthlyrecords[0][0].Total;
   result.data=rowsData;
  return result;
};
async function addJournal(req, res) {
  const promisePool = connection.promise();
  let query = await promisePool.query("INSERT INTO diary_journal_test (textitem, submitdate ) VALUES ('" + req.body.textitem + "','" + req.body.date + "')");
  return query;
};
async function records(req, res) {
  let result={
    "totalsrecords":0,
    "weekly":0,
    "monthly":0
  };
  const promisePool = connection.promise();
  const totalsrecords = await promisePool.query("select Count(*) as Total from diary_journal_test ORDER BY createddate DESC");
    const monthlyrecords = await promisePool.query("select Count(*) as Total from diary_journal_test  WHERE MONTH(createddate) = MONTH(CURRENT_DATE()) AND YEAR(createddate) = YEAR(CURRENT_DATE())");
    const weeklyrecords = await promisePool.query("select Count(*) as Total from diary_journal_test  WHERE YEARWEEK(createddate) = YEARWEEK(NOW())");
   result.totalsrecords= totalsrecords[0][0].Total;
   result.weekly= weeklyrecords[0][0].Total;
   result.monthly= monthlyrecords[0][0].Total;
  return result
};
async function updateJournal(req, res) {
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

  const promisePool = connection.promise();
   let queryupdate= "UPDATE diary_journal_test SET textitem = " + "'"+ req.body.textitem + "'"+ " , updateddate = " + "'"+ timeUpdated + "'"+ "   WHERE id =  " + req.body.id ;
  await connection.execute(queryupdate);
  const[rows , fields] = await promisePool.query("select * from diary_journal_test ORDER BY id DESC LIMIT 0,20");
  return rows
};
async function deleteJournal(req, res) {
  const promisePool = connection.promise();
   let querydelete= "DELETE FROM diary_journal_test  WHERE id =  " + req.body.id ;
  await connection.execute(querydelete);
  const[rows , fields] = await promisePool.query("select * from diary_journal_test ORDER BY id DESC LIMIT 0,20");
  return rows
};

// async function getempolyeesbyId(req, res) {
//   let result = [];
//   if (req != 0) {
//     const emp = empolyees.find(u => u.id == req);

//     result.push({
//       "id": emp.id,
//       "first_name": emp.first_name,
//       "last_name": emp.last_name,
//       "email": emp.email
//     })

//     return result;
//   }
//   else {
//     for (let i = 0; i < empolyees.length; i++) {
//       result.push({
//         "id": empolyees[i].id,
//         "first_name": empolyees[i].first_name,
//         "last_name": empolyees[i].last_name,
//         "email": empolyees[i].email
//       })
//     }

//     return result;
//   }



// };
