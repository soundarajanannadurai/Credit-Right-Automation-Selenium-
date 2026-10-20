const {By}=require("selenium-webdriver");
const testLogin=require("../Pages/login");
const BasePage=require("../Pages/Base");
const assert=require("assert");
const path=require("path");
const take_screenshot=require("../utilis/screenshot");

describe("Creditright - Customer Success Manager",function(){

    this.timeout(60000);

    let driver;
    let base;

    const e_mail= "gireeshaarella4@gmail.com";
    const password = "12345678";

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

    it("Login - Verify CSM login",async function(){
        let url=await driver.getCurrentUrl();

        assert.ok(url.includes("/credit-success-manager/"),"Login failed");
    });

    it("Collections - Verify overview",async function(){
        let locator=By.xpath("//button[contains(text(),'Collection')]");
        let element= await base.wait_for_visible(locator);

        await driver.actions().move({origin: element}).perform();

        locator=By.xpath("//button[contains(text(),'Overview')]");
        await base.click(locator);

        let url=await driver.getCurrentUrl();
        assert.ok(url.includes("/collections/overview"),"Click overview module is failed");

    });

    it("Collections - Verify team performance",async function(){
        let locator=By.xpath("//button[contains(text(),'Collection')]");
        let element=await base.wait_for_visible(locator);

        await driver.actions().move({origin: element}).perform();

        locator=By.xpath("//button[contains(text(),'Team Performance')]");
        await base.click(locator);

        let url=await driver.getCurrentUrl();
        assert.ok(url.includes("/collections/team-performance"),"Click team performance module is failed");

    });

    it("Collections - Verify weekly review",async function(){
        let locator=By.xpath("//button[contains(text(),'Collection')]");
        let element=await base.wait_for_visible(locator);

        await driver.actions().move({origin: element}).perform();

        locator=By.xpath("//button[contains(text(),'Weekly Review')]");
        await base.click(locator);

        let url=await driver.getCurrentUrl();
        assert.ok(url.includes("/collections/weekly-review"),"Click weekly review module is failed");

    });

    it("Credit Monitoring - Verify credit monitoring module",async function(){
        await click_Credit_Monitoring();

        let url=await driver.getCurrentUrl();
        assert.ok(url.includes("/credit-success-manager/credit-monitoring"),"Click credit monitoring module is failed");
    });

    it("Credit Monitoring - View low risk customer profiles",async function(){
        await click_Credit_Monitoring();

        let dropdown= By.xpath('//select[@title="Risk Filter"]');
        await base.click(dropdown);

        let locator=By.xpath("//option[@value='Low']");
        await base.click(locator);

        let url=await driver.getCurrentUrl();
        assert.ok(url.includes("/credit-monitoring?risk=Low"),"Failed to view low risk customers");
    });

    it("Credit Monitoring - View medium risk customer profiles",async function(){
        await click_Credit_Monitoring();

        let dropdown= By.xpath('//select[@title="Risk Filter"]');
        await base.click(dropdown);

        let locator=By.xpath("//option[@value='Medium']");
        await base.click(locator);

        let url=await driver.getCurrentUrl();
        assert.ok(url.includes("/credit-monitoring?risk=Medium"),"Failed to view medium risk customers");
    });

    it("Credit Monitoring - View high risk customer profiles",async function(){
        await click_Credit_Monitoring();

        let dropdown= By.xpath('//select[@title="Risk Filter"]');
        await base.click(dropdown);

        let locator=By.xpath("//option[@value='High']");
        await base.click(locator);

        let url=await driver.getCurrentUrl();
        assert.ok(url.includes("/credit-monitoring?risk=High"),"Failed to view high risk customers");
    });

    it("Credit Monitoring - View governance risk customer profiles",async function(){
        await click_Credit_Monitoring();

        let dropdown= By.xpath('//select[@title="Risk Filter"]');
        await base.click(dropdown);

        let locator=By.xpath("//option[@value='Governance']");
        await base.click(locator);

        let url=await driver.getCurrentUrl();
        assert.ok(url.includes("/credit-monitoring?risk=Governance"),"Failed to view governance risk customers");
    });

    it("Escalation/Dispute - Verify escalation feature",async function(){
        let locator=By.xpath("//button[contains(text(),'Escalations/Disputes')]");
        await base.click(locator);

        let dropdown=By.xpath("//select[@title='mode']");
        await base.click(dropdown);

        locator=By.xpath("//option[@value='Escalate']");
        await base.click(locator);

        let url=await driver.getCurrentUrl();
        assert.ok(url.includes("/credit-success-manager/escalations"),"Failed to click escalation feature");
    });

    it("Escalation/Dispute - Verify dispute feature",async function(){
        let locator=By.xpath("//button[contains(text(),'Escalations/Disputes')]");
        await base.click(locator);

        let dropdown=By.xpath("//select[@title='mode']");
        await base.click(dropdown);

        locator=By.xpath("//option[@value='Dispute']");
        await base.click(locator);

        let url=await driver.getCurrentUrl();
        assert.ok(url.includes("/credit-success-manager/escalations"),"Failed to click Dispute feature");
    });

    it("Credit Enhancement - verify all credit enhancements",async function(){
        await click_credit_enhancement();

        let locator=By.xpath("//option[@value='All']");
        await base.click(locator);

        let url=await driver.getCurrentUrl();
        assert.ok(url.includes("/credit-success-manager/credit-enhancements"),"Failed to load all credit enhancements");
    });

    it("Credit Enhancement - verify pending review credit enhancements",async function(){
        await click_credit_enhancement();

        let locator=By.xpath("//option[@value='Pending Review']");
        await base.click(locator);

        let url=await driver.getCurrentUrl();
        assert.ok(url.includes("/credit-success-manager/credit-enhancements?status=Pending+Review"),"Failed to load pending review credit enhancements");
    });

    it("Credit Enhancement - verify under recommendation credit enhancements",async function(){
        await click_credit_enhancement();

        let locator=By.xpath("//option[@value='Under Recommendation']");
        await base.click(locator);

        let url=await driver.getCurrentUrl();
        assert.ok(url.includes("/credit-success-manager/credit-enhancements?status=Under+Recommendation"),"Failed to load under recommendation credit enhancements");
    });

    it("Credit Enhancement - verify 'Sent Back to CA' credit enhancements",async function(){
        await click_credit_enhancement();

        let locator=By.xpath("//option[@value='Sent Back to CA']");
        await base.click(locator);

        let url=await driver.getCurrentUrl();
        assert.ok(url.includes("/credit-success-manager/credit-enhancements?status=Sent+Back+to+CA"),"Failed to load 'Sent Back to CA' credit enhancements");
    });

    it("Credit Enhancement - verify 'Forwarded to BO' credit enhancements",async function(){
        await click_credit_enhancement();

        let locator=By.xpath("//option[@value='Forwarded to BO']");
        await base.click(locator);

        let url=await driver.getCurrentUrl();
        assert.ok(url.includes("/credit-success-manager/credit-enhancements?status=Forwarded+to+BO"),"Failed to load 'Forwarded to BO' credit enhancements");
    });

    it("Credit Enhancement - verify completed credit enhancements",async function(){
        await click_credit_enhancement();

        let locator=By.xpath("//option[@value='Completed']");
        await base.click(locator);

        let url=await driver.getCurrentUrl();
        assert.ok(url.includes("/credit-success-manager/credit-enhancements?status=Completed"),"Failed to load completed credit enhancements");
    });

    it("Logout - Verify logout",async function(){
        let locator=By.xpath("//*[@id='root']/div/header/div/div/div[2]/button");
        await base.click(locator);

        locator=By.xpath("//button[contains(text(),'Logout')]");
        await base.click(locator);

        locator=By.xpath('//input[@type="email"]');

        assert.ok(await base.isDisplayed(locator),"Failed to logout");

    });


    async function click_Credit_Monitoring() {
        let locator=By.xpath("//button[contains(text(),'Credit Monitoring')]");
        await base.click(locator);
    }

    async function click_credit_enhancement() {
        let locator=By.xpath("//button[contains(text(),'Credit Enhancements')]");
        await base.click(locator);

        let dropdown=By.xpath("//select[@title='statusFilter']");
        await base.click(dropdown);
    }
});