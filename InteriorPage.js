import {expect} from '@playwright/test';

class InteriorPage {
  constructor(page) {
    this.page = page;
    // We are storing locators in variable to reuse it
    this.calculateButton = page.locator('[class="cta-medium arrow-icn"]').first();
    this.bhkLocator = page.locator('.radioCard__content--data ');
    this.nextButton = page.getByRole('button', { name: 'Next' });
    this.bhkSizeDropdown = page.locator('#smallbhk');
    this.timelineOption = page.getByText('Within 1 Month ');
    this.budgetOption = page.getByText('3 to 5 Lakhs');
    this.usageOption = page.getByText('Self-use');
    this.continueButton = page.getByRole('button', { name: 'Continue' })

  }

  //Methods to work on the tests through Page Object Model
  //------------------------------------------------------

  //It handles calculate button
  async clickCalculateButton() {
    await this.page.waitForLoadState('load');
    await this.page.waitForTimeout(1000);
    await this.calculateButton.click();
  }

   // It handles next button in BHK selection without selecting bhk
   async clickNextWithoutBHK() {
    await this.page.waitForLoadState('load');
    await this.page.waitForTimeout(3000);
    await this.nextButton.click();
  }


  // It handles next button after selecting the bhk
  async proceedToBHKSelection() {
    await this.page.waitForLoadState('load');
    await this.page.waitForTimeout(3000);
    await this.nextButton.click();
  }


  //It takes input from the excel and select the desired bhk
  async selectBHKAndSize(bhk) {
    const bhkOption = this.bhkLocator.filter({ hasText: bhk });
    await this.page.waitForTimeout(2000);
    await expect(bhkOption).toBeVisible({ timeout: 5000 });
    await bhkOption.click();
    await expect(this.bhkSizeDropdown).toBeVisible();
    await this.bhkSizeDropdown.click();
    await this.nextButton.click();
  }

 // Selects the final features of the page
 async fillFinalEstimationDetails() {
    await expect(this.timelineOption).toBeVisible();
    await this.timelineOption.click();

    await expect(this.budgetOption).toBeVisible();
    await this.budgetOption.click();

    await expect(this.usageOption).toBeVisible();
    await this.usageOption.click();

    await expect(this.continueButton).toBeVisible();
    await this.continueButton.click();
  }

}

module.exports = { InteriorPage };
