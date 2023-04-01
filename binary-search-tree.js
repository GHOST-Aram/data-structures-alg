import quicksort from './quicksort.js'
export class Node{
    constructor(value){
        this.left = null
        this.value = value
        this.right = null
        this.parent = null
    }
}
export default class Tree{
    constructor() {
        this.root = null
        this.size = 0
    }

    // Build tree from array: Array should be sorted withoud duplicates
    buildTree (array) {
        if(array.length === 1){
            this.insert(this.root, array[0])
                return
        }
        if(array.length === 0)
            return
        //Exit if length is equal to size
        else{
            //Midpoint
            let mid = Math.floor( array.length / 2)
            
            //Find mid point and insert mid element
            this.insert(this.root, array[mid])
            
            //Build left
            this.buildTree(array.slice(0, mid))
            
            //Build right
            this.buildTree(array.slice(mid, array.length))
        }
        
    }

    //Contains?
    contains(tree, value){
        return this.find(tree, value) !== null
    }

    //Delete Node
    #deleteNode(node){
        //Case node has 0 children: Set node to null
        if(node.right === null && node.left === null){
            const parent = node.parent
            if(parent.left = node)
                parent.left = null
            else
                parent.right = null
        }
        
        //Node has left child only: Change value of node to value of its left child
        // Then set left child to null
        else if (node.left !== null && node.right === null){
            node.value = node.left.value
            node.left = null
        }
        
        //Node has right child only: Change the value of current node to the value of its right child
        // then set its right child to null
        else if(node.left === null && node.right !== null){
            node.value = node.right.value
            node.right = null
        }
        
        //Node has both left and right children:
        else if(node.left !== null && node.right !==null){
            //  Get predicessor of the node
            let predicessor = this.#getPredicessor(node)

            // Set value of current node to the value of its predicessor
            node.value = predicessor.value
            
            // Set the predicessor of current node to null
            predicessor = null
        }
        
    }
    find(node, value){
        //Not found?
        if(node === null)
            return null

        //Found?
        else if(node.value === value)
            return node

        //Look left
        else if(value < node.value)
           return this.find(node.left, value)

        //Look right
        else if(value > node.value)
           return this.find(node.right, value)
    }

    //Count nodes from a 
    countNodes(node){
        if(node === null)
            return 0
        return this.countNodes(node.left) + this.countNodes(node.right) + 1
    }

    //get depth of a node: From the given node to the root
    getDepth(node){
        return Math.floor((Math.log2(this.countNodes(this.root)) + 1) - (Math.log2(this.countNodes(node)) + 1))
    }
    
    //getHeight: the number of edges in the path from a given node to the a leaf node.
    getHeight(node){
        return Math.floor((Math.log2(this.countNodes(node)) + 1))
    }

    //Traverse tree inorder

    inorder(node, callback, traversed = []){
        if(node !== null){
            this.inorder(node.left, callback, traversed)

            //If callback is not null
            if(callback)
                callback(node.value)
            else {
                //Return array of values in tree inorder
                traversed.push(node.value)
            }
            
            this.inorder(node.right, callback, traversed)
        } 
        return traversed
        
    }
    //Insert
    insert(node,value){
        if(node === null){
            //Create new node
           node = new Node(value)

           //If node has no node at all
           if(this.isEmpty()){
                this.root = node
                this.root.parent = null
            }

            this.size ++
        }
        if(node.value > value){
            node.left = this.insert(node.left, value)
            node.left.parent = node
            
        }
        else if(node.value < value){
            node.right = this.insert(node.right, value)
            node.right.parent = node
        }
        //Job done
       return node
    }

    isBalanced(){
        return Math.abs(this.getHeight(this.root.left)  -  this.getHeight(this.root.right)) <= 1
    }
    //Check if tree is empty
    isEmpty(){
        return this.root === null
    }


    levelOrder(callback){
        let traversed = []

        let queue = [] //Create an empty queue
        queue.push(this.root) //Enqueue the root node

        

        while(queue.length > 0 ){
            //Dequeue and get node
            let node = queue.shift()
            
            //If callback function is provided in the arguments
            if(callback)
                callback(node.value)
            // else push value into array if we are not provided with a callback function
            else
                traversed.push(node.value)
            
            //If left is not null
            if(node.left !== null)
                queue.push(node.left)
            
            //If right node is not null
            if(node.right !== null)
                queue.push(node.right)
        }
        //Return array if no callback function was provided
        if(!callback)
            return traversed
    }


    // Traverse Postorder
    postorder(node, callback, traversed = []){
        if(node !== null){
            this.postorder(node.left, callback, traversed)

            
            this.postorder(node.right, callback, traversed)
            //If callback is not null
            if(callback)
                callback(node.value)
            else {
                //Return array of values in tree postorder
                traversed.push(node.value)
            }
        } 
        return traversed
    }

    //Traverse preoder
    preorder(node, callback, traversed = []){
        if(node !== null){
            //If callback is not null
            if(callback)
                callback(node.value)
            else {
                //Return array of values in tree preorder
                traversed.push(node.value)
            }
            this.preorder(node.left, callback, traversed)

            
            this.preorder(node.right, callback, traversed)
        } 
        return traversed
    }
    //Pretty print
    prettyPrint(node, prefix = '', isLeft = true){
        if ( node === null) {
            return;
        }
        if (node.right !== null) {
            this.prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
        }
        console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.value}`);
        if (node.left !== null) {
            this.prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
        }
            
    }

    //Print on console inorder
    print(node){
        if(node !== null){
            this.print(node.left)
            console.log(node.value)
            this.print(node.right)
        } 
    }
    //Rebalance
    rebalance(){
        //Get values
        this.buildTree(quicksort(this.inorder()))
        
    }

    //Returns true if node removed, if not is not found in the tree, return false
    remove(value){
        //Get node to be removed
        const node = this.find(this.root,value)
        if(node){
            //Delete node
            this.#deleteNode(node)
            return true
        } 

        return false        
    }

    //Returns the right most node of current node's left node 
    #getPredicessor(node){
        //Right node of current node
        let rightMost = node.left.right

        while(true){
            //Iterate until the right most node is a leaf node
            if(rightMost.right === null)
                return rightMost
                
            //Advance  right most node
            rightMost = rightMost.right   
        }
    }
    //Number of nodes in the tree
    getSize(){
        return this.size
    }
}

const tree =new Tree()

const arr = [44,55,66,67,68,69,90,889]
tree.buildTree(arr)

// // console.log(tree.contains(tree.root, 690906))
// // console.log(tree.root)
// // tree.print(tree.root)
// // console.log(tree.countNodes(tree.root))
// // console.log(tree.getSize())
// const node55 = tree.find(tree.root, 66)
// const depth = tree.getHeight(tree.root)

// console.log(tree.inorder(tree.root))
tree.prettyPrint(tree.root)

const feedBack = tree.remove(44)
// console.log(tree.root)

// let nodex = tree.find(tree.root, 90)
// console.log('Parent ', nodex)
tree.prettyPrint(tree.root)




