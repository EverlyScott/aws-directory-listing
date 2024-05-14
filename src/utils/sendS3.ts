"use server";

import s3 from "@/s3";
import { ListObjectsV2Command, ListObjectsV2CommandInput } from "@aws-sdk/client-s3";

const sendS3 = async (input: ListObjectsV2CommandInput) => {
  return await s3.send(new ListObjectsV2Command(input));
};

export default sendS3;
