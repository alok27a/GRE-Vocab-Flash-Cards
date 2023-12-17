import ToggleTheme from "../components/ToggleTheme";
import Home from "./Home";
import { Box } from "@chakra-ui/react";

function App() {
    return (
        <>
        <Box m={4}>
            <ToggleTheme />
        </Box>
            <Home/>
        </>
    );
}

export default App;
