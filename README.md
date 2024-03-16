# holiday-jp-firebase

日本の祝日を判定するライブラリ（https://www.npmjs.com/package/@sway11466/holiday-jp-npm）をfirebaseのfunctionsで呼び出すサービスです。

## 使い方

-   指定日が祝日であるか判定する
    ```bash
    curl https://holiday-v3na3wloca-an.a.run.app/?date=2024-01-01
    {"holiday":true,"year":2024,"month":1,"date":1,"name":"元日","iso-date":"2024-01-01T00:00:00+09:00"}
    ```

-   指定日が平日であるか判定する
    ```bash
    curl https://weekday-v3na3wloca-an.a.run.app/?date=2024-01-01
    {"weekda":false,"year":2024,"month":1,"date":1,"name":"元日","iso-date":"2024-01-01T00:00:00+09:00"}
    ```
