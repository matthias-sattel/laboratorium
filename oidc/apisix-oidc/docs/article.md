# First steps to secure your application using APISIX and OpenID Connect
way too long, need a shorter version of the title

## What we want to build today?

Today we want to build a simple webpage that is hosted on a nginx node. In order to access the webpage, we use Apache APISIX to route calls to the nginx and secure it using the OpenID Connect standard

## What technology will we use?

This tutorial is build on the following technologies:

- docker
- docker compose
- nginx
- apisix
- openid-connect plugin
- OpenID Provider

## How does the data flow?

# Let's create the system without authentication



# Hey hodor, we need some help

``` bash
    plugins:
      openid-connect:
        client_id: ${{CLIENT_ID}}
        client_secret: ${{CLIENT_SECRET}}
        discovery: https://accounts.google.com/.well-known/openid-configuration
        redirect_uri: http://localhost:9080/callback
        scope: openid profile email
```