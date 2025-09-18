import { test,expect } from '@playwright/test';
import { HomePage }  from '../Pages/HomePage';

test('Home Interior Design Services flow', async ({ page }) => {
  const homePage = new HomePage(page);

  await homePage.goto();
  await homePage.openMBAdviceMenu();
  await homePage.hoverFindPincode();

  const page1 = await homePage.clickFindPincodeAndHandlePopup();
  const homePage1 = new HomePage(page1);

  await homePage1.clickHomeInteriors();
  const page2 = await homePage1.clickHomeInteriorNavAndHandlePopup();

  // Assertion to check if correct page opens or not
  await expect(page2.getByText('Check out the best Interior Designers in', {exact : false})).toBeVisible({ timeout: 5000 });

  
});