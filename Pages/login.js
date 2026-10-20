const { Builder, By, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const BasePage = require("./Base");

async function testLogin(email, password) {

    const options = new chrome.Options();

    options.addArguments('--headless=new');

    options.setUserPreferences({
        "download.default_directory":"/home/dell/Downloads/Automation/Files",
        "download.prompt_for_download": false,
        "download.directory_upgrade": true,
        
    });

    const driver = await new Builder().forBrowser("chrome").setChromeOptions(options).build();
    const session = await driver.createCDPConnection('page');

// 1. Force screen emulation size 
await session.execute('Emulation.setDeviceMetricsOverride', {
    width: 1920,
    height: 1080,
    deviceScaleFactor: 1,
    mobile: false
});

// 2. Allow downloads
await session.execute('Page.setDownloadBehavior', {
    behavior: 'allow',
    downloadPath: '/home/dell/Downloads/Automation/Files'
});

    const base = new BasePage(driver);

    try {

        await driver.get("https://test.creditright.in/login");

        await driver.sleep(1000);

        let locator = By.xpath('//input[@type="email"]');
        await base.type(locator,email,15000);

        locator = By.xpath('//input[@type="password"]');
        await base.type(locator,password,15000);

        locator = By.xpath('//button[@type="submit"]');
        await base.click(locator,15000);

        await driver.sleep(1000);

        console.log("Current URL:",await driver.getCurrentUrl());
        await driver.manage().window().maximize();
        
        await driver.sleep(1000);
        return driver;

    } catch (error) {

        console.log("\nLOGIN ERROR:");
        console.log(error);

        try {
            const screenshot =await driver.takeScreenshot();

            require("fs").writeFileSync("login-error.png",screenshot,"base64");

        } catch (screenshotError) {
            console.log("Unable to save screenshot");
        }

        await driver.quit();

        throw error;
    }
}

module.exports = testLogin;