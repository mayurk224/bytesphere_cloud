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