# Week 2 — 15 to 19 September 2026

**Start here (2 min):**

```bash
git fetch
git checkout learning/week-2
```

Then open Task 1 below.

Last week: `tasks/week-1-2026-09-09-until-2026-09-11.md`. Where this is going: `tasks/roadmap.md`.

---

## Last week

**Wins**

1. Git cleanup done right. `node_modules` gone, nested repo gone, Tailwind in the right package.
2. Login really checks the password. Error uses state, not `alert()`.
3. `stats`, `activities`, `infoFields` with `.map()` and `key`. The most important lesson, and you got it.
4. One `Header` component. Labels have `htmlFor`. Dead buttons are `disabled`.
5. Your TypeScript prop types are correct. `type Page = 'dashboard' | 'profile'` is exactly right.

**Fix this week**

1. `Hariz` is still in 3 files. Should be 1. → Task 9
2. TypeScript was started early and is half done. `index.html` still loads `main.jsx`, so none of your `.tsx` runs. → Tasks 1 to 6
3. Commit messages `Correction last wek`, `correction second`, `tick` say nothing. Message = what changed. → every commit this week
4. Tick boxes `[x ]` and `[ x]` do not render. Use `[x]`.

---

## 3 rules

1. **One commit per idea.** First line: what changed. Second line: why it was wrong.
2. **No `any`.** Stuck? Ask me. Every time.
3. **Stuck 30 min? Ask.** Send: what you wanted, what you tried, the full error text.

No pull requests this week. Push to `learning/week-2` at the end of every day. I read your commits from the branch.

---

## Tuesday — TypeScript (Day 1 of 3, about 4 hours)

### Morning: make TypeScript actually run

#### 1. Point the app at TSX (5 min)

1. Open `my-landing-page/index.html`, line 11.
2. Change `/src/main.jsx` to `/src/main.tsx`.
3. Run `npm run dev`. Click every page.

Why: right now the browser never loads a `.tsx` file. Your TypeScript is not running.

- [ ] Done

#### 2. Move TypeScript into the app package (10 min)

```bash
cd my-landing-page
npm install -D typescript @types/react @types/react-dom
```

Then delete the top-level `package.json` and `package-lock.json`.

Why: same mistake as Tailwind last week. Tools live in the package that uses them.

- [ ] Done

#### 3. Add a typecheck script (5 min)

1. In `my-landing-page/package.json`, add `"typecheck": "tsc --noEmit"` under `scripts`.
2. Run `npm run typecheck`.
3. You see 2 errors. Read them. Do not fix yet.

Why: Vite strips types, it does not check them. That is how 2 errors shipped last week.

- [ ] Done

#### 4. Fix error 1: `handleLogin` must return boolean (10 min)

`Login.tsx` says `onLogin` returns `boolean`. `App.tsx` returns nothing.

1. In `App.tsx`, `handleLogin` returns `true` on success.
2. Returns `false` otherwise.
3. Run `npm run typecheck`. 1 error left.

Why: a type is a promise. `App.tsx` broke it. It only works today because `!undefined` happens to be `true`.

- [ ] Done

#### 5. Fix error 2: `Cannot find module './index.css'` (5 min)

1. Create `my-landing-page/src/vite-env.d.ts`.
2. Put one line in it: `/// <reference types="vite/client" />`
3. Run `npm run typecheck`. 0 errors.

**Checkpoint:** typecheck passes and the app runs from TSX. Commit. Push. Morning done.

- [ ] Done

### Afternoon: clean up

#### 6. Delete the 7 JSX files (10 min)

```bash
cd my-landing-page/src
git rm App.jsx main.jsx components/Header.jsx pages/Dashboard.jsx pages/Landing.jsx pages/Login.jsx pages/Profile.jsx
```

Run `npm run dev`. Click every page. Commit.

Why: two copies of one file always drift apart.

- [ ] Done

#### 7. Make lint see TSX (30 min)

1. `npm install -D typescript-eslint`
2. In `eslint.config.js`, change `files: ['**/*.{js,jsx}']` to `files: ['**/*.{ts,tsx}']`.
3. Add `tseslint.configs.recommended` to `extends`.
4. `npm run lint` passes.

Stuck? Run `npm create vite@latest tmp -- --template react-ts` outside this repo and copy its `eslint.config.js`. Delete `tmp` after.

Why: lint only checked `.jsx`. You have none now. "Pass" meant "checked nothing".

- [ ] Done

#### 8. One `User` type (15 min)

1. Create `src/types.ts`.
2. Move `User` and `Page` there. `export` them.
3. Delete the copies in `App.tsx` and `Header.tsx`. Import instead.

Why: the two `User` types already disagree. One has `email`, one does not.

- [ ] Done

#### 9. `Hariz` in one place (30 min)

1. `Profile` takes `user: User` as a prop, like `Dashboard`.
2. Replace the hardcoded name, email, role with `user.name` etc.
3. In `Header`, avatar letter = `user.name.charAt(0)`.
4. Search `Hariz`. One result: the `user` object in `App.tsx`.

- [ ] Done

**Tuesday done when:** `npm run typecheck`, `npm run lint`, `npm run build` all pass. Zero `.jsx` files. Pushed.

**If time left (20 min):** add `.prettierrc` with `{ "semi": false, "singleQuote": true }`, script `"format": "prettier --write src"`, run it, commit as `style: run prettier` on its own.

---

## Wednesday — Malaysia Day

Holiday. Do not work.

---

## Thursday — React Router (Day 2 of 3, about 4 hours)

Wait for my OK on Tuesday's commits before starting. Router commits start with `feat:`.

### Morning: URLs

#### 10. Install (2 min)

```bash
cd my-landing-page
npm install react-router
```

Package is `react-router`, not `react-router-dom`.

- [ ] Done

#### 11. Four routes (45 min)

| URL | Page |
|---|---|
| `/` | `Landing` |
| `/login` | `Login` |
| `/dashboard` | `Dashboard` |
| `/profile` | `Profile` |

1. In `main.tsx`, wrap `<App />` in `<BrowserRouter>`.
2. In `App.tsx`, replace the `if` chain with `<Routes>` and `<Route>`.
3. Delete `currentPage` state and the `Page` type. The URL is the state now.

- [ ] Done

#### 12. Buttons become links (20 min)

1. `onProfile` button → `<Link to="/profile">`.
2. `onBack` button → `<Link to="/dashboard">`.
3. Landing gets a "Sign in" `<Link to="/login">`.

Try `<a href="/profile">` once first. Watch what happens. Then use `<Link>`. Be ready to explain the difference when I ask.

- [ ] Done

#### 13. Redirect after login and logout (15 min)

1. `useNavigate` hook.
2. After correct login → `/dashboard`.
3. After logout → `/`.

- [ ] Done

#### 14. Protect the pages (30 min)

Log out. Type `localhost:5173/dashboard`. You see it. Bug.

1. Create `src/components/ProtectedRoute.tsx`.
2. If `isLoggedIn` is false → `<Navigate to="/login" />`. Else render children.
3. Wrap `/dashboard` and `/profile`.

**Checkpoint:** every page has a URL and the back button works. Commit. Push.

- [ ] Done

### Afternoon: edges

#### 15. Survive refresh (30 min)

Log in, go to `/profile`, press F5. You are logged out. State dies on reload.

1. Save `isLoggedIn` to `localStorage` when it changes.
2. Read it back on start. Use the lazy form: `useState(() => ...)`.

This is not security. Anyone can set it in DevTools. Fine for now. Know that it is fake.

- [ ] Done

#### 16. 404 page (15 min)

1. Create `src/pages/NotFound.tsx`: "404", "This page does not exist", `<Link to="/">`.
2. Last route: `<Route path="*" element={<NotFound />} />`.
3. Visit `/banana`.

- [ ] Done

**Thursday done when:** every page has a URL, back button works, logged-out users cannot see `/dashboard`, refresh keeps you in, `/banana` shows 404. Pushed.

**If time left (20 min):** logged in → Landing shows "Go to Dashboard" not "Sign in"; `/login` redirects to `/dashboard`.

---

## Friday — react-hook-form (Day 3 of 3, about 4 hours)

You wrote Login with `useState`. Correct way to learn. Does not scale to 20 fields. The real project uses **react-hook-form**. Learn it on the two disabled Profile buttons.

**Keep Login on `useState`.** Do not convert it. You will compare the two later.

#### 17. Install (5 min)

```bash
npm install react-hook-form
```

Read once, it is short: https://react-hook-form.com/get-started

- [ ] Done

#### 18. One `Input` component (45 min)

5 inputs across Login and Profile share the same 3 lines. Make `src/components/Input.tsx`:

```tsx
import type { ComponentProps } from 'react'

type InputProps = ComponentProps<'input'> & {
  label: string
  error?: string
}

function Input({ label, error, id, ...rest }: InputProps) {
  return (
    <div>
      <label htmlFor={id} className="...">{label}</label>
      <input id={id} className="..." {...rest} />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  )
}
```

1. `ComponentProps<'input'>` = every prop a normal `<input>` takes.
2. `{...rest}` passes them all through. This is what lets `{...register('email')}` work later.
3. Replace all 5 inputs. Page must look identical.

- [ ] Done

#### 19. Update Password works (1 hour)

```tsx
type PasswordFormValues = { currentPassword: string; newPassword: string; confirmPassword: string }
const { register, handleSubmit, watch, reset, formState: { errors } } = useForm<PasswordFormValues>()
```

1. Remove `disabled`. Real `<form onSubmit={handleSubmit(onSubmit)}>`.
2. Each `<Input {...register('field', rules)} error={errors.field?.message} />`.
3. Rules: all `required: 'This field is required'`. New: `minLength: { value: 8, message: 'At least 8 characters' }`. Confirm: `validate: (v) => v === watch('newPassword') || 'Passwords do not match'`.
4. `onSubmit`: show green "Password updated", call `reset()`.

No `useState` for fields. No `onChange`. No `if` chain. That is the point.

Do not check current password against `123456`. Ask yourself where the password should live. We talk about it.

- [ ] Done

#### 20. Edit Profile works (1.5 hours, hardest task)

1. In `App.tsx`: `const [user, setUser] = useState<User>({...})`. It was `const`. Now it is state.
2. `Profile` gets prop `onUpdateUser: (user: User) => void`.
3. `isEditing` boolean state. "Edit Profile" sets it true. The 4 fields become a form.
4. `useForm<User>({ defaultValues: user })`. All `required`. Email `pattern: { value: /\S+@\S+\.\S+/, message: 'Enter a valid email' }`.
5. "Save" → `handleSubmit` → `onUpdateUser(values)`, `isEditing` false. "Cancel" → `reset()`, `isEditing` false.

Test: change your name, save, go to Dashboard. Header, welcome text, and avatar letter all change. If not, Task 9 was not finished.

Why: `Profile` cannot change `user` alone because `Dashboard` needs it too. Data lives in the parent. Data goes down, events go up.

- [ ] Done

**Friday work done when:** both Profile buttons work, each field shows its own error, name change shows everywhere, Login still uses `useState`. Pushed.

**If time left (45 min):** `src/hooks/useLocalStorage.ts` with signature `useLocalStorage<T>(key: string, initialValue: T)`, returns `[value, setValue]`. Use it for both `isLoggedIn` and `user`. `App.tsx` has no `localStorage` after. The `<T>` is the one generic allowed this week.
