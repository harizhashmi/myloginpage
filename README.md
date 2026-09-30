# Week 4 — 30 September to 3 October 2026

**Start here (2 min):**

```bash
git fetch
git checkout learning/week-4
```

Then open Task 1 below.

Last time: `tasks/week-2-2026-09-15-until-2026-09-19.md`. Where this is going: `tasks/roadmap.md`.

---

## Last two weeks

You went further than the plan. Week 2 was TypeScript, router, react-hook-form. You did that, then built a NestJS backend with Postgres, bcrypt, and JWT on your own. Good. That was week 6 on the roadmap. So the roadmap moves: this week is fixing what you built and learning to fetch data properly. Zod and testing go to week 5.

**Wins**

1. `npm run typecheck` passes. Zero `.jsx` files. `User` type in one place.
2. Every page has a URL. Refresh keeps you logged in. `/banana` shows 404.
3. Register, login, edit profile, delete account all hit the real backend. Passwords are hashed. Token is checked on load.
4. `Input` component with `ComponentProps<'input'>` and `{...rest}`. Both Profile forms use `register`. No `useState` for fields.
5. Commit messages got better. `protect the pages`, `survive refresh`, `one input component` say what changed.

**Fix this week**

1. Wrong password shows no error. → Task 1
2. `npm run lint` fails with 2 errors in `App.tsx`. Hooks are called before `useState` declares them. → Task 2
3. `Update Password` does `console.log` and nothing else. The button looks real. It is not. → Task 15
4. Backend leaks. `GET /users` returns every user **with the password hash**. `PATCH /users/:id` and `DELETE /users/:id` have no guard, so anyone can edit or delete anyone. → Tasks 3, 4
5. Commit messages: `impement delete in the page`, `make the catch is only for`. Read your message once before you press enter.

---

## 3 rules

1. **One commit per task.** First line: what changed. Second line: why it was wrong.
2. **No `any`.** You have `error: any` and `request: any` in the backend. Both go this week.
3. **Stuck 30 min? Ask.** Send: what you wanted, what you tried, the full error text.

Push to `learning/week-4` at the end of every day.

---

## Wednesday — Bugs, security, components (about 5 hours)

### 1. Wrong password shows no error (30 min)

Log in with a wrong password. Nothing happens. Find out why before you fix it.

`Login.tsx` line 6 says `onLogin` returns `Promise<boolean>`. `App.tsx` line 73 returns `data.message`, a string. Line 22 in `Login.tsx` checks `!success`. A non-empty string is truthy.

1. Change the type to `Promise<true | string>`. `true` means logged in. A string is the error message.
2. In `Login.tsx`, if the result is not `true`, `setError(result)`.
3. Test with a wrong password. Test with a wrong email. Both show "Invalid email or password" from the server.

Why: the type said `boolean`. The code returned a string. TypeScript let it through because `Promise<boolean>` was only a promise, and `handleLogin` never declared its return type. Add `: Promise<true | string>` to `handleLogin` and see the error appear.

- [x] Done

### 2. Lint passes again (20 min)

```bash
cd my-landing-page
npm run lint
```

Two errors: `setIsLoggedIn` and `setUser` are used inside `useEffect` on lines 33 and 44, but declared on lines 53 and 54.

1. Move both `useState` lines above the `useEffect`.
2. The warning on `watch("newPassword")` inside `validate`: use `getValues("newPassword")` instead of `watch`. Read why here, 1 minute: https://react-hook-form.com/docs/useform/getvalues

Why: hooks run top to bottom. React only lets you use a value after the line that creates it.

- [ ] Done

### 3. Stop leaking password hashes (45 min)

```bash
curl http://localhost:3000/users
```

Look at the output. Every password hash is there. No token needed.

1. In `user.entity.ts`, add `select: false` to the password column: `@Column({ select: false })`. TypeORM now skips it unless you ask.
2. `login()` in `auth.service.ts` needs the password. Change `findByEmail` to `this.usersRepository.findOne({ where: { email }, select: ['id', 'name', 'email', 'password'] })`.
3. Run the curl again. No hashes.
4. Now the hand-written `{ id, name, email }` objects in `auth.service.ts` and `users.controller.ts` are not needed. Return the user directly. Delete the copies.

Why: you strip the password in 3 places by hand and forgot the 4th. Do it once, at the source.

- [ ] Done

### 4. Guard every user route (45 min)

```bash
curl -X DELETE http://localhost:3000/users/1
```

That works with no token. Anyone on the internet can delete your account.

1. Move `@UseGuards(AuthGuard('jwt'))` from the `getMe` method to the top of the `UsersController` class. One line guards every route.
2. Delete `GET /users/:id`, `POST /users`, `GET /users`. You do not use them from the frontend. Register creates users. Dead routes are attack surface.
3. `PATCH /users/:id` and `DELETE /users/:id`: the `:id` in the URL is a lie. A logged-in user can still send someone else's id. Change both to `PATCH /users/me` and `DELETE /users/me`, and take the id from `request.user.userId`, like `getMe` does.
4. Update the two `fetch` calls in `App.tsx` to the new URLs.
5. Replace `request: any`. Make `src/auth/authenticated-request.ts`:

```ts
import type { Request } from 'express'

export type AuthenticatedRequest = Request & {
  user: { userId: number; email: string }
}
```

Why: "protected" means the server checks. The frontend hiding a button is not protection. Task 4 point 3 is the important one. Say it back to me on Friday.

**Checkpoint:** `npm run lint` passes in both packages. `curl http://localhost:3000/users` returns 401. Commit. Push.

- [ ] Done

### 5. Fix the `any` in `auth.service.ts` (20 min)

Line 35: `catch (error: any)`. You only read `error.code`.

1. `catch (error: unknown)`.
2. Check it before you read it:

```ts
if (error instanceof QueryFailedError && error.driverError.code === '23505')
```

`QueryFailedError` comes from `typeorm`.

3. `users.service.ts` line 28 catches `error` and never reads it. You also do not call `createUser` any more after Task 4. Delete `createUser` and `create-user.dto.ts`.

Why: `any` turns TypeScript off for that line. `unknown` makes you prove what it is first.

- [ ] Done

### Afternoon: build the components once

### 6. One `Button` (45 min)

Count the `<button>` tags: 8. Every one repeats `px-5 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl`, or the slate or red version of it.

1. Make `src/components/Button.tsx`, same shape as `Input`:

```tsx
import type { ComponentProps } from 'react'

type ButtonProps = ComponentProps<'button'> & {
  variant?: 'primary' | 'secondary' | 'danger'
}

const variants = {
  primary: 'bg-blue-600 hover:bg-blue-700',
  secondary: 'bg-slate-700 hover:bg-slate-600',
  danger: 'bg-red-600 hover:bg-red-700',
}

function Button({ variant = 'primary', className = '', ...rest }: ButtonProps) {
  return (
    <button
      className={`px-5 py-3 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${className}`}
      {...rest}
    />
  )
}
```

2. Replace all 8. `className` is only for layout, like `w-full` or `mt-6`. Colours come from `variant`.
3. Search the repo for `bg-blue-600 hover`. One result: `Button.tsx`.

Why: `disabled:opacity-50` in one place means a disabled button always looks disabled, and an enabled one never does. That is the Edit Profile bug from the review, fixed for every button at once.

- [ ] Done

### 7. One `Card` (20 min)

`bg-slate-900 border border-slate-800 rounded-2xl` appears 7 times across 4 pages.

1. `src/components/Card.tsx`. Props: `children`, `className?`. Padding stays inside the card: `p-8`. Pass `className` for margins like `mt-6`.
2. Replace all 7.

Why: when the design changes the card radius, you change one line.

- [ ] Done

### 8. `Input` owns its look (20 min)

Open `Input.tsx`. The label is `text-gray-700` and the input has a `gray-300` border. Those are light-theme colours on a dark page. `Login.tsx` fixes it by passing its own `className`, which overrides yours through `{...rest}`. `Profile.tsx` and `Register.tsx` do not, so they look different.

1. Move the dark classes from `Login.tsx` into `Input.tsx`. Label: `text-sm font-medium text-slate-400 mb-2`.
2. Delete the `className` prop from every `<Input>` in the pages.
3. Click every page. Every input looks the same.

Why: a component that needs the parent to style it is not a component yet. The pages were doing `Input`'s job.

**Checkpoint:** `src/components/` has `Button`, `Card`, `Input`. Zero `<button>` tags outside `Button.tsx`. Commit each component on its own.

- [ ] Done

**Wednesday done when:** wrong password shows an error, lint passes in both packages, `curl` without a token gets 401 on every `/users` route, zero `any` in the repo, three shared components. Pushed.

---

## Thursday — Fetching data (Day 1 of 2, about 4 hours)

You skipped week 3 on the roadmap. Fetching with `useEffect` is what you did in `App.tsx` by hand. Today you do it properly: loading, error, empty. Tomorrow TanStack Query removes the pain.

### Morning: dashboard shows real data

### 9. Remove the `← Back` button (10 min)

`Header.tsx` line 14. It always links to `/dashboard`. On the Dashboard page it links to itself.

1. Delete it. The user's name in the header already links to `/profile`. `MyApp` title should link to `/dashboard`: wrap the `<h1>` in `<Link to="/dashboard">`.
2. Line 37: the avatar letter is a hardcoded `H`. Use `user.name.charAt(0)`. This was Task 9 in week 2.

Why: a button that goes nowhere teaches the user that buttons here do nothing.

- [ ] Done

### 10. Backend: one endpoint for the dashboard (45 min)

The dashboard has no orders and no revenue. There is one table: `user`. So the dashboard shows what exists.

1. Add `@CreateDateColumn() createdAt: Date` to `user.entity.ts`. `synchronize: true` adds the column for you. Do not rely on that in a real project, we cover migrations in week 6.
2. New route `GET /users/stats`, guarded, returns:

```ts
{
  totalUsers: number,          // count()
  newThisMonth: number,        // count where createdAt >= first day of this month
  recentUsers: { id: number; name: string; email: string; createdAt: Date }[]   // last 5, newest first
}
```

3. Test with curl and a token from login.

Why: the frontend should ask one question and get one answer. Three fetches for one screen is slow and the numbers can disagree.

- [ ] Done

### 11. Frontend: fetch it with `useEffect` (1 hour)

1. Make `src/hooks/useDashboardStats.ts`. Copy the shape of the `/users/me` fetch in `App.tsx`. Return `{ data, isLoading, error }`.
2. Type the response. `src/types.ts` gets `DashboardStats`. No `any`. No `as`.
3. `Dashboard.tsx`: delete the `stats` and `activities` arrays. Cards become **Total Users**, **New this month**. Delete the third card. Recent Activity becomes the 5 newest users: "New user registered", email, date.
4. Three states, all visible: `isLoading` shows "Loading…", `error` shows red text, empty `recentUsers` shows "No activity yet".

Test: register a second user in another browser tab. Refresh Dashboard. Count goes up.

Why: every list on eMP has these three states. The one you forget is the one the user hits.

- [ ] Done

### Afternoon: the token in one place

### 12. One `apiFetch` (45 min)

`App.tsx` has 5 `fetch` calls. Each one builds `http://localhost:3000`, reads `localStorage`, sets `Authorization`. That is the same 6 lines 5 times.

1. Make `src/api.ts`:

```ts
const BASE_URL = 'http://localhost:3000'

export async function apiFetch<T>(path: string, init: RequestInit = {}): Promise<T> {
  const token = localStorage.getItem('access_token')
  const response = await fetch(BASE_URL + path, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...init.headers,
    },
  })
  if (!response.ok) {
    const body = await response.json()
    throw new Error(body.message ?? response.statusText)
  }
  return response.json()
}
```

2. Replace all 5 `fetch` calls and the one in `useDashboardStats`. `App.tsx` has no `fetch`, no `localhost`, no `Authorization` after.
3. Errors are now thrown. `handleLogin` becomes `try { ... return true } catch (e) { return e instanceof Error ? e.message : 'Something went wrong' }`.

Why: when the URL changes for production, you change one line. `<T>` is the same generic you used in `useLocalStorage`.

**Thursday done when:** dashboard numbers come from the database, all three states show, `App.tsx` has zero `fetch`. Pushed.

- [ ] Done

---

## Friday — TanStack Query and Profile polish (Day 2 of 2, about 4 hours)

### Morning: replace `useEffect` with `useQuery`

### 13. Install and wrap (15 min)

```bash
cd my-landing-page
npm install @tanstack/react-query
```

In `main.tsx`, make one `new QueryClient()` and wrap `<App />` in `<QueryClientProvider client={queryClient}>`.

Read once, 5 min: https://tanstack.com/query/latest/docs/framework/react/quick-start

- [ ] Done

### 14. `useDashboardStats` becomes `useQuery` (45 min)

```ts
export function useDashboardStats() {
  return useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: () => apiFetch<DashboardStats>('/users/stats'),
  })
}
```

1. Delete the `useEffect` and the three `useState` in the hook. `Dashboard.tsx` does not change. That is the point: the hook's return shape stayed the same.
2. Go to Profile, come back to Dashboard. No loading flash the second time. Ask yourself why. We talk about it.
3. Do the same for `/users/me`: `useMe()` hook in `src/hooks/useMe.ts`, `queryKey: ['me']`. `App.tsx` `useEffect` on line 18 is deleted. `user` and `isLoggedIn` come from `useMe()`: `isLoggedIn = !!data`.

Why: `useEffect` + 3 `useState` for every fetch is what everyone writes first, and what every project replaces. eMP uses TanStack Query for every server call.

- [ ] Done

### 15. Update Password really updates (45 min)

Right now `onSubmit` in `Profile.tsx` line 60 is `console.log`.

1. Backend: `PATCH /users/me/password`, guarded, body `{ currentPassword, newPassword }`. `bcrypt.compare` the current one. Wrong → `UnauthorizedException('Current password is incorrect')`. Right → hash and save.
2. Frontend: `useMutation` in `src/hooks/useChangePassword.ts`. `mutationFn` calls `apiFetch`. `onSuccess` → `reset()`. `onError` → show `error.message` under the button.
3. Button `disabled={!isValid || isPending}`. Get `isValid` from `formState` and add `mode: 'onChange'` to `useForm`. Give a disabled button `disabled:opacity-50` so it looks disabled only when it is.

Test: wrong current password shows the server message. Right one, then log out and log in with the new password.

Why: a button that looks clickable and does nothing is the same bug as the `← Back` button.

- [ ] Done

### Afternoon: Profile polish

### 16. Buttons that look right (15 min)

`Profile.tsx` lines 160 to 183.

1. Edit Profile is `<Button>` now, so `opacity-50` is gone. Delete Account is `<Button variant="danger">`.
2. Put both in one `<div className="mt-8 flex gap-3">`, same as Save and Cancel. No margins on the buttons themselves.
3. Hide Edit Profile and Delete Account while `isEditing` is true. Two sets of buttons on one card is confusing.

- [ ] Done

### 17. Toast on save (45 min)

1. Make `src/components/Toast.tsx`. Props: `message: string`, `onClose: () => void`. Fixed bottom right, green, `Button variant="secondary"` to close, disappears after 3 seconds with `setTimeout` inside `useEffect`. Clean up the timer in the return of `useEffect`.
2. Toast state lives in `App.tsx`: `const [toast, setToast] = useState<string | null>(null)`. Render `{toast && <Toast message={toast} onClose={() => setToast(null)} />}` once, above `<Routes>`.
3. `handleUpdateUser` becomes a `useMutation`. `onSuccess` → `setToast('Profile updated')` and `queryClient.invalidateQueries({ queryKey: ['me'] })`.

Test: change your name, Save. Toast shows. Header name changes without refresh. That is `invalidateQueries` doing what `setUser(values)` did by hand.

Why: this is the first time `useEffect` is the right tool this week. A timer is an external system. Fetching data was not.

- [ ] Done

### 18. Confirmation dialog (45 min)

`window.confirm` on line 171 is the browser's dialog. You cannot style it and you cannot test it.

1. Make `src/components/ConfirmDialog.tsx`. Props: `title`, `message`, `confirmLabel`, `onConfirm`, `onCancel`. Use the `<dialog>` element. Dark overlay, `<Card>` in the middle, `<Button variant="danger">` to confirm, `<Button variant="secondary">` to cancel.
2. `Profile.tsx`: `const [showDeleteDialog, setShowDeleteDialog] = useState(false)`. Delete Account opens it. Confirm calls `onDeleteUser()`.
3. Press Escape. It should close. `<dialog>` does that for you if you use `showModal()`. Try it.

- [ ] Done

### 19. Profile picture (1 hour, hardest task)

1. Backend: `@Column({ type: 'text', nullable: true }) avatar: string | null` on the entity. Add `avatar` to `UpdateUserDto` as `@IsOptional() @IsString()`. It will be a `data:image/...;base64,...` string. Add `app.use(json({ limit: '5mb' }))` in `main.ts` or the request gets 413.
2. Frontend: `avatar: string | null` on the `User` type. In the edit form, `<input type="file" accept="image/*">`. On change, read the file with `FileReader.readAsDataURL`, put the result in form state with `setValue('avatar', result)`.
3. Reject files over 1 MB before reading. Show an error under the input.
4. Avatar on Profile and in Header: `user.avatar ? <img src={user.avatar} className="w-24 h-24 rounded-full object-cover" /> : first letter`. Make `src/components/Avatar.tsx` so this is written once, with a `size` prop.

Base64 in a database column is the wrong final answer. It is the right first answer. On eMP files go to Google Cloud Storage and the database keeps a URL. You will see that in week 7. Know that this is the shortcut.

**Friday done when:** Update Password works end to end, toast on save, own dialog on delete, profile picture shows in Header and Profile. `npm run lint`, `npm run typecheck`, `npm run build` pass. Pushed.

- [ ] Done

---

## Questions for Friday

1. Task 4: why is `PATCH /users/:id` with a guard still not safe?
2. Task 14: why was there no loading flash the second time you opened Dashboard?
3. Task 17: `useEffect` was right for the toast timer and wrong for fetching. What is the rule?
4. Task 19: what goes wrong if a user uploads a 10 MB photo and we store it in the row?

Do not know? Say so. Guessing is not fine.

---

## Next week — Zod and testing

Every form has rules written twice: `required` in react-hook-form, `@IsNotEmpty` in the DTO. Next week one Zod schema replaces both, and you write your first test. Do not install Zod this week.
