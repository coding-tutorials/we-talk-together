# we-talk-together
----------
- apps:
- - app_producer : 7000
- - app_consumer: 7001, 7002, 7003, 7004, 7005

- prometheus: 9090
- grafana: 3000


- run `npm i` & `npm run build-local` for both `app_producer` and `app_consumer`
- give `/prometheus-data` and `/grafana-data` permission (eg. chmod -R 777)
- `docker compose up`

- generate password for kibana_system
`docker compose exec elasticsearch bin/elasticsearch-reset-password --batch --user kibana_system`

- login with `elastic` user on kibana though `http://localhost:5601`
