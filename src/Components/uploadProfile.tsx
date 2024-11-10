'use client'
import { supabase } from "@/lib/supabase";
import { SetStateAction, useState } from "react";

const uploadProfile = () => {
    const [file, setFile] = useState(null);
    const [uploadStatus, setUploadStatus] = useState('');
  
    const handleFileChange = (event: { target: { files: SetStateAction<null>[]; }; }) => {
        setFile(event.target.files[0]);
    };
  
    const handleFileUpload = async () => {
        if (!file) {
            setUploadStatus('Please select a file to upload.');
            return;
        }
  
        const filePath = `uploads/${file.name}`;
  
        // Upload file to Supabase Storage
        const { error } = await supabase.storage
            .from('your-bucket-name') // Replace with your actual bucket name
            .upload(filePath, file, {
                contentType: file.type,
            });
  
        if (error) {
            setUploadStatus('File upload failed');
            console.error('Upload error:', error);
        } else {
            setUploadStatus('File uploaded successfully');
        }
    };
  return (
    <>
         <div className="">
          <input type="file" onChange={handleFileChange} />
          <button onClick={handleFileUpload}>Upload</button>
          <p>{uploadStatus}</p>
      </div>
    </>
  )
}

export default uploadProfile