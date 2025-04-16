"use client";

import React, { useState, useCallback, MouseEvent } from "react";
import Image from "next/image";
import { useDropzone } from "react-dropzone";

import { Button } from "@/components/ui/button";
import { cn, convertFileToUrl, getFileType } from "@/lib/utils";
import Thumbnail from "./Thumbnail";
import { MAX_FILE_SIZE } from "@/constants";
import { useToast } from "@/hooks/use-toast";
import { uploadFile } from "@/lib/actions/file.actions";
import { usePathname } from "next/navigation";

interface Props {
  ownerId: string;
  accountId: string;
  className?: string;
}

const FileUploader: React.FC<Props> = ({ ownerId, accountId, className }) => {
  const [files, setFiles] = useState<File[]>([]);
  const { toast } = useToast();
  const path = usePathname();

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      setFiles(acceptedFiles);
      const uploadPromises = acceptedFiles.map(async (file) => {
        if (file.size > MAX_FILE_SIZE) {
          setFiles((prevFiles) =>
            prevFiles.filter((f) => f.name !== file.name)
          );

          return toast({
            title: "File size too large",
            description: (
              <p className="body-2 text-white">
                <span className="font-semibold">{file.name}</span> is too large.
                Maximum file size is 50MB.
              </p>
            ),
            variant: "destructive",
          });
        }
        return uploadFile({
          file,
          accountId,
          ownerId,
          path,
        }).then((uploadFile) => {
          if (uploadFile) {
            setFiles((prevFiles) =>
              prevFiles.filter((f) => f.name !== file.name)
            );
          }
        });
      });
      await Promise.all(uploadPromises);
    },
    [ownerId, accountId, path]
  );

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleRemoveFile = (
    e: MouseEvent<HTMLImageElement>,
    fileName: string
  ) => {
    e.stopPropagation();
    setFiles((prevFiles) => prevFiles.filter((file) => file.name !== fileName));
  };

  return (
    <div {...getRootProps()} className={cn("cursor-pointer", className)}>
      <input {...getInputProps()} />

      <div className="flex flex-col items-center gap-2">
        <Button
          type="button"
          className="upload-button flex items-center gap-2 bg-brand-100 rounded-3xl"
        >
          <Image src="/icons/upload.svg" alt="upload" width={20} height={20} />
          Upload
        </Button>
      </div>

      {files.length > 0 && (
        <ul className="uploader-preview-list mt-4 space-y-3">
          <h4 className="h4 text-light-100">Uploading</h4>
          {files.map((file, index) => {
            const { type, extension } = getFileType(file.name);
            return (
              <li
                key={`${file.name}-${index}`}
                className="uploader-preview-item flex justify-between items-center p-3 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <Thumbnail
                    type={type}
                    extension={extension}
                    url={convertFileToUrl(file)}
                  />
                  <div className="flex flex-col gap-1">
                    <span className="text-black">{file.name}</span>
                    <Image
                      src="/icons/file-loader.gif"
                      alt="loader"
                      width={80}
                      height={26}
                    />
                  </div>
                </div>
                <Image
                  src="/icons/remove.svg"
                  alt="remove"
                  width={28}
                  height={28}
                  className="cursor-pointer"
                  onClick={(e) => handleRemoveFile(e, file.name)}
                />
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default FileUploader;
