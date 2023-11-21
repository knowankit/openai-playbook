import { Box, Typography } from "@mui/material";
import { Paper, Button } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import IconButton from "@mui/material/IconButton";
import GitHubIcon from "@mui/icons-material/GitHub";

const demos = [
  {
    name: "Image generation",
    link: "/image-generation",
    image: ""
  },
  {
    name: "Wireframe to HTML",
    link: "/ui-to-html",
    image: ""
  }
];

const Home = () => {
  const router = useRouter();

  const handleClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    link: string
  ) => {
    e.preventDefault();
    router.push(link);
  };

  return (
    <>
      <Box px="1rem" height="40vh">
        <Box>
          <IconButton
            aria-label="github"
            onClick={() =>
              router.push("https://github.com/knowankit/openai-playbook")
            }
          >
            <GitHubIcon sx={{ color: "black" }} fontSize="large" />
          </IconButton>
        </Box>
        <Box
          display="flex"
          color="black"
          justifyContent="center"
          alignItems="center"
        >
          <Image
            src="/assets/image/open-ai-2.png"
            height={150}
            width={150}
            alt="Open ai icon"
          />
          &nbsp;{" "}
          <Typography variant="h5" ml={1}>
            Playbook
          </Typography>
        </Box>
      </Box>
      <Box display="flex" bgcolor="black" height="60vh" flexWrap="wrap">
        {demos.map((demo, index) => (
          <Button
            sx={{ textTransform: "none", fontSize: "1.2rem" }}
            key={index}
            onClick={event => handleClick(event, demo.link)}
          >
            <Paper elevation={3} sx={{ padding: "4rem" }} key={index}>
              {demo.name}
            </Paper>
          </Button>
        ))}
      </Box>
    </>
  );
};

export default Home;
