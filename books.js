$(document).ready(function(){
	$.ajax({
		url:"https://docs.google.com/spreadsheets/d/e/2PACX-1vTmgEqTF0aRgK2DQpVDrEZd-Dt9n1RLp6xR6GZ2LOWdW1hnIWd6HawsXrq9vTr8ACU0UVapyIb76ZgR/pub?gid=1713242840&single=true&output=csv",
		dataType:"text",
		success:function(data){
			var employee_data = data.split(/\r?\n|\r/);
			var table_data = '<table class="table table-bordered table-striped table-sm" cellspacing="0" id="books">';
			for(var count = 0; count<employee_data.length; count++){
				var cell_data = employee_data[count].split(",");
				if(count < 11)continue;
				if(count ===11){table_data += '<thead class ="thead-dark">'}
				else table_data += '<tr>';
				for(var cell_count=0; cell_count<cell_data.length; cell_count++){
					if(count ===11){
						table_data += '<th scope="col" class = "th-sm">'+cell_data[cell_count]+'</th>';
					}
					else{
						table_data += '<td>'+cell_data[cell_count]+'</td>';
					}
				}
				if(count ===11){table_data += '</thead'}
				table_data += '</tr>';
			}
			table_data += '</table>';
			$('#app').html(table_data);
		}
	});
	
})

window.onload = function(){ 
	$('#books').DataTable();
	$('.dataTables_length').addClass('bs-select');
	console.log(1);
} 
