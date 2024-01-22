/**
 * Finds and prints the two consecutive valid usernames with the biggest sum of their lengths.
 * A valid username starts with a letter and can contain only letters, digits, and "_".
 * It cannot be less than 3 or more than 25 symbols long.
 * If there are ties, the leftmost pair is chosen.
 *
 * @param {string} input - The input line containing usernames separated by space, "/", "\", "(", ")".
 */
function findLongestUsernamePair(input) {
    // Split the input into an array of valid usernames using specified symbols as separators.
    const validUsernames = input
        .split(/[ /\\()]+/)
        .filter(username => /^[a-zA-Z][a-zA-Z0-9_]{2,25}$/.test(username));

    // Initialize variables to store the longest pair and its length.
    let maxLength = 0;
    let longestPair = [];

    // Iterate through valid usernames to find the pair with the maximum sum of lengths.
    for (let i = 0; i < validUsernames.length - 1; i++) {
        const currentLength = validUsernames[i].length + validUsernames[i + 1].length;
        if (currentLength > maxLength) {
            maxLength = currentLength;
            longestPair = [validUsernames[i], validUsernames[i + 1]];
        }
    }

    // Print the result to the console.
    console.log(longestPair.join('\n'));
}

// Example usage:
const inputLine = "ds3bhj y1ter/wfsdg 1nh_jgf ds2c_vbg\\4htref";
findLongestUsernamePair(inputLine);

///^[a-zA-Z][a-zA-Z0-9_]{2,25}$/ is a regular expression pattern.
// ^: Asserts the start of the string.
// [a-zA-Z]: Matches any single uppercase or lowercase letter. This ensures that the username starts with a letter.
//
// [a-zA-Z0-9_]{2,25}: Matches between 2 and 25 characters, including letters, digits, and underscores. This ensures that the username contains only valid characters and is of an acceptable length.
//
// $: Asserts the end of the string.
//
// .test(username): Tests if the given username string matches the regular expression pattern.