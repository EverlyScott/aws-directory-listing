"use client";

import { ListObjectsV2Command, ListObjectsV2CommandOutput } from "@aws-sdk/client-s3";
import { Button, Divider, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { useState } from "react";
import config from "@/public-config.json";
import verifySlash from "@/utils/verifySlash";
import getFileSize from "@/utils/getFileSize";
import sendS3 from "@/utils/sendS3";

interface IProps {
  path: string;
  initialList: ListObjectsV2CommandOutput;
}

const Listing: React.FC<IProps> = ({ path, initialList }) => {
  const [directories, setDirectories] = useState(initialList.CommonPrefixes);
  const [files, setFiles] = useState(initialList.Contents);
  const [continuationToken, setContinuationToken] = useState(initialList.NextContinuationToken);

  const loadMoreItems = async () => {
    const response = await sendS3({
      Bucket: config.awsBucket,
      Delimiter: "/",
      Prefix: path === "/" ? undefined : path,
      ContinuationToken: continuationToken,
    });

    setContinuationToken(response.NextContinuationToken);

    setDirectories((currentDirectories) => {
      if (response.CommonPrefixes) {
        if (currentDirectories) {
          const newDirectories = [...currentDirectories];

          newDirectories.push(...response.CommonPrefixes);

          return newDirectories;
        } else {
          return response.CommonPrefixes;
        }
      } else {
        return currentDirectories;
      }
    });

    setFiles((currentFiles) => {
      if (response.Contents) {
        if (currentFiles) {
          const newDirectories = [...currentFiles];

          newDirectories.push(...response.Contents);

          return newDirectories;
        } else {
          return response.Contents;
        }
      } else {
        return currentFiles;
      }
    });
  };

  if (files || directories) {
    return (
      <>
        <List>
          <Divider />
          {path !== "/" && (
            <>
              <ListItem disablePadding key="back-btn">
                <ListItemButton href="./">
                  <ListItemText primary="../" />
                </ListItemButton>
              </ListItem>
              <Divider />
            </>
          )}
          {directories &&
            directories.map((directory) => {
              if (directory.Prefix) {
                return (
                  <>
                    <ListItem disablePadding key={directory.Prefix}>
                      <ListItemButton href={"/" + directory.Prefix}>
                        <ListItemText primary={verifySlash(directory.Prefix.replace(path, ""))} />
                      </ListItemButton>
                    </ListItem>
                    <Divider />
                  </>
                );
              } else return <></>;
            })}
          {files &&
            files.map((item) => {
              if (item.Key && item.Key !== path) {
                return (
                  <>
                    <ListItem disablePadding key={item.ETag}>
                      <ListItemButton href={`${config.awsRoot}/${item.Key}`}>
                        <ListItemText
                          primary={item.Key.replace(path, "")}
                          secondary={item.Size && getFileSize(item.Size)}
                        />
                      </ListItemButton>
                    </ListItem>
                    <Divider />
                  </>
                );
              } else return <></>;
            })}
        </List>
        {continuationToken && <Button onClick={loadMoreItems}>Load More Items</Button>}
      </>
    );
  } else {
    return (
      <>
        {path !== "/" && (
          <List>
            <ListItem>
              <ListItemButton href="./">
                <ListItemText primary="../" />
              </ListItemButton>
            </ListItem>
          </List>
        )}
      </>
    );
  }
};

export default Listing;
