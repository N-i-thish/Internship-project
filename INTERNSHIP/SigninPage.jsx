import { Box, Grid, colors } from '@mui/material';
import { useState } from "react"; 
// import assets from "../assets/images";
import image1 from '../assets/images/isometric-view-san-francisco-s-bridge.jpg'
import image2 from '../assets/images/isometric-view-san-francisco-s-ferry-building.jpg'
import SigninForm from '../Components/SigninForm';
import SignupForm from '../Components/SignupForm';

// eslint-disable-next-line react-refresh/only-export-components
export const ScreenMode = {
  SIGN_IN: "SIGN_IN",
  SIGN_UP: "SIGN_UP"
};

const SigninPage = () => {
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState("unset");
  const [width, setWidth] = useState(0);

  const [backgroundImage, setBackgroundImage] = useState();
  const [currMode, setCurrMode] = useState(ScreenMode.SIGN_IN);

  const onSwitchMode = (mode) => {
    setWidth(100);

    const timeout1 = setTimeout(() => {
      setCurrMode(mode);
      setBackgroundImage(mode === ScreenMode.SIGN_IN ? image1 : image2);
    }, 1100);

    const timeout2 = setTimeout(() => {
      setLeft("unset");
      setRight(0);
      setWidth(0);
    }, 1200);

    const timeout3 = setTimeout(() => {
      setRight("unset");
      setLeft(0);
    }, 2500);

    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
      clearTimeout(timeout3);
    };
  };

  return (
    <Grid container sx={{ height: "100vh" }}>
      <Grid item xs={4} sx={{ position: "relative", padding: 3 }}>
        {
          currMode === ScreenMode.SIGN_IN ? (
            <SigninForm onSwitchMode={onSwitchMode} />
          ) : (
            <SignupForm onSwitchMode={onSwitchMode} />
          )
        }
        <Box sx={{
          position: "absolute",
          top: 0,
          left: left,
          right: right,
          width: `${width}%`,
          height: "100%",
          bgcolor: colors.grey[800],
          transition: "all 1s ease-in-out"
        }} />
      </Grid>
      <Grid item xs={8} sx={{
        position: "relative",
        backgroundImage: `url(${backgroundImage})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat"
      }}>
        <Box sx={{
          position: "absolute",
          top: 0,
          left: left,
          right: right,
          width: `${width}%`,
          height: "100%",
          bgcolor: colors.common.white,
          transition: "all 1s ease-in-out"
        }} />
      </Grid>
    </Grid>
  );
};

export default SigninPage;