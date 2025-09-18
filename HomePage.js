import { expect }  from '@playwright/test';

class HomePage {
  constructor(page) {
    this.page = page;
    //We are storing locators in a variable to reuse it 
    this.findPincodeLink = page.getByRole('link', { name: 'Find Pincode' });
    this.mbAdviceLink = page.getByRole('link', { name: 'MB Advice NEW' });
    this.homeInteriorsLink = page.getByRole('link', { name: 'Home Interiors' }).first();
    this.homeInteriorNavLink = page.locator('[href="https://www.magicbricks.com/home-interior/?inc=topnavigation"]');
  }

  //Methods to work on the tests through Page Object Model
  //--------------------------------------------------------


  // It helps to go to the website
  async goto() {
    await this.page.goto('https://www.magicbricks.com/');
    await this.page.waitForLoadState('load');
    await this.page.waitForTimeout(1000);
  }

  // Used to hover over MB Advice
  async openMBAdviceMenu() {
    await this.mbAdviceLink.click();
    await this.page.waitForTimeout(500);
  }

  // Used to hover over the Find Pincode
  async hoverFindPincode() {
    await this.findPincodeLink.hover();
    await expect(this.findPincodeLink).toBeVisible({ timeout: 5000 });
  }

  //Used to click on Find Pincode and promise is used to handle new tab
  async clickFindPincodeAndHandlePopup() {
    const popupPromise = this.page.context().waitForEvent('page');
    await this.findPincodeLink.click();
    const popup = await popupPromise;
    await popup.waitForLoadState('domcontentloaded');
    return popup;
  }

  //Used to click on home interior feature
  async clickHomeInteriors() {
    await this.homeInteriorsLink.click();
  }

  //Here promise is also used to handle the new tab
  async clickHomeInteriorNavAndHandlePopup() {
    const popupPromise = this.page.context().waitForEvent('page');
    await this.homeInteriorNavLink.click();
    const popup = await popupPromise;
    await popup.waitForLoadState('domcontentloaded');
    return popup;
  }
}

module.exports = { HomePage };
