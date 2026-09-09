# Tasks for This Week

Hi Hariz. Your UI looks good. Well done.

This week you will not build new pages. You will learn two things:

1. **Git** — how to save your work properly.
2. **React** — how state, props, and components work.

You will learn them by fixing this repo. Every task below is a real problem in your code.

**Rule: for every fix, write one sentence saying why it was wrong.** Put it in your pull request. If you cannot explain it, you copied the answer. Ask me instead.

## Before you start

I made a branch for you called `learning/week-1`. All your work this week goes on a branch, never on `main`.

```bash
git checkout learning/week-1
git branch
```

The `*` shows which branch you are on now.

---

## Do NOT do this week

You will want to add more things. Please do not. Not yet.

- ❌ No React Router
- ❌ No backend or database
- ❌ No new pages
- ❌ No UI library
- ❌ No TypeScript yet — see **Next week** at the bottom

Learn state, props, and components properly first. Router is next week.

---

## Questions I will ask you on Friday

Prepare your answers.

1. Why should `node_modules` never go into Git?
2. Why did adding `.gitignore` not remove `node_modules` by itself?
3. What is the difference between `git add` and `git commit`?
4. What happens inside React when you call `setEmail('abc')`?
5. What is the difference between state and props?
6. Why does React need a `key` when you use `.map()`?

If you do not know an answer, tell me you do not know. That is fine. Guessing is not fine.

---

## If you are stuck

Try for 30 minutes. Then ask me. Do not sit quiet for 3 hours.

When you ask, tell me three things:

1. What you wanted to do.
2. What you tried.
3. What error you saw. Copy the full error text.

---

## Wednesday — Git

### 1. Stop tracking `node_modules`

Right now `node_modules` is inside Git. That is 629 files.

```bash
git ls-files node_modules | wc -l
```

Fix it:

```bash
# 1. Make a .gitignore file at the top folder of the repo
# 2. Put node_modules inside it
# 3. Then run:
git rm -r --cached node_modules
```

Try adding `.gitignore` first, then run `git status`. You will see `node_modules` is still there. Ask yourself: **why did `.gitignore` not remove it?** This is the important lesson.

- [ ] Done

### 2. Remove the broken folder

Run this:

```bash
git ls-files -s myloginpage
```

You will see the number `160000`. Normal files show `100644`.

This happened because you ran `git init` inside that folder. Now Git thinks it is another repo inside this repo. Anyone who clones your project gets an empty folder.

Fix it:

```bash
git rm --cached myloginpage
```

Then delete the folder.

- [ ] Done

### 3. Delete the leftover files

These files are not used by your app. Delete them:

- `App.jsx/` — this is a **folder** named `App.jsx`. Inside is a file called `Untitled`. It is your landing page code. Move it to `my-landing-page/src/pages/Landing.jsx`, or delete it.
- `my-landing-page/src/App.jsx.save` — a backup file from nano.
- `my-landing-page/src/App.css` — 184 lines. Nothing imports it.
- `my-landing-page/src/assets/react.svg` and `vite.svg` — not used.

- [ ] Done

### 4. Move Tailwind to the correct place

Open the `package.json` at the top folder. Tailwind is there.

But Tailwind is used inside `my-landing-page/`. So if someone clones your repo and runs `npm install` inside `my-landing-page`, the app will not work.

Move `tailwindcss` and `@tailwindcss/vite` into `my-landing-page/package.json`. Then delete the top `package.json` and `package-lock.json`.

Test it works:

```bash
rm -rf my-landing-page/node_modules
cd my-landing-page
npm install
npm run dev
```

- [ ] Done

### 5. Make lint work

```bash
cd my-landing-page
npm run lint
```

It fails now. Make it pass.

- [ ] Done

### 6. Commit properly

Do **not** put everything in one commit.

Your old commits look like this:

```
Add profile page
Build login page
Initial landing page
```

That is one commit per day. A commit should be one idea, not one day of work.

I already made a branch for you. Check you are on it:

```bash
git branch
```

You should see a `*` next to `learning/week-1`. If not, run:

```bash
git checkout learning/week-1
```

Never work directly on `main`. Always work on a branch.

Now split your work into commits. Use `git add -p`. It asks you file by file, piece by piece, what you want to commit:

```bash
git add -p
git commit -m "chore: add gitignore and stop tracking node_modules"
```

Make about 4 commits. For example:

```
chore: add gitignore and stop tracking node_modules
chore: remove embedded git repo
chore: delete unused files
chore: move tailwind into the app package
```

Then push and open a pull request:

```bash
git push -u origin learning/week-1
```

Open the link Bitbucket prints in your terminal. That makes the pull request.

- [ ] Done

**Wednesday is finished when:** the pull request is open, and you can explain each commit to me.

---

## Thursday — React: state and props

### 7. Your login form does not read anything

Open `my-landing-page/src/pages/Login.jsx`.

Type any email. Type any password. Press Sign in. It works. Why?

Because the inputs are empty of code. There is no `value`. There is no `onChange`. And `onLogin()` is called with nothing inside the brackets.

Fix it:

- Add `useState` for email.
- Add `useState` for password.
- Put `value=` and `onChange=` on both inputs.
- Send the data up: `onLogin({ email, password })`.

In `App.jsx`, check the email and password. You can hardcode the correct one for now. That is fine.

This teaches you **state**. State is data that React watches. When state changes, React draws the screen again.

- [ ] Done

### 8. Show an error message

If the password is wrong, show red text under the form.

Do not use `alert()`. Use state.

- [ ] Done

### 9. The user name is written in two places

Search for `Hariz` in your code. You will find it in `Dashboard.jsx` and in `Profile.jsx`. Same for `hariz@example.com` and `Administrator`.

This is a problem. If the name changes, you must edit many files. You will forget one.

Fix it:

- In `App.jsx`, make one object:
  ```jsx
  const user = {
    name: 'Hariz Hashmi',
    email: 'hariz@example.com',
    role: 'Administrator',
  }
  ```
- Pass it down: `<Dashboard user={user} />` and `<Profile user={user} />`.
- Use `{user.name}` inside those pages.

This teaches you **props**. Props are data that a parent gives to a child. Data goes down, not up.

- [ ] Done

**Thursday is finished when:** the login form really checks the password, and `Hariz` appears only one time in your whole codebase.

---

## Friday — React: components and lists

### 10. Stop copying and pasting

Open `Dashboard.jsx`. Look at lines 62 to 112.

There are 3 boxes. Total Users, Revenue, Orders. The code is exactly the same. Only the words are different.

This is the most important habit to learn. Same shape, different data means: **make a list, then loop**.

Fix it like this:

```jsx
const stats = [
  { label: 'Total Users', value: '1,248', change: '↑ 8.2% this month' },
  { label: 'Revenue', value: '$24,580', change: '↑ 12.5% this month' },
  { label: 'Orders', value: '342', change: '↑ 5.4% this month' },
]
```

Then make one small component `StatCard`, and loop:

```jsx
{stats.map((stat) => (
  <StatCard key={stat.label} {...stat} />
))}
```

React will warn you if you forget `key`. Ask me why `key` is needed.

- [ ] Done

### 11. Do the same for the other lists

- `Dashboard.jsx` lines 121 to 159 — the 3 activity rows.
- `Profile.jsx` lines 73 to 115 — the 4 information fields.

- [ ] Done

### 12. The header is written twice

`Dashboard.jsx` and `Profile.jsx` both have a `<header>`. They are almost the same.

Make one file: `src/components/Header.jsx`. Use props for the parts that are different.

- [ ] Done

### 13. Small fixes

- `Profile.jsx` line 1 — the indentation is wrong. Install Prettier and turn on format when you save.
- `main.jsx` line 6 — everything is on one line. Format it.
- Every `<label>` needs `htmlFor="something"`, and the input needs the same `id="something"`. Without this, clicking the label does nothing.
- The buttons "Edit Profile" and "Update Password" do nothing when clicked. Either make them work, or add `disabled`. A button that looks ready but does nothing is confusing.

- [ ] Done

### 14. Second pull request

Do not put the React work in the same pull request as the Git cleanup. Keep them separate. A reviewer should only look at one topic at a time.

Wait until I merge your Wednesday pull request. Then:

```bash
git checkout main
git pull                       # get the merged cleanup into your main
git checkout -b learning/react-basics
```

Do Thursday and Friday work on this new branch. Then push and open the second pull request:

```bash
git push -u origin learning/react-basics
```

This is the normal cycle you will use every day at work: branch, commit, push, pull request, merge, then start a new branch from a fresh `main`.

- [ ] Done

---

## Next week — TypeScript

You are writing `.jsx` this week. Next week you will change to `.tsx`.

This is not extra work I forgot. It is on purpose. Learn state, props, and components first. One new thing at a time.

Our real project at work uses TypeScript. So you need it. But not yet.

### Why TypeScript will help you

Remember Task 9, where you made the `user` object and passed it down? Next week you will tell TypeScript what shape that object has:

```tsx
type User = {
  name: string
  email: string
  role: string
}
```

After that, two good things happen:

1. When you type `user.` your editor shows you the list: `name`, `email`, `role`.
2. If you typo `user.mail`, you see a red line immediately. You do not wait until the page is blank in the browser.

TypeScript is not there to make your life hard. It is there to catch your mistakes before the browser does.

### What we will do on Monday

- Rename every `.jsx` file to `.tsx`.
- Install `typescript` and `@types/react`.
- Add a `tsconfig.json` file.
- Add types to two things only: **component props** and **`useState`**.

That is all. We will not learn generics or advanced types yet.

### One rule

**Do not use `any`.**

When you are stuck, `any` will look like the easy fix. It is not a fix. It turns TypeScript off for that line, so you get all the extra typing and none of the help.

If you think you need `any`, come and ask me. Every time.

### Do not start early

Do not rename your files this week. It will make your pull requests very hard for me to read.

