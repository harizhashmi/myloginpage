# Roadmap

**Goal:** one merged ticket on **eMP** (Electronic Management Paper) by the end of October. Your code, in production, used by Gamuda staff.

eMP is a real internal system: staff create Management Papers and GPO forms, route them through verifier and approver, track status. NestJS backend, React frontend, same monorepo shape you will practise here.

Pattern every week: do it by hand first, feel the pain, then learn the library that removes the pain. People who only know the library cannot debug it.

## Weeks

| Week | Dates | Topic | You can, after |
|---|---|---|---|
| 1 | 9 to 11 Sep | Git, state, props, components | Branch, commit, push. Form with `useState`. Split repeated markup into components. |
| 2 | 15 to 19 Sep | TypeScript, react-router, react-hook-form | Type your props. Add a page with a URL. Validated form without `useState`. |
| 3 | 22 to 26 Sep | Fetching data, TanStack Query | Call an API with `useEffect`. Loading, error, empty states. Replace it with `useQuery` and `useMutation`. |
| 4 | 29 Sep to 3 Oct | Zod, testing | Zod schema + `zodResolver` on your forms. `z.infer` instead of hand-written types. First Jest + Testing Library test. |
| 5 | 6 to 10 Oct | TanStack Router, Zustand | File-based routes with a `_layout`. Auth state in a Zustand store, no more prop drilling. |
| 6 | 13 to 17 Oct | NestJS basics | One module: controller, service, DTO from a Zod schema, TypeORM entity, one migration. Call it from your React app. |
| 7 | 20 to 24 Oct | eMP onboarding | Clone eMP, run it with Docker Postgres, log in, read one domain from route to controller to entity. Explain it back to me. |
| 8 | 27 to 31 Oct | eMP ticket | Pick up one EMP Jira ticket. Branch, code, test, PR, review, merge. |

## eMP stack, and where you meet it

| eMP uses | Week | Status |
|---|---|---|
| Git, branches, small commits, PR | 1, 8 | done, PR in week 8 |
| Tailwind | 1 | done |
| TypeScript strict, no `any` | 2 | now |
| react-hook-form | 2 | now |
| Routing | 2 (react-router), 5 (TanStack Router) | now |
| TanStack Query | 3 | next |
| Zod, `@hookform/resolvers` | 4 | later |
| Jest, Testing Library | 4 | later |
| TanStack Router, file-based routes | 5 | later |
| Zustand | 5 | later |
| NestJS 11, TypeORM, PostgreSQL, migrations | 6 | later |
| pnpm, Turborepo, generated API client, i18n `en` + `ms`, Docker, Firebase login | 7 | on eMP itself |

## What a first eMP ticket looks like

Small, frontend, one domain. Examples of the right size:

1. Add a missing translation key in both `en` and `ms`.
2. Fix a form field validation message.
3. Add a column to a table in the admin module.
4. Write a test for a component that has none.
5. A small UI fix on the dashboard or profile route.

Not a first ticket: anything in the workflow engine, auth, or the audit log.

## You will not learn

- Kong, GCS, Cloud Run, Bitbucket Pipelines. Infra. Someone else owns it.
- Tiptap, TanStack Table, Radix. You will use them on eMP by copying an existing example. Not worth a week each.
- Building auth. eMP has Firebase Google login. You call it.

## Why react-router first when eMP uses TanStack Router

react-router is simpler and every tutorial uses it. Same ideas: routes, links, redirects, protected pages. Week 5 you switch and see eMP's `routes/_layout` folder make sense immediately.
