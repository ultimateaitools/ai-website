const fs = require('fs');
const prompts = JSON.parse(fs.readFileSync('prompts.json', 'utf8')).prompts;

const variations = [
    "This specifically engineered AI command is tailored to systematically eliminate the guesswork from your daily routines.",
    "By leveraging this highly optimized query structure, you bypass the generic, low-quality responses typical of basic interactions.",
    "Professionals across the industry rely on this exact framework to consistently produce results that meet high standards, every single time."
];

const whenToUseVariations = [
    "Deploy this specific query whenever you are facing an impending deadline and need foundational logic immediately.",
    "It is most effective when you are transitioning from the brainstorming phase directly into active production.",
    "Turn to this structural command when you are feeling blocked, uninspired, or simply overwhelmed with blank-page syndrome.",
    "Use this precisely when consistent formatting and structured data are non-negotiable for your current project delivery."
];

let contentLines = [
    "export const promptContentData: Record<string, { description: string, whatItDoes: string[], whenToUse: string[] }> = {"
];

prompts.forEach((p, index) => {
    const intro = `The ${p.title} is a sophisticated, pre-tested instruction template designed exclusively for generating highly accurate ${p.outputType.toLowerCase()} outputs. Unlike typing a single sentence into ChatGPT or Claude, this structured approach provides the AI with the precise context, tone parameters, and necessary constraints required to act as an expert. This results in output that is drastically more usable, requiring minimal human editing before deployment.`;

    const middlePara = variations[index % variations.length];

    const when1 = whenToUseVariations[index % whenToUseVariations.length];
    const when2 = `Most professionals specializing in ${p.category.replace('-', ' ')} utilize this exact phrasing to instruct large language models accurately, ensuring the final deliverable speaks clearly directly to their target audience.`;

    const whatItDoesArray = [
        `"${intro}"`,
        `"${middlePara}"`,
        `"It structurally commands the AI to focus entirely on producing a premium ${p.outputType.toLowerCase()}, taking into account the industry best practices specific to your provided inputs."`
    ];

    const whenToUseArray = [
        `"${when1}"`,
        `"${when2}"`,
        `"Additionally, it is the perfect starting point when you need to establish a rapid prototype or a sturdy first draft to iterate upon with your team."`
    ];

    const desc = `Use this free, expertly crafted AI prompt to generate high-quality ${p.outputType.toLowerCase()} rapidly. This command provides perfect framing so ChatGPT or similar models output exactly what ${p.bestFor.toLowerCase()} need without endless back-and-forth iteration.`;

    contentLines.push(`  "${p.slug}": {`);
    contentLines.push(`    description: "${desc}",`);
    contentLines.push(`    whatItDoes: [\n      ${whatItDoesArray.join(',\n      ')}\n    ],`);
    contentLines.push(`    whenToUse: [\n      ${whenToUseArray.join(',\n      ')}\n    ]`);
    contentLines.push(`  }${index === prompts.length - 1 ? '' : ','}`);
});

contentLines.push("};\n");

fs.writeFileSync('./src/lib/promptContentData.ts', contentLines.join('\n'));
console.log('promptContentData.ts generated.');
