module.exports = {
  use: {
    baseURL: 'https://www.aldi.hu/hu',  // Your base URL
    headless: true,                    // Run tests in headless mode (can be set to false for debugging)
    browserName: 'chromium',           // You can also use 'firefox' or 'webkit'
    screenshot: 'only-on-failure',     // Take screenshots only if a test fails
    video: 'retain-on-failure',        // Retain video only if a test fails
    trace: 'retain-on-failure',        // Record traces only on failure
  },
};
