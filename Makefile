production_host_ip = "serv.sergeyem.ru"

fix:
	npx prettier --write .

deploy:
	ssh -t root@${production_host_ip} '\
    		cd /var/www/easylist/easylist-frontend && git pull \
    		&& npm install \
    		&& npm run build \
    	'
