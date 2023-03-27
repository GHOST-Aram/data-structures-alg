function quicksort(list){
    if(list.length <= 1)
        return list
    else if(Array.isArray(list)){
        let pivot = list[0]
        let leftList = []
        let rightList = []
        
        for(let index = 0; index < list.length; index ++){
            if(list[index] < pivot)
                leftList.push(list[index])
            else
                rightList.push(list[index])
        }

        return merge(quicksort(leftList), pivot, quicksort(rightList))
    }
}

function merge(left, pivot, right){
    return [].push(...left).push(pivot).push(...right)
    
}
// console.log(quicksort([6,35,65,3,4,65,7,3,4,46,43]))
// console.log(quicksort([3, 4, 3, 4 ]))
console.log(quicksort(9,0,3,5,12,3,8))