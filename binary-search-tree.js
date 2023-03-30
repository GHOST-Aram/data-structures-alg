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
        //Check if value in parent node
        if(this !== null && this.value === value){
            return true
        }
        //If nt found in parent node and child nodes are null
        else if(this.left === null && this.right === null)
            return false

        else{
            //Recursively check right and left
            this.left.contains(value)
            this.right.contains(value)
        }
    }

    find(value){
        //Check in current node
        if(this.value === value)
            return this
        
        //If not found in both left and right nodes and there are no more nodes
        else if (this.left === null && this.right === null){
            return
        }

        //Keep looking left and right
        else{
            this.left.find(value)
            this.right.find(value)
        }
    }

    //Traverse tree inorder
    inorder(callback){
        //Do nothing if tree is empty
        if(this.isEmpty())
            return
        //Look left
        if(this.left !== null){
            return this.left.value
        }
        //look right
        if(this.right.value)
            return this.left.value

        //Push values into array
        const array = [[this.left.inorder(callback)].push(this.root.value)].push(right.inorder(callback))

        if(this.size() == array.length){
            //No callback
            if(callback === undefined)
                return array
            else
                callback(array)
        }
        
    }
    //Insert
    insert(value){
        //If value is already present in the this, do nothing and return false
        if(this.contains(value))
            return false
            
        //Create new node
        const node = new Node(value)

        
        //tree has no node
        if(this === null){
            this = node
            
            // If tree is epmty
            if(this.isEmpty())
                this.root = node

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


    levelOrder(callback){
        //Break if tree is empty
        if(this.isEmpty())
            return
        
        //Look left 
        if(this.left === null)
            return this.left.value
            
        //Look right
        if(this.right === null)
            return this.right.value
        
        //Push values into array
        const array = [[this.root.value].push(this.left.levelOrder(callback))].push(this.right.levelOrder(callback))
        
        //Break if all values have been added inot the array
        if(array.left === this.size()){

            //If no fundtion is provided as argument
            if(callback === undefined)
                return array

            //Otherwise Do something with callback
            else 
                callback(array)  
        }
    }


    // Traverse Postorder
    postorder(callback){
        //Do nothing if tree is empty
        if(this.isEmpty())
            return
        //Look left
        if(this.left !== null){
            return this.left.value
        }
        //look right
        if(this.right.value)
            return this.left.value

        //Push values into array
        const array = [[this.left.inorder(callback)].push(right.inorder(callback))].push(this.root.value)

        if(this.size() == array.length){
            //No callback
            if(callback === undefined)
                return array
            else
                callback(array)
        }
    }

    //Traverse preoder
    preorder(callback){
        //Do nothing if tree is empty
        if(this.isEmpty())
            return
        //Look left
        if(this.left !== null){
            return this.left.value
        }
        //look right
        if(this.right.value)
            return this.left.value

        //Push values into array
        const array = [[this.root.value].push(this.left.inorder(callback))].push(right.inorder(callback))

        if(this.size() == array.length){
            //No callback
            if(callback === undefined)
                return array
            else
                callback(array)
        }
    }
    //Pretty print
    prettyPrint(prefix = '', isLeft = true){
        if (this === null) {
            return;
        }
        if (this.right !== null) {
            prettyPrint(this.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
        }
        console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${this.data}`);
        if (this.left !== null) {
            prettyPrint(this.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
        }
            
    }
    //Number of nodes in the tree
    size(){
        return this.size
    }
}