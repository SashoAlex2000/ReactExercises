import { Outlet, useNavigation } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";

function RootLayout () {

    // const navigation = useNavigation();

    // navigation.state <- idle, loading or submitting 

    return <>
        <MainNavigation />
            <main>
                {/* {navigation.state === "loading" && <p>Data is being fetched</p>} */}
                <Outlet />
            </main>
    </>

};

export default RootLayout;

