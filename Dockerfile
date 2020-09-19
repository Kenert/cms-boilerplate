FROM wordpress:5.5.1-php7.4-apache

COPY certs/dev.crt /etc/ssl/certs/
COPY certs/dev.key /etc/ssl/private/
COPY docker/000-default.conf /etc/apache2/sites-enabled/
COPY docker/default-ssl.conf /etc/apache2/sites-enabled/

RUN a2enmod ssl rewrite