//To run
//npm run assets:sync

//usage
//It will genrate index file for images, icons, fonts, svgIcons by scanning added assets folder

const fs = require('fs');
const path = require('path');

const ASSETS_DIR = path.join(__dirname, '../src/assets');

const config = {
    images: {
        path: path.join(ASSETS_DIR, 'images'),
        format: 'enum-require',
        enumName: 'Images',
        extensions: ['.png', '.jpg', '.jpeg', '.webp'],
    },
    icons: {
        path: path.join(ASSETS_DIR, 'icons'),
        format: 'enum-require',
        enumName: 'Icons',
        extensions: ['.png', '.jpg', '.jpeg', '.webp'],
    },
    fonts: {
        path: path.join(ASSETS_DIR, 'fonts'),
        format: 'enum-only',
        enumName: 'Fonts',
        extensions: ['.ttf', '.otf'],
    },
    svgIcons: {
        path: path.join(ASSETS_DIR, 'svgIcons'),
        format: 'svg-mapper',
        enumName: 'SVGIcons',
        mapperName: 'SVGIconsMapper',
        extensions: ['.svg'],
    },
};

const toUpperSnakeCase = (str) => {
    return str
        .replace(/\.[^/.]+$/, "") // Remove extension
        .replace(/([a-z])([A-Z])/g, '$1_$2') // camelCase/PascalCase to snake_case
        .replace(/([A-Z])([A-Z][a-z])/g, '$1_$2') // Handle cases like ABCCase -> ABC_Case
        .replace(/[-\s]/g, "_")   // Replace hyphens and spaces with underscores
        .toUpperCase();
};

const generateIndex = (folder, settings) => {
    if (!fs.existsSync(settings.path)) return;

    const files = fs.readdirSync(settings.path).filter(file => {
        const isAsset = settings.extensions.includes(path.extname(file).toLowerCase());
        const isDensitySuffix = /@\dx\./.test(file); // Matches @2x. @3x. etc.
        return isAsset && !isDensitySuffix;
    });

    let content = '';

    if (settings.format === 'enum-require') {
        content += `export enum ${settings.enumName} {\n`;
        files.forEach(file => {
            const key = toUpperSnakeCase(file);
            content += `  ${key} = require('./${file}'),\n`;
        });
        content += `}\n`;
    } else if (settings.format === 'enum-only') {
        content += `export enum ${settings.enumName} {\n`;
        files.forEach(file => {
            const key = toUpperSnakeCase(file);
            const value = file.replace(/\.[^/.]+$/, ""); // Font family name usually matches filename without extension
            content += `  ${key} = '${value}',\n`;
        });
        content += `}\n`;
    } else if (settings.format === 'svg-mapper') {
        const imports = [];
        const enumEntries = [];
        const mapperEntries = [];

        files.forEach((file, index) => {
            const key = toUpperSnakeCase(file);
            const varName = `${key}_ICON`;
            imports.push(`import ${varName} from './${file}';`);
            enumEntries.push(`  ${key} = ${index + 1},`);
            mapperEntries.push(`  ${index + 1}: ${varName},`);
        });

        content += imports.join('\n') + '\n\n';
        content += `export enum ${settings.enumName} {\n${enumEntries.join('\n')}\n}\n\n`;
        content += `export const ${settings.mapperName} = {\n${mapperEntries.join('\n')}\n};\n`;
    }

    const indexPath = path.join(settings.path, 'index.ts');
    fs.writeFileSync(indexPath, content);
    console.log(`Generated: ${indexPath}`);
};

Object.entries(config).forEach(([folder, settings]) => {
    generateIndex(folder, settings);
});

// Update main assets/index.ts
const mainIndexPath = path.join(ASSETS_DIR, 'index.ts');
const mainIndexContent = Object.keys(config)
    .filter(folder => fs.existsSync(config[folder].path))
    .map(folder => `export * from './${folder}';`)
    .join('\n') + '\n';

fs.writeFileSync(mainIndexPath, mainIndexContent);
console.log(`Updated: ${mainIndexPath}`);
