const { By } = require("selenium-webdriver");
const testLogin = require("../Pages/login");
const BasePage = require("../Pages/Base");
const assert=require("assert");
const path=require("path");
const take_screenshot=require("../utilis/screenshot");
const { title } = require("process");

describe("CreditRight - Credit Analyst", function () {
    this.timeout(60000);

    let driver;
    let base;

    const email = "yogitha.s@codingmart.com";
    const password = "12345678";

    before(async function () {
        driver = await testLogin(email, password);
        base = new BasePage(driver);
    });

    afterEach(async function(){
        if(this.currentTest?.state== "failed"){
            let fileName=`Failed_${this.currentTest.fullTitle()}.png`;

            let filePath=path.join(__dirname,"../Screenshot",fileName);
            await take_screenshot(driver,filePath);
        }
    });

    after(async function () {
        if (driver) {
            await driver.quit();
        }
    });

    it("Login - Verify Credit Analyst login", async function () {

        let url=await driver.getCurrentUrl();
        assert.ok(url.includes("/credit-analyst"),"Login failed");

    });

    it("Credit Monitoring - Verify Credit Monitoring tab", async function () {
        const locator = By.xpath("//*[normalize-space()='Credit Monitoring']");

        await base.click(locator);

        let url=await driver.getCurrentUrl();
        assert.ok(url.includes("/credit-analyst/credit-monitoring"),"Failed to click credit monitoring tab");
    });

    it("Credit Enhancements - Verify Credit Enhancements tab", async function () {
        const locator = By.xpath("//*[normalize-space()='Credit Enhancements']");

        await base.click(locator);

        let url=await driver.getCurrentUrl();
        assert.ok(url.includes("/credit-analyst/credit-enhancements"),"Failed to click credit enhancement tab");
    });

    it("Credit Monitoring - Navigate back to Credit Monitoring", async function () {
        const locator = By.xpath("//*[normalize-space()='Credit Monitoring']");

        await base.click(locator);

        let url=await driver.getCurrentUrl();
        assert.ok(url.includes("/credit-analyst/credit-monitoring"),"Failed to click credit monitoring tab");
    });

    it("Credit Monitoring - Select All option", async function () {
        await selectRiskOption("All");

        let url=await driver.getCurrentUrl();
        assert.ok(url.includes("/credit-analyst/credit-monitoring"),"Failed to all customer profiles");
    });

    it("Credit Monitoring - Select Low option", async function () {
        await selectRiskOption("Low");

        let url=await driver.getCurrentUrl();
        assert.ok(url.includes("/credit-analyst/credit-monitoring?risk=Low"),"Failed to load low risk customer profiles");
    });

    it("Credit Monitoring - Select Medium option", async function () {
        await selectRiskOption("Medium");

        let url=await driver.getCurrentUrl();
        assert.ok(url.includes("/credit-analyst/credit-monitoring?risk=Medium"),"Failed to load medium risk customer profiles");
    });

    it("Credit Monitoring - Select High option", async function () {
        await selectRiskOption("High");

        let url=await driver.getCurrentUrl();
        assert.ok(url.includes("/credit-analyst/credit-monitoring?risk=High"),"Failed to load high risk customer profiles");
    });

    it("Credit Monitoring - Select Governance", async function () {
        await selectRiskOption("Governance");

        let url=await driver.getCurrentUrl();
        assert.ok(url.includes("/credit-analyst/credit-monitoring?risk=Governance"),"Failed to load governance customer profiles");

    });

    it("Logout - Verify logout",async function () {
        let locator = By.xpath('//*[@id="root"]/div/header/div/div/div[2]/button');
        await base.click(locator);

        locator = By.xpath('//button[contains(text(),"Logout")]');
        await base.click(locator);

        locator = By.xpath('//input[@type="email"]');
        assert.ok(await base.isDisplayed(locator),"Failed to logout");
    });

    async function selectRiskOption(option) {
        const dropdown = By.xpath("//select");

        await base.click(dropdown);

        const optionLocator = By.xpath(`//option[normalize-space()='${option}']`);

        await base.click(optionLocator);
    }

    
});

