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
    #copyValues(_newMatrix){
        for(let r = 0;r < this.#rows;r++)
        {
            for(let c = 0;c < this.#columns;c++){
                _newMatrix.#matrix[r][c] = this.#matrix[r][c];
            }
        }
        _newMatrix.#mutrixEmpty = false;
    }
    matrix(){
        console.log(arguments.length);
        for(let r = 0;r <arguments.length;r++){
            if(!arguments[r] instanceof Array){
               console.error(`'${arguments[r]}' is not an Array`);
               return;
            }
        }
    }

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