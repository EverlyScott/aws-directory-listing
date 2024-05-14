import { WithParams } from "@/types";
import { ListObjectsV2Command } from "@aws-sdk/client-s3";
import { Container, Paper, Typography } from "@mui/material";
import { NextPage } from "next";
import config from "@/public-config.json";
import sendS3 from "@/utils/sendS3";
import s3 from "@/s3";
import Listing from "./list";

interface IParams {
  path: string[];
}

const Main: NextPage<WithParams<IParams>> = async ({ params }) => {
  const path = `${decodeURIComponent(params.path.join("/"))}/`;

  const initialResults = await s3.send(
    new ListObjectsV2Command({
      Bucket: config.awsBucket,
      Delimiter: "/",
      Prefix: path === "/" ? undefined : path,
    })
  );

  return (
    <Container>
      <Typography variant="h3" component="h1">
        /{path === "/" ? "" : path}
      </Typography>
      <Paper sx={{ padding: 2 }}>
        <Listing path={path} initialList={initialResults} />
      </Paper>
    </Container>
  );
};

export default Main;
