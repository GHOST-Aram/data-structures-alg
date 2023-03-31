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
        let leftHeight = 0
        let rightHeight = 0

        let leftNode = node.left
        let rightNode = node.right

        while(leftNode || rightNode){

            if(leftNode){
                //Increment heigth
                leftHeight ++

                //Advance left node
                leftNode = leftNode.left 
            }
            
            if(rightNode){
                //Increment heigth
                rightHeight++

                //Advance rigth node
                rightNode = rightNode.right
            }

        }
        return Math.max(leftHeight,rightHeight)
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
                return callback(array)
        }
        
    }
    //Insert
    insert(node,value){
        if(node === null){
            //Create new node
           node = new Node(value)

           //If node has no node at all
           if(this.isEmpty()){
                this.root = node
            }
            this.size ++
        }
        if(node.value > value){
            node.left = this.insert(node.left, value)
            
        }
        else if(node.value < value){
            
            node.right = this.insert(node.right, value)
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
                return callback(array)  
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
                return callback(array)
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
                return callback(array)
        }
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

    //Remove node
    remove(node){
        if(!this.contains(node.value)){
            return false
        }
        // Obliterate value if its leaf
        if(this.value === node.value){
            node = null
            return true
        }


        
    }
    //Number of nodes in the tree
    getSize(){
        return this.size
    }
}

const tree =new Tree()

const arr = [44,55,66,67,68,69]
tree.buildTree(arr)

// console.log(tree.contains(tree.root, 690906))
// console.log(tree.root)
// tree.print(tree.root)
// console.log(tree.countNodes(tree.root))
// console.log(tree.getSize())
const node55 = tree.find(tree.root, 55)
const depth = tree.getDepth(node55)

console.log(depth)
tree.prettyPrint(tree.root)