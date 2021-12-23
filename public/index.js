//Here we're importing items we'll need. You can add other imports here.
import "./style.css";
import "regenerator-runtime/runtime.js";

var table;

// exposing loadData to FileMaker Script
window.loadData = function (json) {
  console.log(json);
  var obj = JSON.parse(json); // data from FM is a string
  var data = obj.data;
  console.log(obj);
    // return;
  // create column headers from data
    var columns = [
    { data: "fieldData.id", title: "ID", visible: false },
    { data: "fieldData.MasterExamComponentName", title: "Exam Component" },
    { data: "fieldData.APPLICANT::applicantNameFirst", title: "First Name" },
    { data: "fieldData.APPLICANT::applicantNameLast", title: "Last Name" },
    { data: "fieldData.EMPLOYER::companyName", title: "Client" },
    { data: "fieldData.EXAM::examExamType", title: "Exam Type" },
    { data: "fieldData.flag_exception", title: "Exception" },
    { data: "fieldData.bluesheetlineitemCompletedByAccountName", title: "Completed By"},
    { data: "fieldData.bluesheetlineitemCompleteOnTimeStamp", title: "Completed On"},
  ];

  console.log(columns);
  // Create the DataTable, after destroying it if already exists
  if (table) table.destroy();
  //query div with dtable tag and render data into DataTable
  table = $("#dtable").DataTable({
    paging: true,
    pageLength: 20,
    searching: true,
    colReorder: true,
    //adding export buttons to save time crafting custom filemaker exports
    buttons: ['copy', 'excel'],
    //columns are vital! These are your data table header rows
    columns: columns,
    //Duh, this is your data
    data: data,
  });

  // Add the click handler to the row, after removing it if already exists
  $("#dtable tbody").off("dblclick");
  $("#dtable tbody").on("dblclick", "tr", function () {
    var record = table.row(this).data();
    var json = JSON.stringify(record);

    FileMaker.PerformScript("On Double Click Row", json);
  });
}