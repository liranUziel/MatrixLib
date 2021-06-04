/**
 * @author Linra Uziel
 * @class Matrix
 * @description This is a Matrix data structer
 * @todo Matrix math (add,sub,mutltiply,dot, etc)
 * @version 1.0.0
 */

class Matrix{
    //private - NEW in javascript (not fully suported);
    #rows = 0;
    #columns = 0;
    #matrix;
    #mutrixEmpty = true;
    #low_range = 0;
    #high_range = 100;
    //public
   
    //constructor
    constructor(_rows,_columns){
        this.#rows = _rows;
        this.#columns = _columns;
        this.#matrix = new Array(_rows);
        for(let r = 0;r < _rows;r++){
            this.#matrix[r] = new Array(_columns);
        }
    }
    //getters
    get rows(){
        return this.#rows;
    }
    get columns(){
        return this.#columns;
    }
    get lowRange(){
        return this.#low_range;
    }
    get highRange(){
        return this.#high_range;
    }
    //setters
    set lowRange(_low){
        this.#low_range = _low;
    }
    set highRange(_high){
        this.#high_range = _high;
    }
    //private functions and methods
    /**
     * @name copyValue
     * @param {Matrix} _newMatrix - A new matrix (target).
     * @description The copyValue method take the self object(this) matrix value and copy them
     * to the target matrix (newMatrix).
     * @return none
     */
    #copyValues(_newMatrix){
        for(let r = 0;r < this.#rows;r++)
        {
            for(let c = 0;c < this.#columns;c++){
                _newMatrix.#matrix[r][c] = this.#matrix[r][c];
            }
        }
        _newMatrix.#mutrixEmpty = false;
    }
    /**
     * @name fillMatrixRow
     * @param {Number}rowNumber - Row number to set the values.
     * @param {Array}arryValues - Array of value to set the matrix values.
     * @param {Matrix}_newMatrix - A new matrix (target).
     * @description 
     * @return none
     */
    static #fillMatrixRow(rowNumber,arryValues,_newMatrix){
            for(let c = 0;c < arryValues.length;c++){
                _newMatrix.#matrix[rowNumber][c] = arryValues[c];
        }
    }
    #test(){
        console.log("hello");
    }
    /**
     * @name fillMatrixRow
     * @argument {Array} arguments - the param come from arguments 
     * @description Due to the use of arguments as the input we the function can generate
     *              new Matrix from any number of arrays, one for each row.
     * @return none
     */
    static matrixFromArray(){
        let baseArraySize = arguments[0].length;
        for(let r = 0;r <arguments.length;r++){
            let currentArraySize = arguments[r].length;
            if(currentArraySize != baseArraySize)
            {
                console.error(`'${arguments[r]}' is not an diffrent size`);
                return;
            }
            if(!arguments[r] instanceof Array){
                
                console.error(`'${arguments[r]}' is not an Array`);
                return;
            }
        }
        let rows = arguments.length;
        let columns = baseArraySize;
        let newMatrix = new Matrix(rows,columns);
        for(let r = 0;r < rows;r++){
            this.#fillMatrixRow(r,arguments[r],newMatrix);
        }
        newMatrix.#mutrixEmpty = false;
        return newMatrix;
    }
    //Public functions and methods    
    getSacle(){
        console.log(`This matrix is ${this.#rows} * ${this.#columns}`);
        return {rows:this.#rows,columns:this.#columns};
    }
    randomize(){
        for(let r = 0;r < this.#rows;r++)
        {
            for(let c = 0;c < this.#columns;c++){
                const value = Math.floor(Math.random() * (this.#high_range + 1 - this.#low_range)) + this.#low_range;
                this.#matrix[r][c] = value;
            }
        }
        this.#mutrixEmpty = false;
    }
    print(){
        if(this.#mutrixEmpty){
            console.error("Matrix is empty");
            return -1;
        }
        let rowString;
        for(let r = 0;r < this.#rows;r++)
        {
            rowString = "[";
            for(let c = 0;c < this.#columns;c++){
                rowString += c != 0 ? `,${this.#matrix[r][c]}` :`${this.#matrix[r][c]}`;
            }
            rowString += "]";
            console.log(rowString);
        }
        return 1; 
    }
    copy(){
        let newMatrix = new Matrix(this.#rows,this.#columns);
        this.#copyValues(newMatrix);
        return newMatrix;
    }
    //copy constructor
    static copy(_matrix){
        let newMatrix = new Matrix(_matrix.#rows,_matrix.#columns);
        _matrix.#copyValues(newMatrix);
        return newMatrix;
    }



}//