process.env.DISABLE_HARDWARE_ACCELERATION = "false";

if(process.env.ELECTRON_START_URL) {
    require("@babel/register");
    require("./src/app");
} else {
    require("./build/app");
}