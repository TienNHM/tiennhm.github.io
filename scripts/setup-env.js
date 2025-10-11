#!/usr/bin/env node

/**
 * Script to create .env.local file from template
 * Usage: node scripts/setup-env.js
 */

const fs = require('fs');
const path = require('path');

const envTemplate = `# Environment Variables for Local Development
# Generated on ${new Date().toISOString()}

# Google Analytics & Tag Manager
GTAG_TRACKING_ID=G-XXXXXXXXXX
GOOGLE_TAG_MANAGER_ID=GTM-XXXXXXX
GOOGLE_SITE_VERIFICATION=your-google-site-verification-code

# Algolia Search
ALGOLIA_APP_ID=your-algolia-app-id
ALGOLIA_API_KEY=your-algolia-api-key
ALGOLIA_INDEX_NAME=your-algolia-index-name

# Canny Feedback
CANNY_BOARD_TOKEN=your-canny-board-token

# GitHub Integration
REPO_GITHUB_ID=your-github-repo-id
REPO_GITHUB=your-github-repo
REPO_GITHUB_CATEGORY_ID=your-github-category-id
`;

const envLocalPath = path.join(process.cwd(), '.env.local');

try {
  // Check if .env.local already exists
  if (fs.existsSync(envLocalPath)) {
    console.log('⚠️  .env.local already exists!');
    console.log('   If you want to overwrite it, delete the existing file first.');
    process.exit(1);
  }

  // Create .env.local file
  fs.writeFileSync(envLocalPath, envTemplate);
  
  console.log('✅ Created .env.local file successfully!');
  console.log('📝 Please update the placeholder values with your actual values:');
  console.log('');
  console.log('   - GTAG_TRACKING_ID: Your Google Analytics tracking ID');
  console.log('   - GOOGLE_TAG_MANAGER_ID: Your Google Tag Manager container ID');
  console.log('   - GOOGLE_SITE_VERIFICATION: Your Google Search Console verification code');
  console.log('   - ALGOLIA_APP_ID: Your Algolia application ID');
  console.log('   - ALGOLIA_API_KEY: Your Algolia search API key');
  console.log('   - ALGOLIA_INDEX_NAME: Your Algolia index name');
  console.log('   - CANNY_BOARD_TOKEN: Your Canny feedback board token');
  console.log('   - REPO_GITHUB_ID: Your GitHub repository ID');
  console.log('   - REPO_GITHUB: Your GitHub repository name');
  console.log('   - REPO_GITHUB_CATEGORY_ID: Your GitHub category ID');
  console.log('');
  console.log('🚀 After updating the values, you can run: npm start');
  
} catch (error) {
  console.error('❌ Error creating .env.local file:', error.message);
  process.exit(1);
}
