/* eslint-disable prettier/prettier */
import puppetteer from "puppeteer";
import { fork } from "child_process";

jest.setTimeout(30000); // default puppeteer timeout

describe("test check", () => {
  let browser = null;
  let page = null;
  let server = null;
  const baseUrl = "http://localhost:8087";

  beforeAll(async () => {
    server = fork(`${__dirname}/e2e.server.js`);
    await new Promise((resolve, reject) => {
        if(server.connected) {
            process.send('ok');
            resolve()
        } else {
            reject();
        }
    });

    browser = await puppetteer.launch({
    //   headless: false, // show gui
    //   slowMo: 200,
    //   devtools: false, // show devTools
    //   // args: [`--window-size=1000,1000`],
    //   defaultViewport: {
    //     width: 1000,
    //     height: 1000,
    //   },
    });

    page = await browser.newPage();
    
  });

  afterAll(async () => {
    await browser.close();
    server.kill();
  });


  // eslint-disable-next-line jest/expect-expect
  test("validate-button onClick", async () => {
    await page.goto(baseUrl);

    const button = await page.$(".validate-button");
    button.click().catch(e => e);
    await page.waitForSelector(".modal-active");
  });

 
  test("isValid cardNumber", async () => {
    await page.goto(baseUrl);
    await page.waitForSelector('.validate-card-widjet');
    const input = await page.$(".validate-card-widjet .input-card-number");
	  await input.type("4111111111111111");
			   
    const button = await page.$(".validate-button");
    button.click();

    await page.waitForSelector('.modal-active');
	  const result = await page.evaluate(() => 
       document.querySelector(".modal__description").textContent);
    expect(result).toEqual("is Valid");
  });

  test("is not Valid cardNumber", async () => {
    await page.goto(baseUrl);
    await page.waitForSelector('.validate-card-widjet');
    const input = await page.$(".validate-card-widjet .input-card-number");
	  await input.type("41111111111111");
			   
    const button = await page.$(".validate-button");
    button.click();

    await page.waitForSelector('.modal-active');
	  const result = await page.evaluate(() => 
       document.querySelector(".modal__description").textContent);
    expect(result).toEqual("is not Valid");
  });
});