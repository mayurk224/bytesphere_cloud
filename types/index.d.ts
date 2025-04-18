interface UploadFileProps {
  file: File;
  accountId: string;
  ownerId: string;
  path: string;
}

interface SearchParamProps {
  params?: Promise<SegmentParams>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

interface ActionType {
  label: string;
  icon: string;
  value: string;
}

interface RenameFileProps {
  fileId: string;
  name: string;
  extension: string;
  path: string;
}

interface UpdateFileUsersProps {
  fileId: string;
  emails: string[];
  path: string;
}

interface DeleteFileProps {
  fileId: string;
  bucketFileId: string;
  path: string;
}

declare type FileType = "document" | "image" | "video" | "audio" | "other";

interface GetFilesProps {
  types: FileType[];
  searchText?: string;
  sort?: string;
  limit?: number;
}

interface TotalSpace {
  document: {
    size: number;
    latestDate: string;
  };
  image: {
    size: number;
    latestDate: string;
  };
  video: {
    size: number;
    latestDate: string;
  };
  audio: {
    size: number;
    latestDate: string;
  };
  other: {
    size: number;
    latestDate: string;
  };
}