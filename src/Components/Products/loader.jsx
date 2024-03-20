import { BounceLoader } from 'react-spinners';

export default function Loader() {
    return (
        <>
        <div className = "fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center" >
            <BounceLoader size={60} color={"#123abc"} loading={isLoading} />
        </div >
        </>
    )
}