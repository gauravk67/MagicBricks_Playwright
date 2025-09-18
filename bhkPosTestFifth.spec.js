import { test,expect } from '@playwright/test';
import { HomePage } from '../Pages/HomePage';
import { InteriorPage } from '../Pages/InteriorPage';
import {getExcelData} from '../Utils/excelReader';


const testData = getExcelData('tests/Data/testData.xlsx','Sheet1')
const data = testData[0]


test('BHK with values - Positive flow', async ({ page }) => {
  const homePage = new HomePage(page);
  await page.pause();

  await homePage.goto();
  await homePage.openMBAdviceMenu();
  await homePage.hoverFindPincode();

  const page1 = await homePage.clickFindPincodeAndHandlePopup();
  const homePage1 = new HomePage(page1);

  await homePage1.clickHomeInteriors();
  const page2 = await homePage1.clickHomeInteriorNavAndHandlePopup();
  
  console.log("datattat",data.A);
  const interiorPage = new InteriorPage(page2);
  await interiorPage.clickCalculateButton();
  await interiorPage.proceedToBHKSelection();
  await interiorPage.selectBHKAndSize(data.B);

  // Assertion to check if correct page opens or not
  await expect(page2.getByText('Just a few more details for your estimate', { exact: false })).toBeVisible({ timeout: 5000 });

  
})