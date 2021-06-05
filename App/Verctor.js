/**
 * @author Linra Uziel
 * @class Matrix
 * @description This is a Matrix data structer
 * @todo Matrix math (add,sub,mutltiply,dot, etc)
 * @version 1.0.0
 */

 class Vector{
    //Private
    #vector = [];
    //Public
    length;
    constructor(_array){
        this.#vector = _array;
        this.length = _array.length;
    }
 }