import mergersort from './mergesort.js'
function binarySearch(start, end, item ,sortedArray){
    
    //Empty array/Absolute case
    if(start > end)
        return -1
    //Base case
    
        let midIndex = Math.floor((start + end) / 2)
        
        //Test mid element
        if(sortedArray[midIndex] === item)
            return midIndex
        //Check if item is on start
        else if(sortedArray[midIndex] > item){
            end = midIndex - 1
            return binarySearch(start, end, item ,sortedArray)
        }
        //Check if array is on end
        else if(sortedArray[midIndex] < item){
            start = midIndex + 1
            return binarySearch(start, end, item ,sortedArray)
        }
}
