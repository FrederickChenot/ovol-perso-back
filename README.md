# ovol

## Scripts

### Start Developement

        npm install && npx husky install && npm run dev

### Format all files

        npm run prettier

### Lint all files

        npm run lint

## sqitch DB

        - sqitch deploy
        - sqitch revert
        - sqitch verify

# Project Infos

- ### add new deploy/revert/verify with sqitch
        sqitch add <label> -n 'message'
- ### COMMIT LINT
   - convention ex: "feat(index): message exemple"
   - flags : { build ,chore ,ci ,docs ,feat ,fix ,perf ,refactor ,revert ,style ,test }
   - start all new feature from develop branch.
