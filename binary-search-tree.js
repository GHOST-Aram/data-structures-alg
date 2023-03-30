export class Node{
    constructor(value){
        this.left = null
        this.value = value
        this.right = null
    }
}
export default class Tree{
    constructor() {
        this.root = null
        this.size = 0
    }

    // Build tree from array: Array should be sorted withoud duplicates
    buildTree (array) {
        //Exit if length is equal to size
        if(this.size === array .length )
            return
        
        //Midpoint
        let mid = Math.floor( array.length / 2)
        //Find mid point and insert mid element
        this.insert(this.root, array[mid])

        //Build left
        this.buildTree(array.slice(0, mid))

        //Build right
        this.buildTree(array.slice(mid, array.length))
    }

    //Contains?
    contains(value){
        //Check if value
        if(this !== null && this.value === value){
            return true
        }
        //Root node
        else if(this.left === null && this.right === null)
            return false
        else{
            //Recursively check right and left
            this.left.contains(value)
            this.right.contains(value)
        }
    }

    find(value){
        if(this.value === value)
            return this
        else if (this.left === null && this.right === null){
            return
        }
        else{
            this.left.find(value)
            this.right.find(value)
        }
    }
    //Insert
    insert(value){
        //If value is already present in the this, do nothing and return false
        if(this.contains(value))
            return false
            
        //Create new node
        const node = new Node(value)

        //this has no node
        if(this === null){
            this = node

            // If this is epmty
            if(this.isEmpty())
                this.root = this

            //Increment size
            this.size ++
            return true    
        }

        //Check left
        if(this.value < value)
            this.left.insert(value)
        
        else //Insert right
            this.right.insert(value)
    }

    //Check if tree is empty
    isEmpty(){
        return this.root === null
    }

    //Number of nodes in the tree
    size(){
        return this.size
    }
}