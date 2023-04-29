build:
	docker build --network my-network -t ap-bull-dashboard .

run:
	docker run -d --network my-network --rm -p 3015:3015 ap-bull-dashboard
