## INSTALL without docker
- Setup a local postgres DB

- COPY sqitch.conf.example and rename in sqitch.conf and setup the file

- COPY .env.example and rename in .env and uncomment line in .env and setup the file

- Development ```npm install && npm run dev```
then
```sqitch deploy```

## INSTALL with docker
- [Docker required](https://www.docker.com/get-started)
- COPY sqitch.conf.example and rename in sqitch.conf

- COPY .env.example and rename in .env

- Run in root
```docker-compose up -d``` 
then
```sqitch deploy```
  - #### For log in terminal, run ```docker ps``` for get container name or ID then run
```docker attach <container-name> or <CONTAINER_ID>``` 
- [http://localhost:3000/api](http://localhost:3000/api)

- #### STOP Docker container 
  - run ```docker ps``` for get container name or ID
run ```docker stop <container-name> or <CONTAINER_ID>```
## Scripts :
- ### Start Production
        npm start
- ### Start Developement
        npm run dev
- ### Start container
        docker-compose up -d
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

# Project Infos
- ### add new deploy/revert/verify with sqitch

        sqitch add <label> -n 'message'
- ### COMMIT LINT
   - convention ex: "feat(index): message exemple"
   - flags : { build ,chore ,ci ,docs ,feat ,fix ,perf ,refactor ,revert ,style ,test }
   - start all new feature from develop branch