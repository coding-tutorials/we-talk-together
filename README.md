# we-talk-together
----------
- apps:
- - app_producer : 7000
- - app_consumer: 7001, 7002, 7003, 7004, 7005

- prometheus: 9090


- run `npm i` & `npm run build` for both `app_producer` and `app_consumer`
- give `/prometheus-data` and `/grafana-data` permission (eg. chmod -R 777)
- `docker compose up`