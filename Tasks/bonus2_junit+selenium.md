# JUnit + Selenium:

## Describe how you would use Selenium and JUnit for automating the testing of the "Delete Task" feature in the web application. Include a brief sample of the test code you would write.

### 1. Set up the environment

### 2. Writing test case:

- logs into the aplication (setup proocess)
- navigates the task list
- locates the provided task
- clicks the delete button of the given task
- verify the task list again, so the task was deleted from the list

### Code:

```java
public class DeleteTaskTest {

    private WebDriver driver;

    @Before
    public void setUp() {
        System.setProperty("webdriver.chrome.driver", "/path/to/chromedriver");
        driver = new ChromeDriver();
        driver.manage().window().maximize();
        driver.get("https://aldi.hu/login");
        
        driver.findElement(By.id("member_login_email")).sendKeys("testuser");
        driver.findElement(By.id("member_login_password")).sendKeys("testpass");
        driver.findElement(By.id("login_submit")).click();
    }

    @Test
    public void testDeleteTask() {
        driver.get("https://aldi.hu/tasks");

        WebElement taskRow = driver.findElement(By.xpath("//li[contains(text(),'Test Task')]"));
        WebElement deleteButton = taskRow.findElement(By.className("delete-button"));
        deleteButton.click();
        
        boolean taskDeleted = driver.findElements(By.xpath("//li[contains(text(),'Test Task')]")).isEmpty();
        assertTrue("Task should be deleted", taskDeleted);
    }

    @After
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}
```

- Creating the task inside the test would be better, because then it would be independent from other tests.
    - I choose to not do that because I would probably already have a complete mock environment available with the data for the tests.
- I use @Before and @After for the login and driver.quit();