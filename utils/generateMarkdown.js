// // function to generate markdown for README
// function generateMarkdown(data) {
//   return `# ${data.title}

// `;
// }

// module.exports = generateMarkdown;

// function generateTableOfContents(sections) {
//   const tableOfContents = sections.map(section => `- [${section}](#${section.toLowerCase()})`).join("\n");
//   return `## Table of Contents\n${tableOfContents}\n\n`;
// }

// function generateMarkdown(data) {
//   const sections = Object.keys(data);
//   const tableOfContents = generateTableOfContents(sections);

//   let markdownContent = "";

//   // Append table of contents
//   markdownContent += tableOfContents;

//   // Generate markdown for each section
//   sections.forEach(section => {
//     markdownContent += `## ${section}\n${data[section]}\n\n`;
//   });

//   return markdownContent;
// }

// module.exports = generateMarkdown;

// function generateMarkdown(data) {
//   const sections = Object.keys(data);
//   let markdownContent = "";

//   // Append title and description
//   markdownContent += `# ${data.title}\n\n${data.description}\n\n`;

//   // Generate table of contents
//   markdownContent += "## Table of Contents\n";
//   sections.forEach(section => {
//     markdownContent += `- [${section}](#${section.toLowerCase()})\n`;
//   });
//   markdownContent += "\n";

//   // Generate markdown for each section
//   sections.forEach(section => {
//     markdownContent += `## ${section}\n${data[section]}\n\n`;
//   });

//   return markdownContent;
// }

// module.exports = generateMarkdown;

// function capitalizeFirstLetter(string) {
//   return string.charAt(0).toUpperCase() + string.slice(1);
// }

// function generateMarkdown(data) {
//   const sections = Object.keys(data);
//   let markdownContent = "";

//   // Append title and description
//   markdownContent += `# ${data.title}\n\n${data.description}\n\n`;

//    // Generate license badge
//    if (data.licenseBadge) {
//     markdownContent += `![License](${data.licenseBadge})\n\n`;
//   }

//   // Generate table of contents
//   markdownContent += "## Table of Contents\n";
//   sections.forEach(section => {
//     markdownContent += `- [${capitalizeFirstLetter(section)}](#${section.toLowerCase()})\n`;
//   });
//   markdownContent += "\n";

//   // Generate markdown for each section
//   sections.forEach(section => {
//     if (section !== "title" && section !== "description") {
//       markdownContent += `## ${capitalizeFirstLetter(section)}\n${data[section]}\n\n`;
//     }
//   });

//   return markdownContent;
// }

// module.exports = generateMarkdown;

function generateMarkdown(data) {
  const sections = Object.keys(data);
  let markdownContent = "";

  // Append title and description
  markdownContent += `# ${data.title}\n\n${data.description}\n\n`;

  // Generate license badge
  if (data.licenseBadge) {
    markdownContent += `![License](${data.licenseBadge})\n\n`;
  }

  // Generate table of contents
  markdownContent += "## Table of Contents\n";
  sections.forEach(section => {
    if (section !== "title" && section !== "description" && section !== "licenseBadge") {
      markdownContent += `- [${section.charAt(0).toUpperCase() + section.slice(1)}](#${section.toLowerCase()})\n`;
    }
  });
  markdownContent += "\n";

  // Generate markdown for each section
  sections.forEach(section => {
    if (section !== "title" && section !== "description" && section !== "licenseBadge") {
       // Format section content as code block if it's installation or tests
      if (section === "installation" || section === "tests") {
        markdownContent += `## ${section.charAt(0).toUpperCase() + section.slice(1)}\n`;
        markdownContent += "Run the following command:\n\n";
        markdownContent += "```\n";
        markdownContent += data[section] + "\n";
        markdownContent += "```\n\n";
      } else {
        markdownContent += `## ${section.charAt(0).toUpperCase() + section.slice(1)}\n${data[section]}\n\n`;
      }
    }
  });

  return markdownContent;
}

module.exports = generateMarkdown;
