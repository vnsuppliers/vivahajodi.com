import { useEffect, useState } from "react";
import ConnectionLost from "./ConnectionLost";

interface Props {
    children: React.ReactNode;
}

const NetworkProvider = ({ children }: Props) => {
    const [offline, setOffline] = useState(!navigator.onLine);

    useEffect(() => {
        const handleOnline = () => setOffline(false);

        const handleOffline = () => setOffline(true);

        const handleApiOffline = () => setOffline(true);

        window.addEventListener("online", handleOnline);

        window.addEventListener("offline", handleOffline);

        window.addEventListener("api-offline", handleApiOffline);

        return () => {
            window.removeEventListener("online", handleOnline);

            window.removeEventListener("offline", handleOffline);

            window.removeEventListener("api-offline", handleApiOffline);
        };
    }, []);

    if (offline) {
        return <ConnectionLost />;
    }

    return <>{children}</>;
};

export default NetworkProvider;