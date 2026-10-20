const fs=require("fs");
async function take_screenshot(driver,filepath) {
    const image= await driver.takeScreenshot();

    fs.writeFileSync(filepath,image,"base64");
}
module.exports=take_screenshot;