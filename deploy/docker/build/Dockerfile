ARG CACHE_CHECKSUM
FROM registry.skyeng.tv/skysmart/edu-antiplagiat-cache:${CACHE_CHECKSUM} as builder

COPY . ./
# here we put erb template in the place of var.ts and process it later, during nginx startup, in entrypoint
COPY ./deploy/templates/vars.ts.erb /opt/app/src/environments/vars.ts

RUN ng build "$BUILD_OPTIONS"

# prod nginx
FROM registry.skyeng.tv/base/nginx1.17:1.6.13 as nginx

COPY --from=builder --chown=nginx:nginx /opt/app/dist /opt/app/dist
COPY ./deploy/templates/app-nginx.conf.erb /etc/nginx/sites-templates/app-nginx.conf.erb
