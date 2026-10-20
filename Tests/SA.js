const {By , Select}=require("selenium-webdriver");
const testLogin=require("../Pages/login");
const BasePage=require("../Pages/Base");
const assert=require("assert");
const path=require("path");
const take_screenshot=require("../utilis/screenshot");


describe("Creditright - System Admin",function(){

    this.timeout(60000);

    let driver;
    let base;

    const e_mail= "admin@creditright.com";
    const password = "mto38ppSXpbxvZy5";

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

    it("System Admin - Verify login",async function(){
        let url=await driver.getCurrentUrl();

        assert.ok(url.includes("/admin/"),"Failed to login as Admin");
    });

    it("SA - verify business and add business module",async function(){
        let locator=By.xpath('//button[@class="relative px-4 py-2 text-sm font-medium bg-white focus:outline-none group border-0 transition-colors text-blue-600" and contains(text(),"Business")]');
        await base.click(locator);

        let url =await driver.getCurrentUrl();
        assert.ok(url.includes("/admin/external-team"),"Failed to click business module");

        locator=By.xpath('//button[contains(text(),"Add Business")]');
        await base.click(locator);

        let BO_name=By.xpath('//input[@placeholder="Enter Business Owner Name"]');
        await base.type(BO_name,"Soundar");

        let email=By.xpath('//input[@placeholder="User@Company.com"]');
        await base.type(email,"asn@gmail.com");

        let number=By.xpath('//input[@placeholder="Enter 10 Digit Mobile Number"]');
        await base.type(number,"7418609140");

        let cfo=By.xpath('//input[@placeholder="Enter CFO Name"]');
        await base.type(cfo,"JPN");

        let cfo_number=By.xpath('//input[@placeholder="Enter CFO Phone Number"]');
        await base.type(cfo_number,"9500605594");

        let cfo_email=By.xpath('//input[@placeholder="Enter CFO Email"]');
        await base.type(cfo_email,"jp@gmail.com");

        let gst=By.xpath('//input[@placeholder="27AAPFU0939F1ZV"]');
        await base.type(gst,"27ABCDE1234F1Z5");

        let cin=By.xpath('//input[@placeholder="L12345MH2020PLC123456"]');
        await base.type(cin,"L12345MH2020PLC123456");

        let company=By.xpath('//input[@placeholder="Enter Business Legal Name"]');
        await base.type(company,"ASN");

        let year=By.xpath('//input[@placeholder="2026"]');
        await base.type(year,"2025");

        let date=By.xpath('//input[@name="accountingYearEndDate"]');
        await base.type(date,"2026-06-25");

        let address=By.xpath('//input[@placeholder="Enter Business Address"]');
        await base.type(address,"2/78 , coimbatore,tamil nadu , india");

        let type=By.xpath('//input[@placeholder="eg: Manufacturing.."]');
        await base.type(type,"Finance");

        let income=By.xpath('//input[@name="annualTurnover"]');
        await base.type(income,"50000");

        let invoice=By.xpath('//input[@name="monthlyInvoiceVolume"]');
        await base.type(invoice,"100");

        let period=By.xpath('//input[@name="creditPeriod"]');
        await base.type(period,"25");

        let limit=By.xpath('//input[@name="defaultCreditLimit"]');
        await base.type(limit,"5000");

        let business_limit=By.xpath('//input[@name="businessCreditLimit"]');
        await base.type(business_limit,"25000");

        let google_login=By.xpath('//*[@id="root"]/div/div[2]/div/div[2]/div[4]/div[2]/div/label[2]');
        await base.click(google_login);

        let notification=By.xpath('//*[@id="root"]/div/div[2]/div/div[2]/div[5]/div[2]/div[1]/label[2]');
        await base.click(notification);

        locator=By.xpath('//button[@type="button" and contains(text(),"Cancel")]');
        await base.click(locator);

    });

    it("SA - verify internal team module and add internal user feature",async function(){
        let locator=By.xpath('//button[contains(text(),"Internal Team")]');
        await base.click(locator);

        locator=By.xpath('//button[contains(text(),"Add Internal User")]');
        await base.click(locator);

        let first_name=By.xpath('//input[@name="firstName"]');
        await base.type(first_name,"Soundar");

        let last_name=By.xpath('//input[@name="lastName"]');
        await base.type(last_name,"Rajan");

        let email=By.xpath('//input[@name="emailAddress"]');
        await base.type(email,"asn@gmail.com");

        let number=By.xpath('//input[@name="phoneNumber"]');
        await base.type(number,"9095946639");

        locator=By.xpath('//select[@title="role" and @name="role"]');
        let dropdown=await base.wait_for_visible(locator);

        let select=new Select(dropdown);
        await select.selectByVisibleText("Customer Experience Executive");

        locator=By.xpath('//button[@type="button" and contains(text(),"Cancel")]');
        await base.click(locator);

        let url=await driver.getCurrentUrl();
        assert.ok(url.includes("/admin/internal-team"),"Failed to click internal team module");
    });

    it("SA : Invoices - Verify all invoices",async function(){
        await click_invoices();

        let option = await base.wait_for_visible(By.xpath('//select[@title="select"]//option[contains(text(),"All")]'));
        await option.click();

        let url=await driver.getCurrentUrl();

        assert.ok(url.includes("/admin/tickets"),"Failed to view all invoices");
    });

    it("SA : Invoices - Verify paid invoices",async function(){
        await click_invoices();

        let option = await base.wait_for_visible(By.xpath('//select[@title="select"]//option[contains(text(),"Paid")]'));
        await option.click();

        let url=await driver.getCurrentUrl();

        assert.ok(url.includes("/admin/tickets?status=PAID"),"Failed to view paid invoices");
    });

    it("SA : Invoices - Verify overdue invoices",async function(){
        await click_invoices();

        let option = await base.wait_for_visible(By.xpath('//select[@title="select"]//option[contains(text(),"Overdue")]'));
        await option.click();
        await driver.sleep(10000);

        let url=await driver.getCurrentUrl();
        console.log(url);

        assert.ok(url.includes("/admin/tickets?status=OVERDUE"),"Failed to view overdue invoices");
    });

    it("SA : Invoices - Verify active PTP invoices",async function(){
        let dropdown =await click_invoices();

        let option = await base.wait_for_visible(By.xpath('//select[@title="select"]//option[contains(text(),"Active PTP")]'));
        await option.click();
        await driver.sleep(10000);

        let url=await driver.getCurrentUrl();
        console.log(url);

        assert.ok(url.includes("/admin/tickets?status=PTP"),"Failed to view active PTP invoices");
    });

    it("Logout - Verify logout",async function () {
        let locator = By.xpath('//*[@id="root"]/div/header/div/div[2]/div/button');
        await base.click(locator);

        locator = By.xpath('//button[contains(text(),"Logout")]');
        await base.click(locator);

        locator = By.xpath('//input[@type="email"]');
        assert.ok(await base.isDisplayed(locator),"Failed to logout");
    });

    async function click_invoices() {
        let locator=By.xpath('//button[contains(text(),"Invoices")]');
        await base.click(locator);
    }
});