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
			width: '60%',
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
	$('#books').bootstrapTable('hideColumn', 'Note');
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
		//console.log(row);
		//console.log($element);
		//$($element).siblings().removeClass('custom--select');
		//$($element).addClass('custom--select');
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
		console.log(row);
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
