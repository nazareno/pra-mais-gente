#!/bin/bash

//aws s3 cp template.jpeg s3://a-gente-sim-bucket/



const AWS = require('aws-sdk');
const Busboy = require('busboy');

const BUCKET_NAME = 'a-gente-sim-bucket';
const IAM_USER_KEY = '';
const IAM_USER_SECRET = '';

function uploadToS3(file) {
  let s3bucket = new AWS.S3({
    accessKeyId: IAM_USER_KEY,
    secretAccessKey: IAM_USER_SECRET,
    Bucket: BUCKET_NAME,
  });
  s3bucket.createBucket(function () {
    var params = {
      Bucket: BUCKET_NAME,
      Key: file.name,
      Body: file.data,
    };
    s3bucket.upload(params, function (err, data) {
      if (err) {
        console.log('error in callback');
        console.log(err);
      }
      console.log('success');
      console.log(data);
    });
  });
}