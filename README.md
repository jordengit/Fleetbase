1. 在 ./api 新建 .env

    ```bash
    cd api
    cp .env.example .env
    ```

   需修改：DB_PASSWORD、GOOGLE_MAPS_API_KEY

2. 起 docker

    ```bash
    docker-compose up -d
    ```

3. docker 內建立 database

    ```bash
    # 跑 db migration & seed
    docker exec -ti fleetbase_application_1 bash
    php artisan mysql:createdb
    php artisan migrate:refresh --seed
    ```

4. 前台註冊 & 登入

   網址：`http://localhost:4200`

   註冊後需到 db 查看驗證碼

   - table：verification_codes
   - 欄位：code