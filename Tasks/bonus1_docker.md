# Docker

## Explain what Docker is and how it can be beneficial for a QA engineer. Provide a simple example of how you would set up an automated testing environment using Docker.)

Docker is an open-source platform that lets you create virtual environments with the dependencies and applications already included inside in a lightweight format. Docker ensures that running it on one compupter is going to produce the same consistent results as on any other machine.

### Benefits of Docker for QA Engineers
- **Consistency**: Ensures tests run the same way regardless of the underlying OS or environment.

- **Isolation**: Each test environment is isolated, preventing conflicts between dependencies or services. This is also useful in the API and E2E testing, as tests won't mess up each other's runs.

- **Scalability**: Easily spin up multiple containers to run tests in parallel or simulate complex environments.

- **Automation**: Integrates seamlessly with CI/CD pipelines for automated testing.

- **Easy Cleanup**: Containers can be stopped and removed quickly, keeping environments clean. There is no maintenance needed because the machines break down or get updated after a while.

## Simple Example:

**Scenario**: Suppose you want to run automated E2E tests using Cypress on an Angular web application.

### Case 1: Use the official cypress Docker image, but selfbuild the docker image, so we get a new one.

This is the best if we want to combine multiple applications and multiple frameworks into our own environment.

```
FROM cypress/included:13.6.3

WORKDIR /e2e

COPY . .

CMD ["npx", "cypress", "run"]
```

1. `FROM cypress/included:13.6.3`
   - Uses the official Cypress image, version 13.6.3.
   - No need to install Cypress and the browser for each run. (in the context of a CI/CD environment).
2. `WORKDIR /e2e`
   - Sets the working directory inside the container to `/e2e`.
3. `COPY . .`
   - Copies all files and folders from your project directory on your machine into the current working directory (/e2e) in the container.
4. `CMD ["npx", "cypress", "run"]`
   - Specifies the default command to run when the container starts. In this case, it will run `npx cypress run` which starts the Cypress tests.

### Case 2: Run the tests with the official docker image without creating a new image.

For headless testing:
- Run `$ docker run -it -v $PWD:/e2e -w /e2e cypress/included:13.6.3`
- Explanation of the "docker run" command line arguments
    - `-it`          = interactive terminal
    - `-v $PWD:/e2e` = map current folder to /e2e inside the container
    - `-w /e2e`      = set working directy to /e2e

## Bonus

### I have created the `Dockerfile` inside `bonus_docker/`
It can be built with `docker build -t cypress-custom .`, I used `cypress/included:latest` in my case, but the mentioned `13.6.3` can also be used. Or other versions. It can then be run with: `docker run -it -v ${PWD}:/e2e cypress-custom`, I use windows so I needed to add `{}` on the `PWD` tag.



