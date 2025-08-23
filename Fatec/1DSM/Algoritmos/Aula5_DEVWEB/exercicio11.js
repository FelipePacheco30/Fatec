matriz = [
    [9, 2, 4],
    [6, 5, 7],
    [2, 1, 3],
  ];
  
  i = 0;
  soma = 0;
  while( i < matriz.length ){
      j = 0;
      while( j < matriz[i].length ){
        soma = soma + matriz[i][j];
        j = j + 1;
      }
      i = i + 1;
  }
  console.log("Somatório:", soma);