import { useEffect } from "react";

export const useTitle = (title) => {

    useEffect(() => {
        document.title = `${title} - The Book Store`;
    }, [title]);

  return null;
}