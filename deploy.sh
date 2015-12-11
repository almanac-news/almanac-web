# deploy.sh
#! /bin/bash

aws configure set aws_access_key_id $AWSKEY
aws configure set aws_secret_access_key $AWSSECRETKEY
aws configure set default.region us-west-2
aws configure set default.output json

SHA1=$1
ENVNAME=$2

# Deploy image to Docker Hub
docker push almanac/web-server:$SHA1

# Create new Elastic Beanstalk version
EB_BUCKET=elasticbeanstalk-us-west-2-344528048408
DOCKERRUN_FILE=$SHA1-Dockerrun.aws.json
sed "s/<TAG>/$SHA1/" < Dockerrun.aws.json.template > $DOCKERRUN_FILE
aws s3 cp $DOCKERRUN_FILE s3://$EB_BUCKET/$DOCKERRUN_FILE
aws elasticbeanstalk create-application-version --application-name Almanac-News \
  --version-label $SHA1 --source-bundle S3Bucket=$EB_BUCKET,S3Key=$DOCKERRUN_FILE

# Update Elastic Beanstalk environment to new version
aws elasticbeanstalk update-environment --environment-name $ENVNAME \
    --version-label $SHA1