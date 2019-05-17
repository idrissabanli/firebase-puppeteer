import * as puppeteer from 'puppeteer';

export async function getBrowser(callback:Function) {
  const browser = await puppeteer.launch({
    headless: true,
    args: [
      '--disable-gpu',
      '--disable-dev-shm-usage',
      '--disable-setuid-sandbox',
      '--no-first-run',
      '--no-sandbox',
      '--no-zygote',
      '--single-process', // <- this one doesn't works in Windows
    ]
  });

  const page = await browser.newPage();
  const result = await callback(page, browser);
  await browser.close();
  return result;
}
