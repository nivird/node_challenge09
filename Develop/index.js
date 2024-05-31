const fs = require('fs');
const inquirer = require('inquirer');

// Array of questions for user input
const questions = [
    {
        type: 'input',
        name: 'title',
        message: 'Enter the title of your project:',
    },
    {
        type: 'input',
        name: 'description',
        message: 'Enter a description of your project:',
    },
    {
        type: 'input',
        name: 'installation',
        message: 'Enter installation instructions:',
    },
    {
        type: 'input',
        name: 'usage',
        message: 'Enter usage information:',
    },
    {
        type: 'input',
        name: 'contributing',
        message: 'Enter contribution guidelines:',
    },
    {
        type: 'input',
        name: 'tests',
        message: 'Enter test instructions:',
    },
    {
        type: 'list',
        name: 'license',
        message: 'Choose a license for your project:',
        choices: ['MIT', 'GPLv3', 'Apache 2.0', 'BSD 3-Clause'],
    },
    {
        type: 'input',
        name: 'github',
        message: 'Enter your GitHub username:',
    },
    {
        type: 'input',
        name: 'email',
        message: 'Enter your email address:',
    },
];

// Function to generate README content
function generateREADME(data) {
    const licenseBadge = {
        'MIT': '[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)',
        'GPLv3': '[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)',
        'Apache 2.0': '[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)',
        'BSD 3-Clause': '[![License](https://img.shields.io/badge/License-BSD%203--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)',
    };

    const licenseNotice = {
        'MIT': 'This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.',
        'GPLv3': 'This project is licensed under the GPLv3 License - see the [LICENSE](LICENSE) file for details.',
        'Apache 2.0': 'This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.',
        'BSD 3-Clause': 'This project is licensed under the BSD 3-Clause License - see the [LICENSE](LICENSE) file for details.',
    };

    return `
# ${data.title}
${licenseBadge[data.license]}

## Description
${data.description}

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributing](#contributing)
- [Tests](#tests)
- [Questions](#questions)

## Installation
${data.installation}

## Usage
${data.usage}

## License
${licenseNotice[data.license]}

## Contributing
${data.contributing}

## Tests
${data.tests}

## Questions
For additional questions, you can reach me via:
- GitHub: [${data.github}](https://github.com/${data.github})
- Email: ${data.email}
    `;
}

// Function to write README file
function writeToFile(fileName, data) {
    fs.writeFileSync(fileName, data);
    console.log('README.md file generated successfully!');
}

// Function to initialize app
function init() {
    inquirer.prompt(questions).then((answers) => {
        const readmeContent = generateREADME(answers);
        writeToFile('README.md', readmeContent);
    }).catch((error) => {
        console.error('Error generating README.md:', error);
    });
}

// Function call to initialize app
init();
