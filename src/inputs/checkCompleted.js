// Function to (recursively) check if all inputs are completed

export const checkCompleted = (elementData, isRequired) => {
  // We need to understand if stepData is completed.
  // If value if an object, we need to rely on completed field.
  // If value is something else, we just check that it is not empty.
  if (Array.isArray(elementData)) {
    let isElementCompleted = elementData.every((element) =>
      checkCompleted(element, true),
    );
    /// Even if the array itself is not required, each element inside the array
    /// may be required, so we need to check that as well.
    /// Element requiredness is ignored
    return isElementCompleted;
  } else if (elementData !== null && typeof elementData === "object") {
    let isElementCompleted = elementData.completed === true;
    return !isRequired || isElementCompleted;
  } else {
    let isElementCompleted = !!elementData;
    return !isRequired || isElementCompleted;
  }
};
