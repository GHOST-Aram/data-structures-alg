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
    contains(tree, value){
        //Check if value
        if(tree !== null && tree.value === value){
            return true
        }
        //Root node
        else if(tree.left === null && tree.right === null)
            return false
        else{
            //Recursively check right and left
            this.contains(tree.left, value)
            this.contains(tree.right, value)
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
    insert(tree,value){
        //If value is already present in the tree, do nothing and return false
        if(this.contains(tree, value))
            return false
            
        //Create new node
        const node = new Node(value)

        //Tree has no node
        if(tree === null){
            tree = node

            // If tree is epmty
            if(this.isEmpty())
                this.root = tree

            //Increment size
            this.size ++
            return true    
        }

        //Check left
        if(tree.value < value)
            this.insert(tree.left, value)
        
        else //Insert right
            this.insert(tree.right, value)
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