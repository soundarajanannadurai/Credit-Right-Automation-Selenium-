const {By}=require("selenium-webdriver");
const testLogin=require("../Pages/login");
const BasePage=require("../Pages/Base");
const assert=require("assert");
const fs=require("fs");
const path=require("path");
const take_screenshot=require("../utilis/screenshot");

describe("Creditright - Finance Manager",function(){

    this.timeout(60000);

    let driver;
    let base;

    const e_mail= "dharan.g@codingmart.com";
    const password = "12345678";
    let directory="/home/dell/Downloads/Automation/Files";

    before(async function () {
        driver=await testLogin(e_mail,password);
        base=new BasePage(driver);
    });

    after(async function(){
        if(driver){
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

    it("Login - Verify FM login",async function(){
        let url=await driver.getCurrentUrl();

        assert.ok(url.includes("/finance-manager/dashboard"),"Login failed");
    });

    it("Finance Mananger - Verify Invoices module",async function(){
        let locator=By.xpath("//button[contains(text(),'Invoices')]");
        await base.click(locator);

        let url=await driver.getCurrentUrl();
        assert.ok(url.includes("/finance-manager/invoices"),"Failed to load invoice module");
        
    });

    it("Finance Mananger - Verify Escalation/Dispute module",async function(){

        let locator=By.xpath("//button[contains(text(),'Escalations/Disputes')]");
        await base.click(locator);
        
        let url=await driver.getCurrentUrl();
        assert.ok(url.includes("/finance-manager/escalations"),"Failed to load escalation module");
    });

    it("FM : My Products - Invoice Discounting module",async function(){
        await click_my_product();

        let locator=By.xpath("//button[contains(text(),'Invoice Discounting')]");
        await base.click(locator);

        let url=await driver.getCurrentUrl();
        assert.ok(url.includes("/finance-manager/invoice-discounting"),"Failed to load Invoice Discounting module in My Products");
    });

    it("FM : My Products - Capital Enablement module",async function(){
        await click_my_product();

        let locator=By.xpath("//button[contains(text(),'Capital Enablement')]");
        await base.click(locator);

        let url=await driver.getCurrentUrl();
        assert.ok(url.includes("/finance-manager/enable-capital"),"Failed to load Capital Enablement module in My Products");
    });

    it("FM : My Products - Credit Assessment module",async function(){
        await click_my_product();
        
        let locator=By.xpath("//button[contains(text(),'Credit Assessment')]");
        await base.click(locator);

        let url=await driver.getCurrentUrl();
        assert.ok(url.includes("/finance-manager/credit-assessment"),"Failed to load Credit Assessment module in My Products");
    });

    it("FM : My Products - Credit Monitoring module",async function(){
        await click_my_product();
        
        let locator=By.xpath("//button[contains(text(),'Credit Monitoring')]");
        await base.click(locator);

        let url=await driver.getCurrentUrl();
        assert.ok(url.includes("/finance-manager/credit-monitoring"),"Failed to load Credit Monitoring module in My Products");
    });

    it("FM : My Products - Credit Collection module",async function(){
        await click_my_product();
        
        let locator=By.xpath("//button[contains(text(),'Credit Collection')]");
        await base.click(locator);

        let url=await driver.getCurrentUrl();
        assert.ok(url.includes("/finance-manager/credit-collection"),"Failed to load Credit Collection module in My Products");
    });

    it("FM : My Products - Treasury Management module",async function(){
        await click_my_product();
        
        let locator=By.xpath("//button[contains(text(),'Treasury Management')]");
        await base.click(locator);

        let url=await driver.getCurrentUrl();
        assert.ok(url.includes("/finance-manager/treasury-management"),"Failed to load Treasury Management module in My Products");
    });

    it("FM : My Products - Credit Health Analytics module",async function(){
        await click_my_product();
        
        let locator=By.xpath("//button[contains(text(),'Credit Health Analytics')]");
        await base.click(locator);

        let url=await driver.getCurrentUrl();
        assert.ok(url.includes("/finance-manager/credit-health"),"Failed to load Credit Health Analytics module in My Products");
    });

    it("FM : Customers - verify and download excel file",async function(){
        await click_more();
        await click_customer_export();

        let temp=fs.readdirSync(directory);
        let n=temp.length;

        let locator=By.xpath("//button[contains(text(),'Excel (.xlsx)')]");
        await base.click(locator);

        await wait_for_download();

        let temp1=fs.readdirSync(directory);
        let n1=temp1.length;

        assert.strictEqual((n+1),n1,"Failed to download excel file");
    });

    it("FM : Customers - verify and download csv file",async function(){
        await click_more();
        await click_customer_export();

        let temp=fs.readdirSync(directory);
        let n=temp.length;

        let locator=By.xpath("//button[contains(text(),'CSV (.csv)')]");
        await base.click(locator);

        await wait_for_download();

        let temp1=fs.readdirSync(directory);
        let n1=temp1.length;

        assert.strictEqual((n+1),n1,"Failed to download csv file");
    });

    it("FM : Customers - verify and download pdf file",async function(){
        await click_more();
        await click_customer_export();

        let temp=fs.readdirSync(directory);
        let n=temp.length;

        let locator=By.xpath("//button[contains(text(),'PDF (.pdf)')]");
        await base.click(locator);

        await wait_for_download();

        let temp1=fs.readdirSync(directory);
        let n1=temp1.length;

        assert.strictEqual((n+1),n1,"Failed to download pdf file");
    });

    it("FM : More - verify Credit Enhancement module",async function(){
        await click_more();

        let locator=By.xpath("//button[contains(text(),'Credit Enhancements')]");
        await base.click(locator);

        let url=await driver.getCurrentUrl();

        assert.ok(url.includes("/finance-manager/credit-enhancements"),"Failed to load credit enhancements module");
    });

    it("FM : More - verify Application module",async function(){
        await click_more();

        let locator=By.xpath("//button[contains(text(),'Applications')]");
        await base.click(locator);

        let url=await driver.getCurrentUrl();

        assert.ok(url.includes("/finance-manager/applications"),"Failed to load application module");
    });

    it("FM : More : Reports & Analytics - Verify and download excel file",async function(){
        await click_more();
        await click_report();

        let temp=fs.readdirSync(directory);
        let n=temp.length;

        let locator=By.xpath("//button[contains(text(),'Excel (.xlsx)')]");
        await base.click(locator);

        await wait_for_download();

        let temp1=fs.readdirSync(directory);
        let n1=temp1.length;

        assert.strictEqual((n+1),n1,"Failed to download excel file");
    });

    it("FM : More : Reports & Analytics - Verify and download csv file",async function(){
        await click_more();
        await click_report();

        let temp=fs.readdirSync(directory);
        let n=temp.length;

        let locator=By.xpath("//button[contains(text(),'CSV (.csv)')]");
        await base.click(locator);

        await wait_for_download();

        let temp1=fs.readdirSync(directory);
        let n1=temp1.length;

        assert.strictEqual((n+1),n1,"Failed to download csv file");
    });

    it("FM : More : Reports & Analytics - Verify and download pdf file",async function(){
        await click_more();
        await click_report();

        let temp=fs.readdirSync(directory);
        let n=temp.length;

        let locator=By.xpath("//button[contains(text(),'PDF (.pdf)')]");
        await base.click(locator);

        await wait_for_download();

        let temp1=fs.readdirSync(directory);
        let n1=temp1.length;

        assert.strictEqual((n+1),n1,"Failed to download pdf file");
    });

    it("FM : More - verify Help module",async function(){
        await click_more();

        let locator=By.xpath("//button[contains(text(),'Help')]");
        await base.click(locator);

        let url=await driver.getCurrentUrl();

        assert.ok(url.includes("/finance-manager/help"),"Failed to load help module");
    });

    it("FM - Verify edit profile module",async function(){
        await click_profile();

        let locator=By.xpath("//button[contains(text(),'Settings')]");
        await base.click(locator);

        let url=await driver.getCurrentUrl();

        assert.ok(url.includes("/finance-manager/settings"),"Failed to load edit profile feature");
    });

    it("FM - Verify logout module",async function(){
        await click_profile();

        let locator=By.xpath("//button[contains(text(),'Logout')]");
        await base.click(locator);

        locator=By.xpath('//input[@type="email"]');
        assert.ok(await base.isDisplayed(locator),"Failed to logout");
    });



    async function click_my_product() {
        let locator=By.xpath("//button[contains(text(),'My Products')]");
        await base.click(locator);
    }

    async function click_more(){
        let locator=By.xpath("//button[contains(text(),'More')]");
        await base.click(locator);
    }

    async function click_customer_export() {
        let locator=By.xpath("//button[contains(text(),'Customers')]");
        await base.click(locator);

        locator=By.xpath("//button[contains(text(),'Export')]");
        await base.click(locator);
    }

    async function wait_for_download() {
        do{
            await new Promise(resolve => setTimeout(resolve, 2000));
        }while(fs.readdirSync(directory).some(file =>file.endsWith(".crdownload")));
    }

    async function click_report(){
        let locator=By.xpath("//button[contains(text(),'Reports & Analytics')]");
        await base.click(locator);

        locator=By.xpath("//button[contains(text(),'Export Current View')]");
        await base.click(locator);
    }

    async function click_profile(){
        let locator=By.xpath("//*[@id='root']/div/header/div/div/div[2]/button");
        await base.click(locator);
    }
    
});
