# CI Integration

## Explain how you would integrate your tests into a Continuous Integration (CI) pipeline. Which tools and processes would you utilize to ensure that tests are automatically run on each code commit or pull request? Provide an example of a CI tool you have used or are familiar with.

I have used **github actions** for my private projects, used **gitlab CI** for small project at work and used **Azure Pipelines** for the actual products. I worked as a semi-DevOps Engineer for my team as I knew the most about azure pipelines and I was the one who was mostly a fan about automations.

I initiated that at **pull requests** we should integrate a pipeline that **runs smoke** tests, so we would know if there was any major breaking change in our codebase.

### Here is an example of how a `pull request` targeting the main branch would be done by me.

Both cypress and playwright would be run inside docker so there is no way a newer/lower version of cypress/playwright is the problem of the tests and there is no need to do `npm install`, `npx cypress` and `npx playwright`, these are already inside the Dockerfiles.

```yml
name: Run E2E Tests in Docker

on:
  workflow_dispatch:
  pull_request:
  push:
    branches: [main]

jobs:
  cypress-tests:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout tests
        uses: actions/checkout@v4

      - name: Build and run Cypress tests in Docker
        run: |
          docker build -t cypress-tests -f Dockerfile.cypress .
          docker run --rm cypress-tests

  playwright-tests:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout tests
        uses: actions/checkout@v4

      - name: Build and run Playwright tests in Docker
        run: |
          docker build -t playwright-tests -f Dockerfile.playwright .
          docker run --rm playwright-tests
```

Optionally we could start the webapp inside the pipeline as well (if it is not independently deployed beforehand) with the GH actions services.

It would look something like this: 
```yml
services:
      web:
        image: your-web-app-image
        ports:
          - 3000:3000
        options: >-
          --health-cmd "curl -f http://localhost:3000 || exit 1"
          --health-interval 10s
          --health-timeout 5s
          --health-retries 3
steps:
...
..
.
```