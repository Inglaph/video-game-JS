const LapTools = {

}

// lap: tools JS ---------------------------------------------------------------------------->
LapTools.validationValueInLap = function validationValueInLap(side) {
    let varValidation

    if (isNaN(side)) {
        console.warn("Debe ingresar un numero, verificacion realizada con ES6 isNan")
        varValidation = false
        return varValidation
    }
    if (side === null) {
        console.warn("Debe ingresar un valor")
        varValidation = false
        return varValidation
    }
    if (side < 0) {
        console.warn("Debe ingresar un numero positivo")
        varValidation = false
        return varValidation
    }
    varValidation = true
    return varValidation
}

LapTools.showResult = function showResult(result, tagResult, und = "") {
    if (result == false) {
        let msj = 'Verifique los datos ingresados'
        tagResult.classList.remove(resultClass)
        tagResult.classList.add(resultClassErr)
        tagResult.innerText = `${msj}`
    } else {
        tagResult.classList.remove(resultClassErr)
        tagResult.classList.add(resultClass)
        result = result.toFixed(2)
        tagResult.innerText = `${result} ${und}`
    }
}

// lap: Math functions ---------------------------------------------------------------------->

LapTools.findValPercentage = function (percentage, valTotal) {
    let valPercentage = (percentage * valTotal) / 100
    return valPercentage
}

LapTools.findRefPercentage = function (valMin, valTotal) {
    let refPercentage = (valMin * 100) / valTotal
    return refPercentage
}


LapTools.averageArr = function averageArr(arr) {
    console.log(arr)
    let sum = 0
    let qtyNumbers = arr.length
    for (const number of arr) {
        sum = sum + number
    }
    console.log(sum)
    console.log(qtyNumbers)
    return (sum / qtyNumbers)
}

LapTools.averageArrReduce = function averageArrReduce(arr) {
    let sum = arr.reduce((accumulateValue, newValue) => accumulateValue + newValue, 0)
    let qtyNumbers = arr.length
    return (sum / qtyNumbers)
}

LapTools.medianArr = function medianArr(arr) {
    let arrLength = arr.length
    console.log(`largo de arr: ${arrLength}`) //lap: probe
    arr = arr.sort((a, b) => (a - b))
    let indValue1 = arrLength / 2
    if (arrLength % 2 === 0) {
        // console.log(arr) //lap: probe
        let sum = (arr[parseInt(indValue1)] + arr[parseInt(indValue1) - 1]) / 2
        return sum
    } else {
        // console.log(arr) //lap: probe
        return arr[parseInt(indValue1)]
    }
}

LapTools.fashionArr = function fashionArr(arr) {
    const arrFashion = []
    const arrQtyResult = []

    for (let i = 0; i < arr.length; i++) {
        let findNumber = arrFashion.find(element => element.value === arr[i])
        if (findNumber) {
            console.log('ya estaba el numero ' + arr[i])
            findNumber.qty = findNumber.qty + 1

        } else {
            let objIteration = { value: arr[i], qty: 1 }
            arrFashion.push(objIteration)
        }
    }
    for (let obj in arrFashion) {
        arrQtyResult.push(arrFashion[obj].qty)
    }
    let maxQty = Math.max(...arrQtyResult)
    console.log(arrQtyResult)
    console.log(maxQty)
    console.log(arrFashion)
    result = arrFashion.filter(element => element.qty == maxQty)
    return result

}

LapTools.applyDiscount = function applyDiscount(cost, discount) {
    let varValidation1 = validationValueInLap(cost)
    let varValidation2 = validationValueInLap(discount)
    if (varValidation1 == false || varValidation2 == false) {
        return false
    } else {
        return (cost * (100 - discount)) / 100
    }
}

LapTools.heightIsocelesTriangle = function heightIsocelesTriangle(side, base) {
    let varValidation1 = validationValueInLap(side)
    let varValidation2 = validationValueInLap(base)
    if (varValidation1 == false || varValidation2 == false) {
        return false
    } else {
        return Math.sqrt((side ** 2) - ((base ** 2) / 4))
    }
}

LapTools.areaCircle = function areaCircle(radio) {
    let varValidation = validationValueInLap(radio)
    if (varValidation) {
        area = (radio ** 2) * Math.PI
        return area
    } else {
        return false
    }
}

LapTools.perimeterCircle = function perimeterCircle(radio) {
    let varValidation = validationValueInLap(radio)
    if (varValidation == false) {
        return false
    } else {
        diameter = diameterCircle(radio)
        return diameter * Math.PI
    }
}

LapTools.diameterCircle = function diameterCircle(radio) {
    let varValidation = validationValueInLap(radio)
    if (!varValidation) {
        return false
    } else {
        return radio * 2
    }
}

LapTools.areaTriangle = function areaTriangle(base, height) {
    // console.log(typeof (base))
    let varValidation1 = validationValueInLap(base)
    let varValidation2 = validationValueInLap(height)
    if (varValidation1 == false || varValidation2 == false) {
        return false
    } else {
        return (base * height) / 2
    }
}

LapTools.perimeterSquare = function perimeterSquare(side) {
    let varVerification = validationValueInLap(side)
    if (varVerification == true) {
        return side * 4
    } else {
        return false
    }
}

LapTools.areaSquare = function areaSquare(side) {
    let varVerification = validationValueInLap(side)
    if (varVerification == true) {
        return side * side
    } else {
        return false

    }
}

LapTools.perimeterTriangle = function perimeterTriangle(side1, side2, side3) {
    let varVerification1 = validationValueInLap(side1)
    let varVerification2 = validationValueInLap(side2)
    let varVerification3 = validationValueInLap(side3)
    if (varVerification1 == false || varVerification2 == false || varVerification3 == false) {
        return false
    } else {
        return side1 + side2 + side3
    }

}
