import React from "react";
import { ClipLoader } from "react-spinners";

type Props = {
    isLoading?: boolean;
};

const Spinner = ({ isLoading = true }: Props) => {
    return (
        <div className="">
            <ClipLoader color="#f63535"
                loading={isLoading}
                size={35}
                aria-label="Loading Spinner"
                data-testid="loader"
            /> </div>)
}

export default Spinner