# Getting Started

### You can visit the project deployed on Vercel: https://reveszpeter-solution.vercel.app/

Git repository: https://github.com/revesz-peter/dpdgroup-it-solutions-task.git

### Steps to Start the Project

**Clone the repository:**

```bash
git clone https://github.com/revesz-peter/dpdgroup-it-solutions-task.git
```

**Install the dependencies:**

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

**Run the development server:**

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

#
### frontend:

I have finished the given tasks with:

- [react](https://react.dev/)
- [typescript](https://www.typescriptlang.org/)
- [next.js](https://nextjs.org/)
  - Next.js is a React framework for building full-stack web applications.
- [shadcn/ui](https://ui.shadcn.com/)
  - Accessible, customizable and open source collection of components.
- [zod](https://zod.dev/)
  - Zod is a TypeScript-first schema declaration and validation library.
- [zustand](https://docs.pmnd.rs/zustand/getting-started/introduction)
  - A small, fast, and scalable bearbones state management solution. Zustand has a comfy API based on hooks. It isn't boilerplatey or opinionated, but has enough convention to be explicit and flux-like.
  - I am using the persist middleware to persist the data in a session storage.
- [jest](https://jestjs.io/docs/getting-started)
  - Jest is a delightful JavaScript Testing Framework with a focus on simplicity.
- [testing-library](https://testing-library.com/docs/)
  - Simple and complete testing utilities that encourage good testing practices

**To run the unit tests:**

```bash
npm run test
# or
yarn test
# or
pnpm test
# or
bun test
```
#
### backend:

After finishing with the client I had time to implement a simple backend, I also added Swagger so there is a Swagger UI available for the REST Api. It is not connected to the frontend. I have created a single stage dockerfile for the service.

- java 17
- spring boot 3.2.5
- dependencies:
  - Spring Web,
  - Spring Data JPA,
  - H2 Database,
  - Liquibase,
  - Lombok,
  - SwaggerUI

### Build

`./mvnw clean package`
`docker build -t personservice:latest .`

### Run

`docker run -p 127.0.0.1:8090:8080 personservice:latest`

### Swagger

http://localhost:8090/swagger-ui/index.html

#

### Screenshots
<img width="1440" alt="dpdgits-screen-1" src="https://github.com/revesz-peter/dpdgroup-it-solutions-task/assets/106816098/12d8465e-1093-4eeb-a89a-67b13a3856d5">

<img width="1440" alt="dpdgits-screen-2" src="https://github.com/revesz-peter/dpdgroup-it-solutions-task/assets/106816098/68b38c61-9300-40ad-bbde-7c850b77fc28">

<img width="1440" alt="dpdgits-screen-3" src="https://github.com/revesz-peter/dpdgroup-it-solutions-task/assets/106816098/c1594b92-5e46-4c15-b0f6-c48bc89a8d61">

<img width="1440" alt="dpdgits-screen-4" src="https://github.com/revesz-peter/dpdgroup-it-solutions-task/assets/106816098/4ab4d8f4-aefa-4611-98c5-3a2c55f03587">

<img width="1440" alt="dpdgits-screen-5" src="https://github.com/revesz-peter/dpdgroup-it-solutions-task/assets/106816098/34892018-6821-4f69-9b14-395cc122a258">

<img width="1440" alt="dpdgits-swagger" src="https://github.com/revesz-peter/dpdgroup-it-solutions-task/assets/106816098/c34b9746-21e5-4a30-b194-79e9ba94166c">





