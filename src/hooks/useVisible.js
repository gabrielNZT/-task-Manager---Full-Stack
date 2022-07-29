import { useCallback, useState } from "react";

export default function useVisible() {
    const [visible, setVisible] = useState(false);

    const toggle = useCallback(() => {
        setVisible(!visible);
    }, [visible
    ])

    return [visible, toggle]


}