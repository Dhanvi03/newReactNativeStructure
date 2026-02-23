#!/bin/bash

# Usage: 
# ./setup-navigation.sh standard   (Stack + Bottom Tab ONLY)
# ./setup-navigation.sh full       (Stack + Bottom Tab + Drawer)

TYPE=$1

if [ "$TYPE" != "standard" ] && [ "$TYPE" != "full" ]; then
  echo "❌ Please specify type: 'standard' or 'full'"
  echo "Usage: ./setup-navigation.sh standard | full"
  exit 1
fi

echo "🚀 Starting $TYPE navigation setup using npm..."

# 1. Base Dependencies
PACKAGES="@react-navigation/native @react-navigation/native-stack @react-navigation/bottom-tabs react-native-screens react-native-safe-area-context"

# 2. Logic for Full (Drawer) vs Standard
if [ "$TYPE" == "full" ]; then
  echo "📦 Adding Drawer and Reanimated..."
  PACKAGES="$PACKAGES @react-navigation/drawer react-native-reanimated react-native-gesture-handler"
  
  # Add Reanimated plugin to babel.config.js if missing
  grep -q "react-native-reanimated/plugin" babel.config.js || sed -i '' "/plugins: \[/a \
    'react-native-reanimated/plugin'," babel.config.js
else
  echo "🧹 Standard mode: Ensuring Reanimated plugin is removed from babel.config.js..."
  # Remove the Reanimated line to prevent "Module not found" errors
  sed -i '' "/react-native-reanimated\/plugin/d" babel.config.js
fi

# 3. Install via npm
npm install $PACKAGES

# 4. Android Native Patch (MainActivity)
echo "🤖 Patching Android MainActivity..."
APP_NAME=$(node -p "require('./app.json').name")

if [ -f "android/app/src/main/java/com/${APP_NAME,,}/MainActivity.kt" ]; then
    FILE_PATH="android/app/src/main/java/com/${APP_NAME,,}/MainActivity.kt"
    grep -q "import android.os.Bundle" "$FILE_PATH" || sed -i '' '1s/^/import android.os.Bundle;\n/' "$FILE_PATH"
    grep -q "override fun onCreate" "$FILE_PATH" || sed -i '' '/class MainActivity/a \
    override fun onCreate(savedInstanceState: Bundle?) {\
        super.onCreate(null)\
    }' "$FILE_PATH"
else
    FILE_PATH="android/app/src/main/java/com/${APP_NAME,,}/MainActivity.java"
    grep -q "import android.os.Bundle" "$FILE_PATH" || sed -i '' 's/package/import android.os.Bundle;\npackage/' "$FILE_PATH"
    grep -q "protected void onCreate" "$FILE_PATH" || sed -i '' '/public class MainActivity/a \
    @Override\
    protected void onCreate(Bundle savedInstanceState) {\
        super.onCreate(null);\
    }' "$FILE_PATH"
fi

# 5. iOS Pods (using npx to ensure cocoapods is found)
if [ -d "ios" ]; then
  echo "🍎 Running Pod Install..."
  cd ios && pod install && cd ..
fi

echo "✨ Done! Running 'npx react-native start --reset-cache' is recommended."