import { test,expect }  from '@playwright/test';
import { HomePage } from '../Pages/HomePage';
import { InteriorPage } from  '../Pages/InteriorPage';


test('BHK without entering value - Negative', async ({ page }) => {
  const homePage = new HomePage(page);

  await homePage.goto();
  await homePage.openMBAdviceMenu();
  await homePage.hoverFindPincode();

  const page1 = await homePage.clickFindPincodeAndHandlePopup();
  const homePage1 = new HomePage(page1);

  await homePage1.clickHomeInteriors();
  const page2 = await homePage1.clickHomeInteriorNavAndHandlePopup();

  const interiorPage = new InteriorPage(page2);
  await interiorPage.clickCalculateButton();
  await interiorPage.clickNextWithoutBHK();

 // Assertion to check if correct page opens or not
  await expect(page2.getByText('*Select BHK value and the corresponding size' , {exact:false})).toBeVisible({ timeout: 5000 });

  
});