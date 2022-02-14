exports.validPassword = (psw) => {
    return psw.length < 10 || psw.length > 20 ? false : true
}

exports.isArrEqual = (arr1, arr2) => {
    return arr1.length === arr2.length &&
        arr1.every((value, index) =>
            value === arr2[index])
}