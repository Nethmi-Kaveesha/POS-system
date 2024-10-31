// validation.js
export const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email regex pattern
    return emailPattern.test(email) || "Email does not match the required format."; // Return error message on failure
};

export const validatePhoneNumber = (phone) => {
    const phonePattern = /^[0-9]{10}$/; // Adjust the pattern as needed
    return phonePattern.test(phone) || "Phone number must be 10 digits."; // Return error message on failure
};

export const validateName = (name) => {
    const namePattern = /^[A-Za-z]+([-'][A-Za-z]+)*$/; // Allows letters, hyphens, and apostrophes
    return (namePattern.test(name) && name.length > 0) || "Name must contain only letters, hyphens, or apostrophes and cannot be empty."; // Return error message on failure
};

export const validateAddress = (address) => {
    const addressPattern = /^[A-Za-z0-9\s,.'-]{5,100}$/; // Minimum length of 5, maximum length of 100
    return addressPattern.test(address) || "Address must be between 5 and 100 characters and contain only valid characters."; // Return error message on failure
};

// validation.js

export const validateCategory = (category) => {
    const categoryPattern = /^[A-Za-z\s]+$/; // Allows letters and spaces only
    return (categoryPattern.test(category) && category.length > 0) || "Category must contain only letters and cannot be empty."; // Return error message on failure
};

export const validateItemName = (itemName) => {
    const itemNamePattern = /^[A-Za-z0-9\s\-]+$/; // Allows letters, numbers, spaces, and hyphens
    return (itemNamePattern.test(itemName) && itemName.length > 0) || "Item name must contain only letters, numbers, spaces, and hyphens and cannot be empty."; // Return error message on failure
};

export const validateItemPrice = (itemPrice) => {
    const pricePattern = /^\d+(\.\d{1,2})?$/; // Allows whole numbers or decimals with up to 2 decimal places
    return (pricePattern.test(itemPrice) && Number(itemPrice) > 0) || "Item price must be a positive number."; // Return error message on failure
};

export const validateItemQuantity = (itemQty) => {
    const qtyPattern = /^[0-9]+$/; // Allows only digits
    return (qtyPattern.test(itemQty) && Number(itemQty) > 0) || "Item quantity must be a positive integer."; // Return error message on failure
};
