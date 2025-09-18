
import { test, expect } from '@playwright/test';
import { HomePage } from '../Pages/HomePage';

test('hover and click Find Pincode', async ({ page }) => {
  const homePage = new HomePage(page);

  await homePage.goto();
  await homePage.openMBAdviceMenu();
  await homePage.hoverFindPincode();

  const popup = await homePage.clickFindPincodeAndHandlePopup();

  // Assertion to check if correct page opens or not
  await expect(popup.getByText('Pin Code Finder' , {exact:false})).toBeVisible({ timeout: 5000 });

  
  
});
















