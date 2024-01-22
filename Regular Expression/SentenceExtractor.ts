function findSentencesWithKeyword(keyword, text) {
    // Regular expression to match sentences ending with '.', '!' or '?'
    const sentenceRegex = /[^.!?]+[.!?]+/g;

    // Split the text into sentences
    const sentences = text.match(sentenceRegex);

    // Print sentences containing the keyword
    if (sentences) {
        sentences.forEach((sentence) => {
            if (sentence.toLowerCase().includes(keyword.toLowerCase())) {
                console.log(sentence.trim());
            }
        });
    }
}

// Example usage:
const keyword = "is";
const inputText = "This is my cat! And this is my dog. We happily live in Paris – the most beautiful city in the world! Isn’t it great? Well, it is :)";
findSentencesWithKeyword(keyword, inputText);
