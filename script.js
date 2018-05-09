

$(document).ready(function(){
  var http = '';
  for(var i = 0; i < 9; i++){
    http += '<tr>'
    for(var j = 0; j < 9; j++){
      http += '<td><input type="text" class="form-control"></td>'
    }
    http += '</tr>'
  }

  $('table').append(http);

  var matrix = [];
  var isSolved = false;

  $('#solve').on('click', function(e){
    for(var i = 0; i < 9; i++){
      var array = [];
      for(var j = 0; j < 9; j++){
        var value = $('tr').eq(i).find('td').eq(j).find('input').val();
        if(value === ''){
          array.push({num: 0, set: false});
        }
        else{
          array.push({num: parseInt(value), set: true});
        }
      }
      matrix.push(array);
    }
    console.log(matrix);
    solve(0, 0);
  });

  
});
