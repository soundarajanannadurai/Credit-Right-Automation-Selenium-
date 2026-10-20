const { until } = require("selenium-webdriver");

class BasePage {
    constructor(driver) {
        this.driver = driver;
    }

    async find(locator, time = 15000) {
        return await this.driver.wait(until.elementLocated(locator), time);
    }

    async wait_for_element(locator, time = 15000) {
        return await this.driver.wait(until.elementLocated(locator), time);
    }

    async wait_for_visible(locator, time = 15000) {
        let element=await this.find(locator, time);
        return await this.driver.wait(until.elementIsVisible(element), time);
    }

    async type(locator, text, time = 15000) {
        let lastError;

        for (let attempt = 1; attempt <= 5; attempt++) {
            try {

                const element = await this.find(locator, time);
                await this.driver.wait(until.elementIsVisible(element), time);

                await element.click();
                await element.clear();
                await element.sendKeys(text);

                return;
            } catch (error) {
                lastError = error;

                if (error.name === "StaleElementReferenceError" || error.constructor?.name === "StaleElementReferenceError") {
                    console.log("Element became stale while typing. Retrying...");
                    await this.driver.sleep(500);
                    continue;
                }

                throw error;
            }
        }

        throw lastError;
    }

    async replace(locator, text, time = 15000) {
        let lastError;

        for (let attempt = 1; attempt <= 5; attempt++) {
            try {
                const element = await this.find(locator, time);
                await this.driver.wait(until.elementIsVisible(element), time);

                await element.click();
                await element.clear();
                await element.sendKeys(text);

                return;
            } catch (error) {
                lastError = error;

                if (error.name === "StaleElementReferenceError") {
                    await this.driver.sleep(500);
                    continue;
                }

                throw error;
            }
        }

        throw lastError;
    }

    async click(locator, time = 15000) {
        let lastError;

        for (let attempt = 1; attempt <= 5; attempt++) {
            try {
                const element = await this.find(locator, time);
                await this.driver.wait(until.elementIsVisible(element), time);
                await element.click();

                return;
            } catch (error) {
                lastError = error;

                if (error.name === "StaleElementReferenceError" || error.constructor?.name === "StaleElementReferenceError") {
                    await this.driver.sleep(500);
                    continue;
                }

                throw error;
            }
        }

        throw lastError;
    }

    async isDisplayed(locator, time = 10000) {
        try {
            const element = await this.find(locator, time);
            return await element.isDisplayed();
        } catch (error) {
            return false;
        }
    }
}

module.exports = BasePage;
