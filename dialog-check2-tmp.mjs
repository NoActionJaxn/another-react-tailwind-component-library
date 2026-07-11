import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 900, height: 600 } });
const errors = [];
page.on('pageerror', (e) => errors.push(String(e)));

await page.goto('http://localhost:6006/iframe.html?id=ui-dialog--dialog&viewMode=story');
await page.waitForTimeout(800);

await page.getByRole('button', { name: 'Edit profile' }).first().click();
await page.waitForTimeout(400);
await page.getByRole('button', { name: 'Close' }).click();
await page.waitForTimeout(700);
console.log('Closed after X click (should be false):', await page.evaluate(() => !!document.querySelector('.another-dialog-content')));

await page.getByRole('button', { name: 'Edit profile' }).first().click();
await page.waitForTimeout(400);
await page.mouse.click(10, 10);
await page.waitForTimeout(700);
console.log('Closed after overlay click (should be false):', await page.evaluate(() => !!document.querySelector('.another-dialog-content')));

await page.getByRole('button', { name: 'Edit profile' }).first().click();
await page.waitForTimeout(400);
await page.keyboard.press('Escape');
await page.waitForTimeout(700);
console.log('Closed after Escape (should be false):', await page.evaluate(() => !!document.querySelector('.another-dialog-content')));

console.log('page errors:', errors);
await browser.close();
