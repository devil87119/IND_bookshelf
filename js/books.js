var book;
$(document).ready(function(){

	$.get("https://cors-anywhere.herokuapp.com/https://docs.google.com/spreadsheets/d/e/2PACX-1vTvvXs2DBH_Tw4NNQ0NI7Hm3P5geMXXSwhiKq51ZiYQmsGjFkQ_UpbeMK6SVzllAiG6yfuXCZcTYBGL/pub?gid=0&single=true&output=csv", function (data) {
		book = JSON.parse(csvJSON(data));
		$(book).each(function (k, v) {
			//console.log(v);
		})
		list();
    })
})

function show_box(){
	if($('#fbox').hasClass('box_hide') ){
		$('#fbox').removeClass('box_hide');
		$('#fbox').addClass('box_show');
	}
	else {
		$('#fbox').removeClass('box_show');
		$('#fbox').addClass('box_hide');
	}
}

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
			title: "123",
			hideSelectAll: true,
			checkbox: true
		},{
			field: 'Item',
			title: '書名<span class = "imply">(先勾選要借的書，再按借書)<span>',
			width: '60%',
			switchable: true,
			sortable: true
		}, {
			field: 'Total',
			title: '個數',
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
		}],
	data: book,
	});
	$('#books').bootstrapTable('refreshOptions', {
        theadClasses: "thead-dark",
		iconSize: 'sm'
	})
	$('#books').on('click-row.bs.table', function (e, row, $element) {
		selectedRow = row;
		/*if($($element).hasClass('custom--select') ){
			$($element).removeClass('custom--select');
		}
		else{
			$($element).addClass('custom--select');
		}*/
		rowStyle(row, -1);
		//document.getElementById( "borrow1" ).innerHTML = JSON.stringify($('#books').bootstrapTable('getSelections'))
		//console.log(row);
		//console.log($element);
		//$($element).siblings().removeClass('custom--select');
		//$($element).addClass('custom--select');
	});
	var checkedRows = [];
	var now_select_books
	var show_books
	$('#books').on('check.bs.table', function (e, row) {
	  checkedRows.push({Item: row.Item});
		now_select_books = ""
		show_books = ""
	  $.each(checkedRows, function(index, value) {
	    now_select_books += value.Item+"，";// + " | " + value.forks
			show_books += "<li>" + value.Item + "</li>"
	  });
		document.getElementById( "borrow1" ).innerHTML = show_books;
		if(show_books === ""){
			document.getElementById( "borrow1" ).innerHTML = "目前並無選擇任何書喔!"
		}
		//document.getElementById( "borrow" ).value = now_select_books.slice(0, -1);// + " | " + value.forks
		//document.getElementById( "borrow1" ).innerHTML =checkedRows;
	  //console.log(checkedRows);
	});
	$('#books').on('uncheck.bs.table', function (e, row) {
	  $.each(checkedRows, function(index, value) {
	    if (value.Item === row.Item) {
	      checkedRows.splice(index,1);
				return;
	    }
	  });

			now_select_books = ""
			show_books = ""
		  $.each(checkedRows, function(index, value) {
		    now_select_books += value.Item+"，";// + " | " + value.forks
				show_books += "<li>" + value.Item + "</li>"
		  });
			document.getElementById( "borrow1" ).innerHTML = show_books;
			if(show_books === ""){
				document.getElementById( "borrow1" ).innerHTML = "目前並無選擇任何書喔!"
			}
			document.getElementById( "borrow" ).value = now_select_books.slice(0, -1);// + " | " + value.forks
	  //console.log(checkedRows);
	});

	$("#books").click(function() {
	  $("#output").empty();
		now_select_books = ""
		show_books = ""
	  $.each(checkedRows, function(index, value) {
	    now_select_books += value.Item+"，";// + " | " + value.forks
			show_books += "<li>" + value.Item + "</li>"
	  });
		document.getElementById( "borrow1" ).innerHTML = show_books;
		if(show_books === ""){
			document.getElementById( "borrow1" ).innerHTML = "目前並無選擇任何書喔!"
		}
		document.getElementById( "borrow" ).value = now_select_books.slice(0, -1);// + " | " + value.forks
	});
}
var checkAll = false;
var selectedRow = {};

function rowStyle(row, index) {
    var classes = [
      'bg_tr1',
      'bg_tr2 ',
    ]
	if (index == -1) {
		//console.log(row);
      return {
        classes: 'custom--select'
      }
    }
    else if (index % 2 === 0) {
      return {
        classes: classes[0]
      }
    }
	else {
		return {
        classes: classes[1]
      }
	}
  }

$(function() {
    $('#uncheckAll').click(function () {
      checkAll = false
      $('#table').bootstrapTable('uncheckAll')
    })
 })

$(function(){//custom search
	$(".search").append('<span class="glyphicon glyphicon-search"></span>');
	/* add the span inside search div with append box*/
});

function responseHandler(res) {
    res.rows.forEach(function (item) {
      item.state = checkAll
    })
	console.log(res)
    return res
}

(function ($) {//custom word
'use strict';
$.fn.bootstrapTable.locales['zh-CN'] = {
	formatLoadingMessage: function () {
		return '正在努力地載入資料中，請稍候……';
	},
	formatRecordsPerPage: function (pageNumber) {
		return '<span class = "page">每頁顯示 '+pageNumber+' 條記錄<br></span>';
	},
	formatShowingRows: function (pageFrom, pageTo, totalRows) {
		return '<span class = "page">顯示第 ' +  pageFrom  + ' 到第 ' +  pageTo  + ' 條記錄，總共 '+   totalRows +  ' 條記錄<span>';
	},
	formatSearch: function () {
		return '搜尋';
	},
	formatNoMatches: function () {
		return '沒有找到匹配的記錄';
	},
	formatPaginationSwitch: function () {
		return '隱藏/顯示分頁';
	},
	formatRefresh: function () {
		return '重新整理';
	},
	formatToggle: function () {
		return '切換';
	},
	formatColumns: function () {
		return '列';
	},
	formatFullscreen: function () {
		return '顯示欄位';
	}
};

$.extend($.fn.bootstrapTable.defaults, $.fn.bootstrapTable.locales['zh-CN']);
})(jQuery);

$(function() {
    $('#selected').click(function () {
      alert('getSelections: ' + JSON.stringify($('#books').bootstrapTable('getSelections')))
    })
})

function send_hint(){
		$('#hint').removeClass('hint_hide');
		$('#hint').addClass('hint_show');
		setTimeout("$('#hint').addClass('hint_hide')",2000);
		setTimeout("$('#hint').removeClass('hint_show')",2000);
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
