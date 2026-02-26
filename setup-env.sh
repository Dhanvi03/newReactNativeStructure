#Usage
#npm run env:setup

#It will install react-native-dotenv and inject it into babel.config.js
#It will clear metro cache to recognize new @env module

echo "🔐 Setting up Environment Variables (@env)..."

# 1. Install the transformer
npm install react-native-dotenv --save-dev

# 2. Inject into babel.config.js
# This checks if the plugin is already there; if not, it adds it.
if ! grep -q "module:react-native-dotenv" babel.config.js; then
  echo "📝 Updating babel.config.js..."
  # Uses sed to insert the dotenv config inside the plugins array
  sed -i '' "/plugins: \[/a \\
    ['module:react-native-dotenv', {\\
      moduleName: '@env',\\
      path: '.env',\\
      safe: false,\\
      allowUndefined: true\\
    }]," babel.config.js
fi

# 3. Clear Cache (ESSENTIAL for .env changes)
echo "🧹 Clearing Metro cache to recognize new @env module..."
npx react-native start --reset-cache