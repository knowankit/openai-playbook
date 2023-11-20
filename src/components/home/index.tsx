import { Box } from "@mui/material";
import { Paper, Button } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";

const demos = [
  {
    name: "Image generation",
    link: "/image-generation",
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
      <Box
        px="1rem"
        height="40vh"
        display="flex"
        color="black"
        justifyContent="center"
        alignItems="center"
      >
        <Image
          src="/assets/image/open-ai-2.png"
          height={80}
          width={80}
          alt="Open ai icon"
        />
        &nbsp; playbook
      </Box>
      <Box display="flex" p={4} bgcolor="black" height="60vh">
        {demos.map((demo, index) => (
          <Button
            sx={{ textTransform: "none" }}
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
