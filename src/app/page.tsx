import { NextPage } from "next";
import Main from "./[...path]/page";

const Home: NextPage = () => {
  return <Main params={{ path: [""] }} />;
};

export default Home;
