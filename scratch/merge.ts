import * as fs from 'fs';
import * as path from 'path';

const oldDictContent = fs.readFileSync(path.join(process.cwd(), 'scratch/old_dict.ts'), 'utf8');
const currDictContent = fs.readFileSync(path.join(process.cwd(), 'src/lib/i18n/dictionary.ts'), 'utf8');

function extractObject(tsCode: string) {
    const match = tsCode.match(/export const DICTIONARY\s*=\s*(\{[\s\S]*?\n\});?\s*(?:export type|$)/);
    if (match && match[1]) {
        try {
            const func = new Function(`return ${match[1]}`);
            return func();
        } catch(e) {
            console.error("Eval failed", e);
            return null;
        }
    }
    return null;
}

const oldObj = extractObject(oldDictContent);
const currObj = extractObject(currDictContent);

if (!oldObj || !currObj) {
    console.error("Could not extract objects!");
    process.exit(1);
}

const keysToRestore = ['testimonials', 'faq', 'pricing', 'footer', 'cta', 'showcase', 'hero'];

for (const lang of Object.keys(currObj)) {
    if (oldObj[lang]) {
        for (const key of keysToRestore) {
            if (oldObj[lang][key]) {
                currObj[lang][key] = oldObj[lang][key];
            }
        }
    }
}

// Ensure nl and zh get English values for the restored keys if they are missing
for (const lang of ['nl', 'zh']) {
    if (currObj[lang] && oldObj['en']) {
        for (const key of keysToRestore) {
            if (!currObj[lang][key] || Object.keys(currObj[lang][key]).length < 2) {
                // If it's stubbed or missing, fill it with English
                currObj[lang][key] = oldObj['en'][key];
            }
        }
    }
}

const mergedStr = JSON.stringify(currObj, null, 4);

const finalCode = `export type Language = 'fr' | 'en' | 'es' | 'ar' | 'nl' | 'zh';

export const DICTIONARY = ${mergedStr};

export type DictionaryShape = typeof DICTIONARY['fr'];
`;

fs.writeFileSync(path.join(process.cwd(), 'src/lib/i18n/dictionary.ts'), finalCode);
console.log("Dictionary successfully surgically merged!");
