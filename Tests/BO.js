const { By } = require("selenium-webdriver");
const testLogin = require("../Pages/login");
const BasePage = require("../Pages/Base");
const fs=require("fs");
const assert=require("assert");
const path=require("path");
const take_screenshot=require("../utilis/screenshot");

describe("CreditRight - Business Owner", function () {

    this.timeout(60000);

    let driver;
    let base;

    const email = "sudharsan.k@codingmart.com";
    const password = "12345678";
    let directory="/home/dell/Downloads/Automation/Files";

    before(async function () {
        driver = await testLogin(email, password);
        base = new BasePage(driver);
    });

    after(async function () {

        if (driver) {
            await driver.quit();
        }
    });

    afterEach(async function(){
        if(this.currentTest?.state== "failed"){
            let fileName=`Failed_${this.currentTest.fullTitle()}.png`;

            let filePath=path.join(__dirname,"../Screenshot",fileName);
            await take_screenshot(driver,filePath);
        }
    });

    it("Login - Verify Business Owner can login successfully", async function () {
        
        let url=await driver.getCurrentUrl();
        assert.ok(url.includes("/business-owner/dashboard"),"Login failed");
    });

    it("Home - Verify Home module", async function () {

        const locator = By.xpath("//*[normalize-space()='Home']");
        await base.click(locator);

        let url=await driver.getCurrentUrl();
        assert.ok(url.includes("/business-owner/dashboard"),"Failed to click home module");
    });

    it("My Products - Verify My Products module", async function () {

        const locator = By.xpath("//*[normalize-space()='My Products']");
        await base.click(locator);
        //...................
    });

    it("Customers - Verify Customers module", async function () {

        const locator = By.xpath("//*[normalize-space()='Customers']");
        await base.click(locator);

        let url=await driver.getCurrentUrl();
        assert.ok(url.includes("/business-owner/customers"),"Failed to click customers module");
    });

    it("Credit Enhancements - Verify module", async function () {

        const locator = By.xpath("//*[normalize-space()='Credit Enhancements']");
        await base.click(locator);

        let url=await driver.getCurrentUrl();
        assert.ok(url.includes("/business-owner/credit-enhancements"),"Failed to click credit enhancement module");  
        //.................      
    });

    it("Invoices - Verify Invoices module", async function () {

        const locator = By.xpath("//*[normalize-space()='Invoices']");
        await base.click(locator);

        let url=await driver.getCurrentUrl();
        assert.ok(url.includes("/bo/invoices"),"Failed to click invoice module");  

    });

    it("Applications - Verify Applications module", async function () {

        const locator = By.xpath("//*[normalize-space()='Applications']");
        await base.click(locator);

        let url=await driver.getCurrentUrl();
        assert.ok(url.includes("/business-owner/applications"),"Failed to click application module");  
    });

    it("Reports & Analytics - Download CSV report", async function () {

        await openReportsAnalytics();

        let temp=fs.readdirSync(directory);
        let n=temp.length;

        const csvButton = By.xpath('//button[contains(text(),"CSV (.csv)")]');
        await base.click(csvButton);

        await wait_for_download();
        
        let temp1=fs.readdirSync(directory);
        let n1=temp1.length;

        assert.strictEqual((n+1),n1,"Failed to download csv file");
    });

    it("Reports & Analytics - Download Excel report", async function () {

        await openReportsAnalytics();

        let temp=fs.readdirSync(directory);
        let n=temp.length;

        const excelButton = By.xpath('//button[contains(text(),"Excel")]');
        await base.click(excelButton);

        await wait_for_download();
        
        let temp1=fs.readdirSync(directory);
        let n1=temp1.length;

        assert.strictEqual((n+1),n1,"Failed to download excel file");
    });

    it("Reports & Analytics - Download PDF report", async function () {

        await openReportsAnalytics();

        let temp=fs.readdirSync(directory);
        let n=temp.length;

        const pdfButton = By.xpath('//button[contains(text(),"PDF")]');
        await base.click(pdfButton);

        await wait_for_download();
        
        let temp1=fs.readdirSync(directory);
        let n1=temp1.length;

        assert.strictEqual((n+1),n1,"Failed to download pdf file");
    });

    it("Settings - Verify Settings module", async function () {

        const locator = By.xpath("//*[normalize-space()='Settings']");
        await base.click(locator);

        let url=await driver.getCurrentUrl();
        assert.ok(url.includes("/business-owner/settings"),"Failed to click settings module"); 
    });

    it("Help - Verify Help module", async function () {

        const locator = By.xpath("//*[normalize-space()='Help']");
        await base.click(locator);

        let url=await driver.getCurrentUrl();
        assert.ok(url.includes("/business-owner/help"),"Failed to click help module"); 

    });

    it("Logout - Verify logout successfully", async function () {

        let locator = By.xpath("//*[normalize-space()='Logout']");
        await base.click(locator);

        locator=By.xpath('//input[@type="email"]');
        assert.ok(await base.isDisplayed(locator),"Failed to logout");
    });

    async function openReportsAnalytics() {
        let locator = By.xpath('//a[contains(text(),"Reports & Analytics")]');
        await base.click(locator);

        locator = By.xpath('//button[contains(text(),"Export Current View")]');
        await base.click(locator);
    }

    async function wait_for_download() {
        do{
            await new Promise(resolve => setTimeout(resolve, 2000));
        }while(fs.readdirSync(directory).some(file =>file.endsWith(".crdownload")));
    }

});
