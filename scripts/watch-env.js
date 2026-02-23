#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { main: syncEnv } = require('./sync-env');

const rootDir = path.resolve(__dirname, '..');
const envPath = path.join(rootDir, '.env');

let lastModified = 0;

function getModifiedTime(filePath) {
  try {
    const stats = fs.statSync(filePath);
    return stats.mtime.getTime();
  } catch (error) {
    return 0;
  }
}

function watchEnvFile() {
  console.log('👀 Watching .env file for changes...');
  console.log('Press Ctrl+C to stop watching');
  
  lastModified = getModifiedTime(envPath);
  
  const checkInterval = setInterval(() => {
    const currentModified = getModifiedTime(envPath);
    
    if (currentModified > lastModified) {
      console.log('\n📝 .env file changed, syncing...');
      lastModified = currentModified;
      
      try {
        syncEnv();
      } catch (error) {
        console.error('❌ Error syncing environment variables:', error.message);
      }
    }
  }, 1000);
  
  process.on('SIGINT', () => {
    console.log('\n👋 Stopping file watcher...');
    clearInterval(checkInterval);
    process.exit(0);
  });
}

if (require.main === module) {
  watchEnvFile();
}

module.exports = { watchEnvFile };
