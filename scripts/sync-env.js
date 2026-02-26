//To run
//npm run env:async

//usage
//It will sync .env file to .env.d.ts and .env.production
//It will keep existing production value if it exists
//It will use development value for new variables
const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const envPath = path.join(rootDir, '.env');
const envDtsPath = path.join(rootDir, '.env.d.ts');
const envProdPath = path.join(rootDir, '.env.production');

function parseEnvFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');
    const variables = {};
    
    lines.forEach(line => {
      line = line.trim();
      if (line && !line.startsWith('#')) {
        const equalIndex = line.indexOf('=');
        if (equalIndex > 0) {
          const key = line.substring(0, equalIndex).trim();
          const value = line.substring(equalIndex + 1).trim();
          variables[key] = value;
        }
      }
    });
    
    return variables;
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error.message);
    return {};
  }
}

function generateEnvDts(variables) {
  const keys = Object.keys(variables).sort();
  const exports = keys.map(key => `  export const ${key}: string;`).join('\n');
  
  return `declare module '@env' {
${exports}
}
`;
}

function updateEnvProduction(variables) {
  try {
    const existingProd = parseEnvFile(envProdPath);
    
    // Keep only variables that exist in the main .env file
    const updatedVariables = {};
    Object.keys(variables).forEach(key => {
      if (existingProd.hasOwnProperty(key)) {
        // Keep existing production value if it exists
        updatedVariables[key] = existingProd[key];
      } else {
        // Use development value for new variables
        updatedVariables[key] = variables[key];
      }
    });
    
    const lines = Object.keys(updatedVariables)
      .sort()
      .map(key => `${key}=${updatedVariables[key]}`)
      .join('\n');
    
    fs.writeFileSync(envProdPath, lines + '\n');
    console.log('✅ Updated .env.production');
  } catch (error) {
    console.error('Error updating .env.production:', error.message);
  }
}

function main() {
  console.log('🔄 Syncing environment variables...');
  
  const envVariables = parseEnvFile(envPath);
  
  if (Object.keys(envVariables).length === 0) {
    console.log('❌ No variables found in .env file');
    process.exit(1);
  }
  
  const envDtsContent = generateEnvDts(envVariables);
  
  try {
    fs.writeFileSync(envDtsPath, envDtsContent);
    console.log('✅ Updated .env.d.ts');
  } catch (error) {
    console.error('Error updating .env.d.ts:', error.message);
    process.exit(1);
  }
  
  updateEnvProduction(envVariables);
  
  console.log(`✅ Synced ${Object.keys(envVariables).length} environment variables`);
}

if (require.main === module) {
  main();
}

module.exports = { main };
