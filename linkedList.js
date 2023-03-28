export  class Node{
    constructor(value){
        this.value = value
        this.next = null
    }
}
export default class LinkedList{
    #length = 0
    constructor(){
        this.head = null
        this.tail = null
    }

    //Add a new node to an empty linked list
    #addToEmpty(value){
        //create new node
        const newNode = new Node(value)

        //Initialize head to new node
        this.head = newNode

        //Initialize tail to new node
        this.tail = newNode

        //Set new node to point to null since it is the last element of the array
        newNode.next = null
    }

    //Add new node at the end of the linked list
    append(value){

        //Check if linked list is empty then add node to empty list
        if(this.isEmpty())
            this.#addToEmpty(value)
        
        //Otherwise
        else{
            //Create new node
            const newNode = new Node(value)


            //point Tail next node to new node
            this.tail.next = newNode

            //Point newNode.next to null
            newNode.next = null
            
            //Make new node the new tail of the linked list
            this.tail = newNode
        }

        //Increment the length of the lined list
        this.#length ++
    }

    //Check if the Linked list contains a particular value in atleast one if its nodes
    contains(value){
        //Get pointer start at head
        let pointer = this.head

        //Loop while not end of list
        while(true){

            //Check if pointer is pointing at our target Node
            if(pointer.value === value)
                
                //If found
                return true
 
                //Break at the end of the list
                if(pointer.next == null)
                break
                
                //Advance position of pointer node if not found
                pointer = pointer.next
        }

        //if not found 
        return false
 
    }


    //Find first index of the node with a particular value
    find(value){
        //Get pointer start at head
        let pointer = this.head

        //initialize Index variable
        let pointerIndex = 0

        //Loop while not end of list
        while(true){

            //Check if pointer is pointing at our target index
            if(pointer.value === value)

                //Return index of target Node
                return pointerIndex
            
            //increment pointer index
            pointerIndex ++

            //Break at the end of the list
            if(pointer.next == null)
            break
            
            //Advance position of pointer node
            pointer = pointer.next
        }

        //Not found? 
        return -1
    }

    //Insert node at a given index
    insertAt(value, index){

        //Find node before that index
        const leftNode = this.nodeAt((index - 1))
        
        //Create new node
        const newNode = new Node(value)

        //Find node after that index
        const rightNode = this.nodeAt(index)

        //Set left node next pointer to point to new Node
        leftNode.next = newNode

        //Set new Node next pointer to point to the node on the right
        newNode.next = rightNode

        //Increment length
        this.#length ++

    }
    //Check if linked list has no nodes in it
    isEmpty(){
        return this.size() === 0
    }

    //Add node to the begining of the linked list
    prepend(value){
        
        //Check if linked list is empty then add node to empty list
        if(this.isEmpty())
            this.#addToEmpty(value)
        
        //Otherwise
        else{
            //Create new node
            const newNode = new Node(value)

            //Point new node to current head
            newNode.next = this.head

            //Set head to new node to new node
            this.head = newNode

           
            
        }

        //Increment the length of the lined list
        this.#length ++
    }

    //size
    size(){
        return this.#length
    }

    //Return nodes in the liked list as a string
    toString(){
        //Get pointer start at head
        let pointer = this.head
        
        let list = []

        //Loop while not end of list
        while(true){

            //Push value into array
            list.push(`(${pointer.value})`)

            //Break at the end of the list
            if(pointer.next == null)
            break
            
            //Advance position of pointer node
            pointer = pointer.next
        }

        //if not found 
        return list.join('->')
    }

    //Returns a node at given index
    nodeAt(index){
        //If index is out of bounds
        if(index < 0 || index > this.#length)
            throw `Index out of Bounds`
        
        //Get pointer start at head
        let pointer = this.head

        //initialize Index variable
        let pointerIndex = 0

        //Loop while not end of list
        while(true){

            //Check if pointer is pointing at our target index
            if(pointerIndex === index)

                //Return Node we are looking for
                return pointer
            
            //increment pointer index
            pointerIndex ++

            //Break at the end of the list
            if(pointer.next == null)
                break

            //Advance position of pointer node
            pointer = pointer.next

        }

    }

    //Remove node at partiular index
    removeAt(index){

        //Find node before that index
        const leftNode = this.nodeAt(index - 1)
    
        //Find node that index
        const targetNode = this.nodeAt(index)

        //Find Node after that Index
        const rightNode = this.nodeAt(index + 1)

        //Set left node next pointer to point to right Node
        leftNode.next = rightNode

        //Set target Node next pointer to point to null
        targetNode.next = null

        //decrement length
        this.#length --
    }
}


