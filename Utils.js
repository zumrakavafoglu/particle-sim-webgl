function flatten(arr) {
    return arr.reduce(function (flat, toFlatten) {
      return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
    }, []);
}

function subtractArrays(arr1, arr2){
    var result = [];
    
    for(var i=0; i<arr1.length; i++){
        result.push(arr1[i]-arr2[i]);
    }

    return result;
}

function addArrays(arr1, arr2){
    var result = [];
    
    for(var i=0; i<arr1.length; i++){
        result.push(arr1[i]+arr2[i]);
    }

    return result;
}

function scaleArray(k, arr){
    var result = [];
    
    for(var i=0; i<arr.length; i++){
        result.push(k*arr[i]);
    }

    return result;
}

function add(arr1, arr2){
    for(var i=0; i<arr1.length; i++){
        arr1[i] += arr2[i];
    }
}

function elementwiseMultiplication(arr1, arr2){
    var result = [];
    for(var i=0; i<arr1.length; i++){
        result[i] = arr1[i] * arr2[i];
    }

    return result;
}

function normalize(arr){
    return scaleArray(1.0/arr.length, arr);
}

function dot(arr1, arr2){

    var d;

    for(var i=0; i<arr1.length; i++){
        d += arr1[i]*arr2[i];
    }

    return d;
}

function randomRange(start, end){
    return (end-start) * Math.random() + start;
}

function findNormalComponent(V, N){
    N = normalize(N)
    V_N = scaleArray(dot(V,N),N)
    return V_N
}