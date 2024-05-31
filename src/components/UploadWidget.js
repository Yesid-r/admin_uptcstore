import { Button } from "@chakra-ui/react";
import { useEffect, useRef } from "react";

const UploadWidget = ({ onUpload }) => {
    const cloudinaryRef = useRef();
    const widgetRef = useRef();

    useEffect(() => {
        cloudinaryRef.current = window.cloudinary;
        widgetRef.current = cloudinaryRef.current.createUploadWidget({
            cloudName: "dfzr1jbqf",
            uploadPreset: "xn01a8f5"
        }, (error, result) => {
            if (result.event === "success") {
                onUpload(result.info.secure_url);
            }
        });
    }, [onUpload]);

    return (
        <Button onClick={() => widgetRef.current.open()}>
            Upload
        </Button>
    );
};

export default UploadWidget;
