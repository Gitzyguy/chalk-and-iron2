# Chalk & Iron

A workout tracker for 5/3/1 and other strength programs. It installs on your phone like an app, works offline, and keeps all your data on your phone.

Version 3.4.0

## What it does

- **Workout screen**
  - Fills in today's weights from your training max or your last session.
  - Shows the plates to load per side, using only plates you own.
  - Rest timer that adjusts to how hard the set felt (Easy, Hard, Fail), warmup sets, AMRAP sets.
  - Change your training max mid-workout and the remaining sets update.
- **Programs**
  - Your own programs: HulkFit Plan A v2, HulkFit Plan B v2, Bodybuilder 5/3/1 No Leg Press, GreySkull LP Phraks.
  - 10 templates: 5/3/1 Boring But Big, 5/3/1 First Set Last, 5/3/1 Triumvirate, 5/3/1 for Beginners, GZCLP, 5x5 Linear, PHUL, Upper/Lower Hypertrophy, Bodybuilding Split, Push/Pull/Legs.
  - Each exercise can use a rep range, the 5/3/1 wave, First Set Last, or a fixed % of training max. Each can also have a last set AMRAP, warmups and its own weight step.
- **History**
  - Every workout, with editing.
  - Every exercise, with an estimated 1 rep max chart, PRs and all past sets.
- **Body**
  - Weigh-ins and a smoothed trend.
  - Phases: cut, maintain, lean gain, recomp.
  - Maintenance calories worked out from your data, and calorie targets for each phase.
  - Abs weight range estimate.
- **Exercise library**
  - About 75 exercises for a home gym with a rack, barbell, hex bar, EZ bar, dumbbells, adjustable bench, a cable with low and high pulley, chin-up bar, dips and ab wheel.
  - Each one has a short form cue and a form video or a YouTube search.
- **Help**: tap **?** on any screen.

## Files

| File | Purpose |
|---|---|
| `index.html` | The whole app |
| `manifest.webmanifest` | App name and icons, so Chrome can install it |
| `sw.js` | Offline support and updates |
| `icon-192.png`, `icon-512.png`, `maskable-512.png` | App icons |
| `README.md` | This guide |

Every file must sit at the top level of the repository. If the icons are missing, Chrome says the app cannot be installed.

## First install (GitHub Pages)

1. Create a repository, for example `chalk-and-iron`.
2. Go to **Add file > Upload files**, select all the files above, and commit.
3. Go to **Settings > Pages > Deploy from a branch > main > / (root) > Save**.
4. Wait 1 to 2 minutes. Then open `https://<username>.github.io/chalk-and-iron/` in Chrome on your phone.
5. Tap **⋮ > Install app**.
6. In the app, go to **Settings > Restore** and pick your history file (`chalk-and-iron-history-v*.json`).
7. To add another of your programs, go to **Program > + Add program > Your programs**.

**Do not upload your history or backup files to GitHub.** A public repository would show your data to anyone.

## Updating to a new version

1. Upload the new `index.html` and `sw.js`, plus any other changed files, replacing the old ones. Commit.
2. Wait 1 to 2 minutes. Then in the app go to **Settings > Check for updates**. It updates and reloads, and your data is not touched.

The version number is shown in Settings and at the end of the help guide. Downloads are named with the version, for example `chalk-and-iron-app-v3.3.0.zip`.

## Your data

- **Where it's stored:** only on your phone, in the browser's storage for this app. The app asks Chrome to protect it from automatic clearing.
- **Backing up:** **Settings > Back up now** saves a file you can keep in Google Drive. The app reminds you when workouts are not backed up.
- **Restoring:**
  - **Merge** adds anything new and never changes or removes what is on the phone.
  - **Replace** wipes the phone and uses the file. Only use Replace when moving to a new phone.
- **Uninstalling:** removing the app from your phone, or clearing Chrome's site data, deletes your data. Back up first.

## Troubleshooting

| Problem | Fix |
|---|---|
| "This app cannot be installed" | Check that all files, including the 3 icons, are at the top level of the repository. Then reload in Chrome (not inside the Gmail or GitHub app). |
| Weights look wrong | Check the training max (Workout screen top card, or Program) and your bar weights in Settings. |
| Wrong day or week | Tap **Change** on the Workout screen. |
| Update not showing | Wait 2 minutes after uploading, then tap **Check for updates**. Or close the app fully and reopen it twice. |
| Rest timer quiet with screen off | The app keeps the screen on during workouts (Settings). A web app cannot sound alerts reliably when the phone is locked. |

## Version history

- **3.4.0**
  - Effort-based rest timer: tap Easy, Hard or Fail after a set (defaults: warmups 1:00; main lifts 1:30 / 3:00 / 5:00; accessories 0:45 / 1:00 / 1:30). Editable in Settings. A missed AMRAP starts on Fail. Effort is saved with each set.
  - Form videos play inside the app in YouTube's privacy mode.
- **3.3.3**
  - Your 4 programs (HulkFit Plan A v2, Plan B v2, Bodybuilder 5/3/1, GreySkull) can be added with one tap from **Program > + Add program**; no file needed.
  - Older "Curls" history folded into one "Barbell Curls" exercise.
- **3.3.1**
  - Fixed: changing your training max now updates today's workout even if you started it on an older version.
- **3.3.0**
  - Help guide.
  - Check for updates button.
  - Training max button on the Workout screen's top card.
  - Saved form videos for 14 accessories, plus a YouTube search for the rest.
  - Full README.
- **3.2.0**
  - All 4 personal programs.
  - 10 templates.
  - Exercise library.
  - Exercise types (5/3/1, First Set Last, % of training max).
  - Swap an exercise for today only.
  - Merge import.
  - Lighter deload accessories.
  - Weight suggestions aware of rep range.
  - Linear program resets.
- **3.1.x**
  - Body tab.
  - Change training max mid-workout.
  - Icons moved to the top level so Chrome can install the app.
- **3.0.0**
  - First installable version, with history imported from Personal Training Coach.
