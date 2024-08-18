
export function getMergeSortAnimations(array){
    const animations = [];
    if(array.length<=1) return array;
    const auxiliaryArray=array.slice();
    mergeSortHelper(array, 0, array.length-1, auxiliaryArray, animations);
    return animations;
}

function mergeSortHelper(
    mainArray,
    startIdx,
    endIdx,
    auxiliaryArray,
    animations,
){
    if(startIdx===endIdx) return;
    const middleIdx=Math.floor((startIdx+endIdx)/2);
    mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
    mergeSortHelper(auxiliaryArray, middleIdx+1, endIdx, mainArray, animations);
    doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}

function doMerge(
    mainArray,
    startIdx,
    middleIdx,
    endIdx,
    auxiliaryArray,
    animations,
){
    let k=startIdx;
    let i=startIdx;
    let j=middleIdx+1;
    while(i<=middleIdx && j<=endIdx){
        //values that we're comparing, push them to change their color
        animations.push([i, j]);
        // comparing values, pushing them again to revert their color.
        animations.push([i, j]);
        if(auxiliaryArray[i]<=auxiliaryArray[j]){
            //overwrite the value at index k in original array with the value at index i in auxiliary array.
            animations.push([k, auxiliaryArray[i]]);
            mainArray[k++]=auxiliaryArray[i++];
        }
        else{
            //overwrite the value at index k in the original array with the value at index j in auxiliary array.
            animations.push([k, auxiliaryArray[j]]);
            mainArray[k++]=auxiliaryArray[j++];
        }
    }
    while(i<=middleIdx){
        // values that we're comparing. push them once to change their color.
        animations.push([i, i]);
        // push them second time to revert their color.
        animations.push([i, i]);
        // overwrite the value at index k in the orginal array with value at index i in auxiliary array.
        animations.push([k, auxiliaryArray[i]]);
        mainArray[k++]=auxiliaryArray[i++];
    }
    while(j<=endIdx){
        // values that we're comparing. push them once to change their color.
        animations.push([j, j]);
        // push them again to revert their color.
        animations.push([j, j]);
        // overwrite the value at index k in the orginal array with value at index j in auxiliary array.
        animations.push([k, auxiliaryArray[j]]);
        mainArray[k++]=auxiliaryArray[j++];
    }
}
