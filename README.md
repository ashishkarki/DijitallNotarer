# DijitallNotarer

DijitallNotarer is a digital notarization platform built using **NestJS** for the backend, **Next.js** for the frontend, and **GraphQL** for API interactions. It integrates **LocalStack** for AWS service mocking (DynamoDB, S3) and features a monorepo setup with **Yarn workspaces**.

## Features
- Digital notarization with document uploads
- Mocked AWS services with LocalStack (DynamoDB, S3)
- GraphQL API
- CI/CD pipelines using GitHub Actions

## Technologies Used
- **NestJS** for the backend
- **Next.js** for the frontend
- **GraphQL** for APIs
- **LocalStack** for AWS service emulation
- **Yarn workspaces** for monorepo management

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/DijitallNotarer.git
    cd DijitallNotarer
    ```

2. Install dependencies:
    ```bash
    yarn install
    ```

3. Start the development environment:
    - Backend (NestJS):
      ```bash
      cd server
      yarn start:dev
      ```

    - Frontend (Next.js):
      ```bash
      cd client
      yarn dev
      ```

## Running Tests

Run the following command to run tests:
```bash
yarn test

