# Podate

**Pod**man auto-up**date** hook server

## Usage

> **NOTE**: Firstly, You need to install [podman](https://podman.io/) and setup [podman auto-date](https://docs.podman.io/en/latest/markdown/podman-auto-update.1.html) for your service.

Recommend use [pm2](https://pm2.keymetrics.io/) to manage your sever process.

```console
# Clone the repo
$ git clone https://github.com/KusStar/podate
$ cd podate
# Run
$ export PODATE_TOKEN="Bearer podate"
$ pm2 start server.js
```

NOTE: Setup `pm2` env also can through [ecosystem.config.js](https://pm2.keymetrics.io/docs/usage/application-declaration/)

```js
// ecosystem.config.js
module.exports = {
  apps : [{
    name   : "podate",
    script : "./server.js",
    env: {
      PODATE_TOKEN: "Bearer podate",
    },
    env_production: {
      PODATE_TOKEN: "Bearer podate",
    }
  }]
}
```

```console
$ curl -H "Authorization: Bearer podate" ${YOUR_DEPLOYED_SERVER_HOST}/hook
```

Then it will run `$ podman auto-update` on your host server.

## Env

**PORT**

Server Port. Defaults to `9999`

**PODATE_TOKEN**

`/hook` authorization, defaults to undefined, no settle.

## LICENSE

[MIT](./LICENSE)