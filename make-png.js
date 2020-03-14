const puppeteer = require('puppeteer');

async function main() {
    const server = require('child_process').spawn('npm', ['run', 'web:start']);
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    page.setViewport({ width: 1280, height: 720 });
    await page.waitFor(1000);
    await page.goto('http://localhost:5000', {waitUntil: 'networkidle2'});
    await page.emulateMediaType('screen');
    const element = await page.$('.container');
    await element.screenshot({path: 'dist/horarios.png'});
    console.log('Created dist/horarios.png')

    server.kill();
    await browser.close();
}

main();