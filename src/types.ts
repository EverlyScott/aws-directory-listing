import { NextPage } from "next";

export type Layout = NextPage<React.PropsWithChildren>;

export type WithParams<P = { [key: string]: string | string[] }, T = {}> = T & { params: P };
