import { useRouter } from "next/router";
import Navbar from "../Navbar";


const disableNavbar = ['/auth/login', '/auth/register', '/404'];


type AppshellProps = {
    children: React.ReactNode;      
};

const Appshell = (props: AppshellProps) => {
    const { children } = props;
    const router = useRouter();
    
    return (
        <main>
            {!disableNavbar.includes(router.pathname) && <Navbar />}
            {children}
        </main>
    );
};

export default Appshell;