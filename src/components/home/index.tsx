import { Box } from "@mui/material";
import { Paper, Button } from "@mui/material";
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
        color="white"
        justifyContent="center"
        alignItems="center"
        bgcolor="black"
      >
        Search here
      </Box>
      <Box display="flex" p={4}>
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
