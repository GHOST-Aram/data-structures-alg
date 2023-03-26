function mergersort(list){
    
    let length = list.length
    
        if(length <= 1)
            return list
    
    //Midpoint
    if(length % 2 !== 0)
    length = length + 1
    
    let midpoint = length/2
    
    //Sub lists
    let list1 = list.slice(0, midpoint)
    let list2 = list.slice(midpoint, length)

    return merge(mergersort(list1), mergersort(list2))  
}
function merge(list1, list2){
    const result = []
    let leftIndex = rightIndex = 0

    while(leftIndex < list1.length && rightIndex < list2.length) {
        if(list2[rightIndex] <= list1[leftIndex]){
            result.push(list2[rightIndex])
            //Increment index if list 2
            rightIndex ++
        }else{
            result.push(list1[leftIndex])
            leftIndex ++
        }
    }
    //Add remaining
    if(list1.length > leftIndex)
        result.push(...list1.slice(leftIndex))
    if(list2.length > rightIndex)
        result.push(...list2.slice(rightIndex))

    return result
}
console.log(mergersort([54,65,32,5,6,4,32,24,0,99,2,98,1,4,2]))