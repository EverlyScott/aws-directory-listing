import { S3Client } from "@aws-sdk/client-s3";
import config from "@/private-config.json";

const s3 = new S3Client(config.awsConfig);

export default s3;
