import { useRouter } from "next/router";
import Navbar from "../Navbar";


const disableNavbar = ['/auth/login', '/auth/register'];


type AppshellProps = {
    children: React.ReactNode;      
};

const Appshell = (props: AppshellProps) => {
    const { children } = props;
    return (
        <main>
            {!disableNavbar.includes(useRouter().pathname) && <Navbar />}
            {children}
        </main>
    );
};

export default Appshell;