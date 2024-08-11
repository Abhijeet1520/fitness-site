server {
    listen 80 default_server;
    listen [::]:80 default_server;
    server_name altemirafitness.fit www.altemirafitness.fit;

    location / {
        return 301 https://$host$request_uri;
    }
}

server {
    listen 443 ssl default_server;
    listen [::]:443 ssl default_server;
    server_name altemirafitness.fit www.altemirafitness.fit;

    ssl_certificate /etc/letsencrypt/live/altemirafitness.fit/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/altemirafitness.fit/privkey.pem;
    ssl_dhparam /etc/nginx/ssl/dhparam.pem;

    root /home/ubuntu/fitness-site/backend;

    location / {
        include proxy_params;
        proxy_pass http://unix:/home/ubuntu/fitness-site/backend/app.sock;
    }

    location /static/ {
        alias /home/ubuntu/fitness-site/backend/static/;
    }
}
