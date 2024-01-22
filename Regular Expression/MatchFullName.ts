// Regular expression for a valid full name
const fullNameRegex = /\b[A-Z][a-z]+ [A-Z][a-z]+\b/;

// Function to validate a full name
function validateFullName(name) {
    // Test the provided name against the regular expression
    const isValid = fullNameRegex.test(name);

    // Output the result
    if (isValid) {
        console.log(`"${name}" is a valid full name.`);
    } else {
        console.log(`"${name}" is not a valid full name.`);
    }
}

// Test the function with example names
validateFullName("Ivan Ivanov");       // Valid full name
validateFullName("john doe");          // Invalid full name
validateFullName("JohnDoe");           // Invalid full name (no space)
validateFullName("John  Doe");          // Invalid full name (double space)
validateFullName("Alice Wonderland");  // Valid full name
