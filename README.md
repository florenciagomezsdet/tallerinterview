# QA Automation Portfolio

[![Playwright Tests](https://github.com/florenciagomezsdet/tallerinterview/actions/workflows/playwright.yml/badge.svg)](https://github.com/florenciagomezsdet/tallerinterview/actions/workflows/playwright.yml)

End-to-end UI and API test automation built with **Playwright + TypeScript**, running on every push through **GitHub Actions**.

## Purpose
A compact, production-style example of how I structure test automation: Page Object Model for UI, contract-style assertions for APIs, and CI with retries, traces and HTML reports.

## Stack
- Playwright Test (TypeScript)
- Page Object Model
- GitHub Actions (Node 20, Ubuntu)
- Targets: [Sauce Demo](https://www.saucedemo.com) (UI), [JSONPlaceholder](https://jsonplaceholder.typicode.com) (API)

## Structure
```
.
├── pages/LoginPage.ts          # Page Object for the login screen
├── tests/
│   ├── ui/login.spec.ts        # Valid login + locked-out user
│   └── api/posts.spec.ts       # GET schema checks, POST 201, negative 404
├── playwright.config.ts        # baseURL, retries on CI, trace on first retry
└── .github/workflows/playwright.yml
```

## How to run
```bash
npm ci
npx playwright install --with-deps
npx playwright test          # run all tests
npx playwright test tests/api
npx playwright show-report   # open the HTML report
```

## CI
Every push and PR to `main` runs the suite. On CI, failed tests retry up to 2 times and record a trace on the first retry; the HTML report is uploaded as a build artifact.

## Roadmap
- [ ] LLM evaluation suite with **Promptfoo** (prompt regression tests in CI)
- [ ] **DeepEval** metrics (answer relevancy, faithfulness, hallucination) for an LLM-backed feature
- [ ] Combine Playwright E2E flows with LLM-as-judge assertions
- [ ] Cross-browser projects (Firefox, WebKit)
