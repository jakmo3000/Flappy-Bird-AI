class Matrix {
    static clone(matrix) {
        return {
            "rows": matrix.rows,
            "columns": matrix.columns,
            "data": Matrix.cloneData(matrix.data)
        };
    }

    static cloneData(data) {
        let newData = [];
        for (let i = 0; i < data.length; i++) {
            newData.push(data[i].slice());
        }
        return newData;
    }

    static createFromArray(arr)
    {
        let matrix = Matrix.create(arr.length,1,0);
    for(let i = 0; i < arr.length; i++)
    {
    matrix.data[i][0] =arr[i];
     }


    return matrix;
    }

    static arrayFromMatrix(matrix)
    { let arr = [];
        for(let i = 0; i < matrix.rows; i++)
        {
            for(let j = 0; j < matrix.columns; j++)
            {
               arr.push(matrix.data[i][j]); 
            }
        }
        return arr;
    }
    
    static mutate(matrix,rate)
    {
      let newMatrix = Matrix.clone(matrix);
      
      for (let i = 0; i < matrix.rows; i++) {
        for (let j = 0; j < matrix.cols; j++) {
         
          if(Math.random() < rate)
          {
            newMatrix.data[i][j] = Math.random()* 2-1;
          } 
      }
    }
      return newMatrix;
    }

    static newMatrix(rows, columns, data) {
        return {
            "rows": rows,
            "columns": columns,
            "data": Matrix.cloneData(data)
        };
    }

    static create(rows, columns, fillVal = "Random") {
        let data = [];
        for (let i = 0; i < rows; i++) {
            data.push([]);
            for (let j = 0; j < columns; j++) {
                data[i].push(fillVal === "Random" ? Math.random() * 2 - 1 : fillVal);
            }
        }
        return this.newMatrix(rows, columns, data);
    }

    static add(matrix, val) {
        let newMatrix = this.clone(matrix);
        for (let i = 0; i < matrix.rows; i++) {
            for (let j = 0; j < matrix.columns; j++) {
                newMatrix.data[i][j] += val;
            }
        }

        return newMatrix;
    }

    static scale(matrix, val) {
        let newMatrix = this.clone(matrix);
        for (let i = 0; i < matrix.rows; i++) {
            for (let j = 0; j < matrix.columns; j++) {
                newMatrix.data[i][j] *= val;
            }
        }

        return newMatrix;
    }


    static map(matrix, func) {
        let newMatrix = this.clone(matrix);
        for (let i = 0; i < matrix.rows; i++) {
            for (let j = 0; j < matrix.columns; j++) {
                newMatrix.data[i][j] = func(newMatrix.data[i][j]);
            }
        }

        return newMatrix;
    }


    static addMatrix(matrixA, matrixB) {
       
        if (matrixA.rows !== matrixB.rows || matrixA.columns !== matrixB.columns) {
            
            console.error(`MatrixA ${matrixA.rows}X ${matrixA.columns} size is not the same as MatrixB ${matrixB.rows}X ${matrixB.columns} `);
            return undefined;
        }

        let newMatrix = this.clone(matrixA);

        for (let i = 0; i < newMatrix.rows; i++) {
          
            for (let j = 0; j < newMatrix.columns; j++) {
                
                newMatrix.data[i][j] += matrixB.data[i][j];
            }
        }

        return newMatrix;
    }

    
    static transpose(matrix)
    {
        let newData = [];
       for(let i = 0; i < matrix.columns; i++)
       {   newData.push([]);
        for(let j = 0; j < matrix.rows; j++)
        {
          newData[i].push(matrix.data[j][i]);
        }
       }
       return this.newMatrix(matrix.columns,matrix.rows,newData);
    }

    static multiply(matrixA,matrixB)
    {
        let matrixA_clone = this.clone(matrixA);
        let matrixB_clone = this.clone(matrixB);

       if(matrixA_clone.columns != matrixB_clone.rows)
       {
        console.error(`matrixA.columns ${matrixA.columns} must be equal to matrixB.rows  ${matrixB_clone.rows}`);
        return undefined;
       }

       let newMatrix = this.create(matrixA_clone.rows,matrixB_clone.columns,0);
       for(let i = 0; i < newMatrix.rows; i++)
       {
          for(let j = 0; j < newMatrix.columns; j++)
          { let sum = 0;
             for(let k = 0; k < matrixA_clone.columns; k++)
             {
              sum += matrixA_clone.data[i][k] * matrixB_clone.data[k][j];
             }
            newMatrix.data[i][j] = sum;
          }

       }

       return this.clone(newMatrix);

    
    }




}

