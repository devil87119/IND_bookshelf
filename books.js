$(document).ready(function(){	
	$('#table').bootstrapTable({
	ajax : function (request) {
        $.ajax({
            type : "GET",
            url : "https://docs.google.com/spreadsheets/d/e/2PACX-1vQK1TZGw4XSS_FLgdZRRvGEb6Tkv9iUNy9tvQxsctlM4wg0-O49H0AgR3eUkyHS7J0-ClwsYui1r6HL/pub?gid=2091510606&single=true&output=csv",
			contentType: "application/json;charset=utf-8",
			dataType:"jsonp",
			data:'',
			jsonp:'callback',
            success : function (data) {			
				request.success({
                    row : data
                });
                $('#books').bootstrapTable('load', data);
            },
			error:function(){
				alert("错误");
			}
        });
	},
		
		toolbar:'#toolbar',
		singleSelect:true,
		clickToSelect:true,	
		sortName: "Item",
		sortOrder: "desc",
		pageSize: 15,
		pageNumber: 1,
		pageList: "[10, 25, 50, 100, All]",
		showToggle: true,
		showRefresh: true,
		showColumns: true,
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
			switchable: true
		}, {
			field: 'position',
			title: '收納位置',
			switchable: true,
			sortable: true
		}, {
			field: 'state',
			title: '借閱狀態',
			switchable: true
		}, {
			field: 'Note',
			title: 'Note',
			switchable: true
		}],
 
	});
})