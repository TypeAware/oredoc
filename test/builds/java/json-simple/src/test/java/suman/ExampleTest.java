package suman;

// see: https://wunder.io/blog/creating-and-running-a-simple-selenium-webdriver-test/2011-09-15
import static junit.framework.Assert.assertEquals;
import static junit.framework.Assert.assertTrue;

import java.io.File;
import java.io.IOException;
import org.apache.commons.io.FileUtils;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.*;
import org.openqa.selenium.By;
import org.openqa.selenium.OutputType;
import org.openqa.selenium.TakesScreenshot;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.interactions.*;
import org.openqa.selenium.*;
import org.openqa.selenium.support.ui.ExpectedCondition;
import org.openqa.selenium.support.ui.WebDriverWait;

public class ExampleTest {
    private String baseUrl;
    private WebDriver driver;
    private ScreenshotHelper screenshotHelper;

    @Before
    public void openBrowser() {
        System.setProperty("webdriver.chrome.driver","/usr/local/bin/chromedriver");
//        baseUrl = System.getProperty("webdriver.base.url");
        baseUrl = "http://www.google.com";
        driver = new ChromeDriver();
        driver.get(baseUrl);
        screenshotHelper = new ScreenshotHelper();
    }

    @After
    public void saveScreenshotAndCloseBrowser() throws IOException {
//        screenshotHelper.saveScreenshot("screenshot.png");
        driver.quit();
    }

    @Test
    public void pageTitleAfterSearchShouldBeginWithDrupal() throws IOException {
//        assertEquals("The page title should equal Google at the start of the test.", "Google", driver.getTitle());
//        WebElement searchField = driver.findElement(By.name("q"));
//        searchField.sendKeys("Drupal!");
//        searchField.submit();


//        assertTrue("The page title should start with the search string after the search.",
//                (new WebDriverWait(driver, 10)).until(new ExpectedCondition() {
//                    public Boolean apply(WebDriver d) {
//                        return d.getTitle().toLowerCase().startsWith("drupal!");
//                    }
//                })
//        );

    }

    private class ScreenshotHelper {

        public void saveScreenshot(String screenshotFileName) throws IOException {
            File screenshot = ((TakesScreenshot) driver).getScreenshotAs(OutputType.FILE);
            FileUtils.copyFile(screenshot, new File(screenshotFileName));
        }
    }
}