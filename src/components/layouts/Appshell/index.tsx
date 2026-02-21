import Navbar from "../Navbar";

type AppshellProps = {
    children: React.ReactNode;      
};

const Appshell = (props: AppshellProps) => {
    const { children } = props;
    return (
        <main>
            <Navbar />
            {children}
        </main>
    );
};

export default Appshell;