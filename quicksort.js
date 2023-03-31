export default function quicksort(list){
    if(list.length <= 1)
        return list
    
    let pivot = list[0]
    let leftList = []
    let rightList = []
    
    for(let index = 1; index < list.length; index ++){
        if(list[index] < pivot)
            leftList.push(list[index])
        else
            rightList.push(list[index])
    }

    return [].concat(...quicksort(leftList)).concat([pivot]).concat(...quicksort(rightList))
    
}
