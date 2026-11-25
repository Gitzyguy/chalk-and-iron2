# Chalk & Iron

A workout tracker for 5/3/1 and other strength programs. It installs on your phone like an app, works offline, and keeps all your data on your phone.

Version 3.7.1

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
6. In the app, go to **Settings > Restore** and pick your backup file (`chalk-and-iron-backup-<date>.json`, or an older `chalk-and-iron-history-v*.json`).
7. To add another of your programs, go to **Program > + Add program > Your programs**.

**Do not upload your history or backup files to GitHub.** A public repository would show your data to anyone.

## Updating to a new version

1. Upload the new `index.html` and `sw.js`, plus any other changed files, replacing the old ones. Commit.
2. Wait 1 to 2 minutes. Then in the app go to **Settings > Check for updates**. It updates and reloads, and your data is not touched.

The version number is shown in Settings and at the end of the help guide. Downloads are named with the version, for example `chalk-and-iron-app-v3.3.0.zip`. Backups are named `chalk-and-iron-backup-<date>.json`.

## Your data

- **Where it's stored:** only on your phone, in the browser's storage for this app. The app asks Chrome to protect it from automatic clearing.
- **Backing up:** after each workout the app asks to back up (pick Google Drive in the share menu). **Settings > Back up now** does the same any time. A backup file is the only copy that survives clearing Chrome's data or losing the phone.
- **Restoring:**
  - **Merge** adds anything new and never changes or removes what is on the phone.
  - **Replace** wipes the phone and uses the file. Only use Replace when moving to a new phone.
- **Uninstalling or clearing Chrome:** removing the app, or clearing Chrome's **Cookies and site data**, deletes your data. Clearing only **Cached images and files** is safe. Back up first.
- **If the app cannot read your data:** it says so and saves nothing until you choose to try again, save a copy, restore or start over.

## Troubleshooting

| Problem | Fix |
|---|---|
| "This app cannot be installed" | Check that all files, including the 3 icons, are at the top level of the repository. Then reload in Chrome (not inside the Gmail or GitHub app). |
| Weights look wrong | Check the training max (Workout screen top card, or Program) and your bar weights in Settings. |
| Wrong day or week | Tap **Change** on the Workout screen. |
| Update not showing | Wait 2 minutes after uploading, then tap **Check for updates**. Or close the app fully and reopen it twice. |
| All workouts gone, "Let's get set up" screen | Chrome's site data was cleared. Tap **Restore from backup file** and pick your latest backup. |
| Rest timer quiet with screen off | The app keeps the screen on during workouts (Settings). A web app cannot sound alerts reliably when the phone is locked. |

## Version history

- **3.7.1**
  - Accessory rest is back to 0:45 / 1:00 / 1:30. 3.7.0 changed Easy to 1:00 by mistake; if yours is still 1:00 it goes back to 0:45.
  - New rest between exercises, 1:00, in Settings. Easy, Hard and Fail are still saved for that set but do not change the 1:00.
  - Pulley pin loads per side by default (equal plates on both sides) or as a single stack, set in Settings or on any exercise. The weight you log is still the total.
  - Deadlifts and rows load as much bumper weight as fits, with steel only to finish, and bumpers always on the inside.
  - Back to: when you look at another exercise, one tap returns you to the set you are on.
  - Options on each exercise changes sets, reps, weight step and rest times, for this workout or always.
  - Body tab: Import CSV for Cronometer weekly averages and weigh-ins, with a preview.
  - Notify me in other apps (Settings, off until you turn it on): a notification when rest ends. Android can pause web apps, so it may be late.
- **3.7.0**
  - One exercise at a time: the Workout screen shows only the exercise you are on and moves to the next one when its last set is checked. The main lift's warmups and work sets stay on one card. Tap a name in the row at the top, or the buttons under the card, to go back or skip ahead, or Show all for the whole day. Turn it off in Settings, Workout.
  - Minus and plus buttons beside the reps change them by one, so you do not have to type a missed or extra rep.
  - Rest: 1:30 after the last warmup before the first work set (new setting, "After last warmup"), and accessory Easy rest is now 1:00 (changed from 0:45 if you still had the old default).
  - The rest-done alert is one double beep and two short vibrations instead of six beeps.
- **3.6.2**
  - After each workout the app asks to back up, so a backup is always one tap away. Turn it off in Settings, Your data.
  - An empty app can no longer save over your data, and if the app cannot read your data it says so and saves nothing until you choose what to do.
  - Settings, Help and this guide explain that clearing Chrome's "Cookies and site data" deletes your workouts.
- **3.6.1**
  - Fixed: after a cycle, training maxes were suggested to go up even for lifts with no AMRAP sets logged. They now hold.
  - Fixed: workouts are dated when you started them, not when you tapped Finish.
  - Fixed: setting a rest time to 0 now turns that timer off (it used to become 1:00).
  - Help guide and Settings updated to match.
  - Offline: the app opens from its saved copy after 3 seconds on a weak connection, and a server error page can no longer replace the saved app.
- **3.6.0**
  - Cable exercises show the plates to stack on the pulley's loading pin (starts at 0), for example 25 lb = 10 · 10 · 2.5 · 2.5 on pin. Which plates fit the pin is in Settings.
  - The bar button on each exercise picks barbell, hex, EZ, pulley pin, another bar weight or no plates, for this workout only or always.
  - Dumbbell weights round to 5 lb PowerBlock steps (5 to 90).
- **3.5.0**
  - Bigger text on the Workout screen; the next set is highlighted.
  - Plates build on what is already on the bar from the set before (155 to 180 adds plates instead of stripping the bar).
  - Bar button on each exercise: barbell, hex, EZ, another weight, or no bar. Suggested weights round to what you can load.
  - Rest timer starts on Easy, and switches to Fail by itself when you get fewer reps than the target.
  - Louder beep with a volume setting and a Test button. If the phone was locked when rest ended, it beeps when you come back.
  - Finished sets lock (tap Edit to change one), and the screen scrolls to the next set.
  - Typing a weight in one set fills it into the sets after it. Exercises with no weight on file say so.
  - Program items have a Next workout weight and a Starting weight, so programs without training maxes can be adjusted.
  - History: weights stand out as bold chips, and each workout in the list shows its top set.
  - Form videos use the regular YouTube player, with an Open in the YouTube app button for when YouTube asks you to sign in.
- **3.4.1**
  - Fixed: the plates to load were cut off on narrow phone screens. They now show in full on their own line under each set.
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
