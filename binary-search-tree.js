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

    // Build tree from array
    buildTree (array) {
        //Remove duplicates
        array = [new Set(array)]

        //Root node
        this.root = new Node()

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