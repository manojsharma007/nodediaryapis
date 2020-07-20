const mysql = require('mysql2');

// create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'manojksh_sub'
});
var journalArray = [];
connection.query(
  'SELECT * FROM diary_journal_test ORDER BY createddate DESC',
  function (err, results, fields) {
    journalArray = results;
  }
);
module.exports = {
  allJournal,
  addJournal,
  updateJournal,
  deleteJournal,
  getJournal
};
async function getJournal(req, res) {
  console.log(req.body.limitStartPageNo);
    console.log(req.body.limitEndPageNo);
  let queryabc="select * from diary_journal_test ORDER BY createddate DESC LIMIT "+ req.body.limitStartPageNo +","+req.body.limitEndPageNo;
console.log(queryabc);
  const promisePool = connection.promise();
  const[rows , fields] = await promisePool.query(queryabc);
  return rows
};
async function allJournal(req, res) {
  const promisePool = connection.promise();
  const[rows , fields] = await promisePool.query("select * from diary_journal_test ORDER BY createddate DESC");
  return rows
};
async function addJournal(req, res) {
  const promisePool = connection.promise();
  let query = "INSERT INTO diary_journal_test (textitem, submitdate ) VALUES ('" + req.body.textitem + "','" + req.body.date + "')";
  await connection.execute(query);
  const[rows , fields] = await promisePool.query("select * from diary_journal_test ORDER BY createddate DESC");
  return rows
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
  const[rows , fields] = await promisePool.query("select * from diary_journal_test ORDER BY createddate DESC");
  return rows
};
async function deleteJournal(req, res) {
  const promisePool = connection.promise();
   let querydelete= "DELETE FROM diary_journal_test  WHERE id =  " + req.body.id ;
   console.log(querydelete)
  await connection.execute(querydelete);
  const[rows , fields] = await promisePool.query("select * from diary_journal_test ORDER BY createddate DESC");
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
