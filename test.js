/**
 * Created by Kristian Nielsen on 16-04-2018.
 */
var assert = require('assert');
const {Builder, By, Key, until} = require('selenium-webdriver');

// (async function example() {
//     try {
//         let driver = await new Builder().forBrowser('chrome').build();
//         await driver.get('http://www.google.com/ncr');
//         await driver.findElement(By.name('q')).sendKeys('webdriver', Key.RETURN);
//         await driver.wait(until.titleIs('webdriver - Google Search'), 1000);
//     } catch(err){
//         console.error(err)
//     } finally {
//         await driver.quit();
//     }
// })();


describe('Selenium Test Suite', function() {
    let driver;
    let greeting;

    step('Initial Setup', async function(){
        this.timeout(10000);
        return new Promise(async (resolve, reject) => {
            try {
                driver = await new Builder().forBrowser('chrome').build();
                await driver.get('localhost:3000');
                await driver.wait(until.elementLocated(By.id('tbodycars')), 10000);

                resolve();
            } catch(err){
                console.error(err);
                reject(err);
            }
        })
    });

    step('1: Data is loaded',  async function() {
        this.timeout(10000);
        return new Promise(async (resolve, reject) => {
            let elements = await driver.findElements(By.css('#tbodycars > tr'))
            assert(elements.length == 5);

            resolve();
        })
    });

    step('2: Writing in filter',  async function() {
        this.timeout(10000);
        return new Promise(async (resolve, reject) => {
            let filterEl = await driver.findElement(By.css('#filter'));
            filterEl.sendKeys('2002', Key.RETURN);

            await driver.sleep(500);

            let elements = await driver.findElements(By.css('#tbodycars > tr'));

            assert(elements.length == 2);

            resolve();
        })
    });

    step('3: Clearing the filter',  async function() {
        this.timeout(10000);
        return new Promise(async (resolve, reject) => {
            let filterEl = await driver.findElement(By.css('#filter'));
            filterEl.clear();
            filterEl.sendKeys(' ', Key.RETURN);

            await driver.sleep(500);

            let elements = await driver.findElements(By.css('#tbodycars > tr'));

            assert(elements.length == 5);

            resolve();
        })
    });

    step('4: Sorting by year',  async function() {
        this.timeout(10000);
        return new Promise(async (resolve, reject) => {
            let yearBtn = await driver.findElement(By.css('thead > tr > th:nth-child(2) > a'));
            yearBtn.click();

            await driver.sleep(500);

            let a = await driver.findElement(By.css('#tbodycars > tr:nth-child(1) > td:nth-child(1)'));
            let b = await driver.findElement(By.css('#tbodycars > tr:nth-child(1) > td:nth-child(1)'));

            let aText = await a.getText();
            let bText = await b.getText();

            assert(aText = '938')
            assert(aText = '940')

            await driver.sleep(250);

            resolve();
        })
    });

    step('5: Edit car',  async function() {
        this.timeout(10000);
        return new Promise(async (resolve, reject) => {

            const newDesc = 'Cool car';

            let editBtnSelector = '#tbodycars > tr:nth-child(1) > td:nth-child(8) > a';
            let editBtn = await driver.findElement(By.css(editBtnSelector));
            editBtn.click();

            await driver.sleep(500);

            let descInput = await driver.findElement(By.css('#description'));
            descInput.clear();

            await driver.sleep(500);

            descInput.sendKeys(newDesc);

            let submitBtnSelector = '#save';
            let submitBtn = await driver.findElement(By.css(submitBtnSelector));
            submitBtn.click();

            await driver.sleep(500);

            let rowDescription = await
                driver.findElement(By.css('#tbodycars > tr:nth-child(2) > td:nth-child(6)'));

            let rowDescText = await rowDescription.getText();

            assert(rowDescText == newDesc);

            resolve();
        })
    });

    step('6: New car error',  async function() {
        this.timeout(10000);
        return new Promise(async (resolve, reject) => {

            let newBtn = await driver.findElement(By.css('#new'));
            let saveBtn = await driver.findElement(By.css('#save'));

            newBtn.click();

            await driver.sleep(50);

            saveBtn.click();

            let errorMsg = await driver.findElements(By.css('#submiterr'));

            assert(errorMsg.length == 1);

            let elements = await driver.findElements(By.css('#tbodycars > tr'))
            assert(elements.length == 5);

            resolve();
        })
    });

    step('7: Save new car',  async function() {
        this.timeout(10000);
        return new Promise(async (resolve, reject) => {

            let newBtn = await driver.findElement(By.css('#new'));
            let saveBtn = await driver.findElement(By.css('#save'));

            newBtn.click();

            await driver.sleep(50);

            // ---

            let year = await driver.findElement(By.css('#year'));
            let registered = await driver.findElement(By.css('#registered'));
            let make = await driver.findElement(By.css('#make'));
            let model = await driver.findElement(By.css('#model'));
            let description = await driver.findElement(By.css('#description'));
            let price = await driver.findElement(By.css('#price'));

            year.sendKeys('2008');
            registered.sendKeys('2002-05-05');
            make.sendKeys('Kia');
            model.sendKeys('Rio');
            description.sendKeys('Mint condition');
            price.sendKeys('31000');

            // ---

            await driver.sleep(1000);

            saveBtn.click();

            await driver.sleep(500);

            let elements = await driver.findElements(By.css('#tbodycars > tr'))
            assert(elements.length == 6);

            resolve();
        })
    });
});