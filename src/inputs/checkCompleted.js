

// Function to (recursively) check if all inputs are completed


export const checkCompleted = (elementData) => {

    let isElementCompleted = false;
    
    // We need to understand if stepData is completed. 
    // If value if an object, we need to rely on completed field.
    // If value is something else, we just check that it is not empty.
    if (Array.isArray(elementData)) {
        isElementCompleted = elementData.every((element) => checkCompleted(element));
    } else if (elementData !== null && typeof elementData === "object") {
        isElementCompleted = elementData.completed === true;
    } else {
        isElementCompleted = !!elementData;
    }
    
    return isElementCompleted;
}
