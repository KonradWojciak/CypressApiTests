import { LoginPage } from "../pages/Login";
import { HomePage } from "../pages/HomePage";

describe("EDu goIT global testing", () => {
  it("login and logout test", () => {
    const homePage = new HomePage();
    const loginPage = new LoginPage();

    homePage.navigate();

    loginPage.getLoginInput().type("user888@gmail.com");
    loginPage.getPasswordInput().type("1234567890");
    loginPage.getLoginButton().click();

    homePage.getMainMenuButton().click();
    homePage.getFoundLogoutButton().click();
    homePage.getClickLogoutButton().click();
  });
});
