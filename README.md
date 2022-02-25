## initial routes
- /api
- /api/item

## INSTALL
COPY sqitch.conf.example in sqitch.conf

COPY .env.example in .env

docker-compose up -d

sqitch deploy
## Scripts :
- ### Start Production
        npm start
- ### Start Developement
        npm run dev
- ### Develop with docker container
        docker-compose up -d
  - #### Attach terminal to container ```docker ps``` for get container name
        docker attach <container-name> 
- ### Format all files
        npm run prettier
- ### Lint all files
        npm run lint
- ## DB
        - sqitch deploy 
        - sqitch deploy heroku-staging
        - sqitch deploy heroku-production

        - sqitch revert 
        - sqitch revert heroku-staging
        - sqitch revert heroku-production

        - sqitch verify 
        - sqitch verify heroku-staging
        - sqitch verify heroku-production
        

# Notes new project
- ### Sqitch config
        sqitch init <name>
        sqitch add <label> -n 'message'
- ### COMMITLINT
   - convention : feat(index): message exemple
   - flags : { build ,chore ,ci ,docs ,feat ,fix ,perf ,refactor ,revert ,style ,test } 