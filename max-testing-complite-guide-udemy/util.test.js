//jest.mock('./http');
//jest.mock('./axios'); this is not needed, will be run automatically

const puppeteer = require('puppeteer');
const { generateText, checkAndGenerate, loadTitle } = require('./util'); // mora ovako, ne sa import mada moze da se podesi

test('should output name and age', () => {
	const text1 = generateText('Zoki', 36);
	expect(text1).toBe('Zoki (36 years old)');

	const text2 = generateText('Jeka', 33);
	expect(text2).toBe('Jeka (33 years old)');
});

// avoid false positives
test('should output data-less text', () => {
	const text1 = generateText('', null);
	expect(text1).toBe(' (null years old)');

	const text2 = generateText();
	expect(text2).toBe('undefined (undefined years old)');
});

// integration test for combining functions, function which call other function
test('should generate a valid text output', () => {
	const text1 = checkAndGenerate('Zoran', 36);
	expect(text1).toBe('Zoran (36 years old)');
});

// E2E testing with puppeteer, will test in Browser
test('should create an element with text and correct class', async () => {
	const browser = await puppeteer.launch({
		headless: true, // false (to run Browser)
		//slowMo: 80,
		//args: ['--window-size=1920,1080'],
	});
	const page = await browser.newPage();
	await page.goto(
		'file:///Users/zoran/zoran-git/js-jest-untit-testing/max-testing-complite-guide-udemy/index.html'
	);
	await page.click('input#name');
	await page.type('input#name', 'Zoki');
	await page.click('input#age');
	await page.type('input#age', '44');
	await page.click('#btnAddUser');
	const finalText = await page.$eval('.user-item', (el) => el.textContent);
	expect(finalText).toBe('Zoki (44 years old)');
}, 10000);

// lecture 5, async tests
test('should print an uppercase text', () => {
	// instead using fetch we need to MOCK it!!!
	loadTitle().then((title) => {
		expect(title).toBe('DELECTUS AUT AUTEM');
	});
});
