import { useRecoilValue } from "recoil";
import { loadingAtom } from "../../store/atoms/loadingStore";
import { MouseEvent } from "react";


export const SignButton = ({title, onClick}: {
    title: string,
    onClick: (e: MouseEvent<HTMLButtonElement>) => void | Promise<void>
}) => {
    const loading = useRecoilValue(loadingAtom)

    return <button onClick={onClick}
            type="submit"
        className={`bg-myGreen border border-black font-play focus:outline-none p-4 py-10 translate-y-3 rounded-xl hover:py-2  transition-all duration-300`}
    >
        {loading ? (title === 'Signin' ? "Signing in..." : "Signing up...") : title}
    </button>
}
