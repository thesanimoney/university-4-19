class HTMLReplacer {
    static replaceATags(html: string): string {
        // Use a regular expression to replace <a> tags with [URL] tags
        const replacedHTML = html.replace(/<a\s+href="([^"]+)">([^<]+)<\/a>/g, '[URL href=$1]$2[/URL]');
        return replacedHTML;
    }
}

// Example usage
const inputHTML = '<ul> <li> <a href="http://softuni.bg">SoftUni</a> </li> </ul>';
const resultHTML = HTMLReplacer.replaceATags(inputHTML);
console.log(resultHTML);

///: Delimiters marking the start and end of the regular expression.
// <a: Matches the literal characters <a.
// \s+: Matches one or more whitespace characters (including spaces, tabs, or line breaks).
// href=": Matches the literal characters href=".
// ([^"]+): A capturing group that matches and captures one or more characters that are not a double quote ("), representing the content of the href attribute.
// ">: Matches the literal characters ">.
// ([^<]+): Another capturing group that matches and captures one or more characters that are not a less-than sign (<), representing the content between the opening and closing <a> tags.
// <\/a>: Matches the literal characters </a>.
// /g: Global flag indicating that the regular expression should be applied globally (across the entire input string), not just stopping after the first match.