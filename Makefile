build:
	docker build -t $(IMAGE_NAME) .

run:
	docker run -d --network my-network --rm -p 3015:3015 $(IMAGE_NAME)
