

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

  $('#reset').on('click', function(){
    location.reload();
  });

  function setValue(){
    for(var i = 0; i < 9; i++){
      for(var j = 0; j < 9; j++){
        $('tr').eq(i).find('td').eq(j).find('input').val(matrix[i][j].num);
        if(matrix[i][j].set){
          $('tr').eq(i).find('td').eq(j).find('input').css({color: 'red'});
        }
        else{
          $('tr').eq(i).find('td').eq(j).find('input').css({color: 'blue'})
        }
      }
    }
  }

  function check(row, col, num){
    for(var c = 0; c < 9; c++){
      if(matrix[row][c].num === num){
        return false;
      }
    }

    for(var r = 0; r < 9; r++){
      if(matrix[r][col].num === num){
        return false;
      }
    }

    var newr = Math.floor((row / 3)) * 3;
    var newc = Math.floor((col / 3)) * 3;

    for(var r = newr; r < newr + 3; r++){
      for(var c = newc; c < newc + 3; c++){
        if(matrix[r][c].num === num){
          return false;
        }
      }
    }

    return true;
  }

  function solve(row, col){
    if(isSolved){
      return;
    }
    if(row === 9){
      isSolved = true;
      setValue();
      return;
    }
    if(matrix[row][col].set){
      if(col < 8){
        solve(row, col + 1);
      }
      else if(col === 8){
        solve(row + 1, 0);
      }
    }
    else{
      for(var i = 0; i < 9; i++){
        if(check(row, col, i+1)){
          matrix[row][col].num = i + 1;
          if(col < 8){
            solve(row, col + 1);
          }
          else if(col === 8){
            solve(row + 1, 0);
          }
          if(!isSolved){
            matrix[row][col].num = 0;
          }
        }
      }
    }
  }
});
