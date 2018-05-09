

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

    if(validateInput()){
      solve(0, 0);
    }
    else{
      $('#message').html('Invalid input');
    }
  });

  function validateInput(){
    for(var i = 0; i < 9; i++){
      var row = [];
      for(var j = 0; j < 9; j++){
        row.push(0);
      }
      for(var j = 0; j < 9; j++){
        if(matrix[i][j].set){
          row[matrix[i][j].num - 1] += 1;
        }
      }
      for(var j = 0; j < 9; j++){
        if(row[j] > 1){
          return false;
        }
      }
    }
    for(var i = 0; i < 9; i++){
      var col = [];
      for(var j = 0; j < 9; j++){
        col.push(0);
      }
      for(var j = 0; j < 9; j++){
        if(matrix[j][i].set){
          col[matrix[j][i].num - 1] += 1;
        }
      }
      for(var j = 0; j < 9; j++){
        if(col[j] > 1){
          return false;
        }
      }
    }

    for(var i = 0; i < 9; i+=3){
      for(j = 0; j < 9; j+=3){
        var mat = [];
        for(var k = 0; k < 9; k++){
          mat.push(0);
        }
        for(var m = i; m < i + 3; m++){
          for(var n = j; n < j + 3; n++){
            if(matrix[m][n].set){
              mat[matrix[m][n].num - 1] += 1;
            }
          }
        }

        for(var k = 0; k < 9; k++){
          if(mat[k] > 1){
            return false;
          }
        }
      }
    }

    return true;
  }

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
