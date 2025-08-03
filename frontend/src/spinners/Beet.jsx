import { BeatLoader } from "react-spinners";
export default function DataLoading({size}) {
    return (
        <>
            <BeatLoader
                color="black"
                // cssOverride={{margin: "auto", marginLeft: "20%" }}
                margin={7}
                size={size}
            />
        </>
    )
} 
