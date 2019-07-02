var book;
$(document).ready(function(){	

	$.get("https://docs.google.com/spreadsheets/d/e/2PACX-1vTmgEqTF0aRgK2DQpVDrEZd-Dt9n1RLp6xR6GZ2LOWdW1hnIWd6HawsXrq9vTr8ACU0UVapyIb76ZgR/pub?gid=1713242840&single=true&output=csv", function (data) {
		book = JSON.parse(csvJSON(data));
		$(book).each(function (k, v) {
			//console.log(v);
		})
		list();
    })
})

function list(){
	$('#books').bootstrapTable({	
		toolbar:'#toolbar',
		clickToSelect:true,	
		sortName: "Item",
		sortOrder: "desc",
		pageNumber: 1,
		pageSize: 20,
		pageList: "[20, 50, 100, 200, All]",
		showToggle: true,
		showRefresh: true,
		showColumns: true,
		undefinedText: 'N/A',
		search: true,
		pagination: true,
		columns: [{
			field: "check",
			checkbox:true,
		},{
			field: 'Item',
			title: 'Item',
			switchable: true,
			sortable: true
		}, {
			field: 'Total',
			title: 'Total',
			switchable: true,
			sortable: false
		}, {
			field: '收納位置',
			title: '收納位置',
			switchable: true,
			sortable: true
		}, {
			field: '借閱狀態',
			title: '借閱狀態',
			switchable: true
		}, {
			field: 'Note',
			title: 'Note',
			switchable: true
		}], 
	data: book,	
	});
	
	$('#books').bootstrapTable('refreshOptions', {
        theadClasses: "thead-dark",
		iconSize: 'sm'
     })
}



function csvJSON(csv){
  var lines=csv.split("\n");
  var result = [];
  var headers=lines[11].split(",");
  for(var i=12;i<lines.length;i++){
	  var obj = {};
	  var currentline=lines[i].split(",");
	  for(var j=0;j<headers.length;j++){
		  obj[headers[j]] = currentline[j];
	  }
	  result.push(obj);
  }  
  //return result; //JavaScript object
  return JSON.stringify(result); //JSON
}