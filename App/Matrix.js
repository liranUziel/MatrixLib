/**
 * @author Linra Uziel
 * @class Matrix
 * @description This is a Matrix data structer
 * @todo Matrix math (add,sub,mutltiply,dot, etc)
 * @version 1.0.0
 */

class Matrix{
    //private - NEW in javascript (not fully suported);
    rows = 0;
    columns = 0;
    #matrix;
    #mutrixEmpty = true;
    #low_range = 0;
    #high_range = 100;
    //public
    
    //constructor
    constructor(_rows,_columns){
        this.rows = _rows;
        this.columns = _columns;
        this.#matrix = new Array(_rows);
        for(let r = 0;r < _rows;r++){
            this.#matrix[r] = new Array(_columns);
        }
    }
    //getters

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
     * to the target matrix (newMatrix). NOTE: may be remove in the next update
     * @return none
     */
    #copyValues(_newMatrix){
        for(let r = 0;r < this.rows;r++)
        {
            for(let c = 0;c < this.columns;c++){
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
    //Public functions and methods 
    /**
     * @name fillMatrixRow
     * @argument {Array} arguments - the param come from arguments 
     * @description Due to the use of arguments as the input we the function can generate
     *              new Matrix from any number of arrays, one for each row.
     * @return none
     */
    
    static #addRows(rowA,rowB,newRow){
        const length = rowA.length;
        for(let c = 0;c < length;c++){
            newRow [c] = rowA[c] + rowB[c];
        }
    }
    
    static add(matrixA,matrixB){
        let scaleA = matrixA.getSacle();
        let scaleB = matrixB.getSacle();
        if(scaleA["rows"] != scaleB["rows"] && scaleA["columns"] != scaleB["columns"]){
            let errorMesseg = scaleA["rows"] != scaleB["rows"] ? "The number of rows are not muching" : "";
            if(errorMesseg !== ""){
                errorMesseg+= " and"
            }
            errorMesseg += scaleA["columns"] != scaleB["columns"] ? " The number of columns are not muching" : "";
            console.error(errorMesseg);
            return -1;
        }
        let newMatrix = new Matrix(scaleA["rows"],scaleA["columns"]);
        const rowCount = scaleA["rows"];
        for(let r = 0;r < rowCount;r++){
            this.#addRows(matrixA.#matrix[r],matrixB.#matrix[r],newMatrix.#matrix[r]);
        }
        newMatrix.#mutrixEmpty = false;
        return newMatrix;
    }
    static scalarMultiplication(matrix,Scalar){
        let newMatrix = new Matrix(matrix.rows,matrix.columns);
        for(let r = 0;r < matrix.rows;r++)
        {
            for(let c = 0;c < matrix.columns;c++){
                newMatrix.#matrix[r][c] = matrix.#matrix[r][c] * Scalar;
            }
        }
        return newMatrix;
    }
    static sub(matrixA,matrixB){
        let scaleA = matrixA.getSacle();
        let scaleB = matrixB.getSacle();
        if(scaleA["rows"] != scaleB["rows"] && scaleA["columns"] != scaleB["columns"]){
            let errorMesseg = scaleA["rows"] != scaleB["rows"] ? "The number of rows are not muching" : "";
            if(errorMesseg !== ""){
                errorMesseg+= " and"
            }
            errorMesseg += scaleA["columns"] != scaleB["columns"] ? " The number of columns are not muching" : "";
            console.error(errorMesseg);
            return -1;
        }
        let newMatrix = new Matrix(scaleA["rows"],scaleA["columns"]);
        const rowCount = scaleA["rows"];
        let negativeB = this.scalarMultiplication(matrixB,-1);
        for(let r = 0;r < rowCount;r++){
            this.#addRows(matrixA.#matrix[r],negativeB.#matrix[r],newMatrix.#matrix[r]);
        }
        newMatrix.#mutrixEmpty = false;
        return newMatrix;
    }


    static matrixFromArray(){
        let baseArraySize = arguments[0].length;
        for(let r = 0;r <arguments.length;r++){
            let currentArraySize = arguments[r].length;
            if(currentArraySize != baseArraySize)
            {
                console.error(`'${arguments[r]}' is not an diffrent size`);
                return -1;
            }
            if(!arguments[r] instanceof Array){
                
                console.error(`'${arguments[r]}' is not an Array`);
                return -1;
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
    
    getSacle(){
        //console.log(`This matrix is ${this.rows} * ${this.columns}`);
        return {rows:this.rows,columns:this.columns};
    }
    randomize(){
        for(let r = 0;r < this.rows;r++)
        {
            for(let c = 0;c < this.columns;c++){
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
        for(let r = 0;r < this.rows;r++)
        {
            rowString = "[";
            for(let c = 0;c < this.columns;c++){
                rowString += c != 0 ? `,${this.#matrix[r][c]}` :`${this.#matrix[r][c]}`;
            }
            rowString += "]";
            console.log(rowString);
        }
        return 1; 
    }
    copy(){
        let newMatrix = new Matrix(this.rows,this.columns);
        this.#copyValues(newMatrix);
        return newMatrix;
    }
    //copy constructor
    static copy(_matrix){
        let newMatrix = new Matrix(_matrix.rows,_matrix.columns);
        _matrix.#copyValues(newMatrix);
        return newMatrix;
    }



}//