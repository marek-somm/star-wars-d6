# star-wars-d6-new

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run dev
```

### Compiles and minifies for production
```
npm run build
```

### Lints files
```
npm run lint
```

### Character points by session

Add awards to `sessionPoints` in the character's JSON file under `src/assets/characters/`.
Use the session date from `src/assets/campaignTimeline.json` as the key, or the session's `id` if it has one, to display the award on the timeline.
Awards recorded for a date outside the timeline still appear in the character's Points History.
Use a whole number of zero or more for each recorded award.

Set `sessionPointsStart` to the character's point balance before the sessions you are recording.
Include only later awards in `sessionPoints` to avoid counting points twice. Leave the starting balance unset or use `null` if there is no starting balance to record.

```json
{
  "sessionPointsStart": 120,
  "sessionPoints": {
    "08.06.2026": 0,
    "30.08.2026": 5
  }
}
```

The character sheet, Points History, and PDF export use the starting balance plus the recorded awards. The example gives a total of 125 points. Track spent points separately in `points.spent`.
When migrating an older character file, move the previous `points.character` balance to `sessionPointsStart` before recording later awards.

### Customize configuration
See [Vite Configuration Reference](https://vitejs.dev/config/).
